/*
 * @Descripttion:
 * @version:
 * @Author: xiaowuyaya
 * @Date: 2021-11-14 12:18:10
 */
/* ==========================悬浮窗=========================== */
var window = floaty.window(
  <frame>
    <button id="action" text="开始运行" w="90" h="40" bg="#2d8cf0" />
  </frame>
);

setInterval(() => {}, 1000);

var main = null;

//记录按键被按下时的触摸坐标
var x = 0,
  y = 0;
//记录按键被按下时的悬浮窗位置
var windowX, windowY;
//记录按键被按下的时间以便判断长按等动作
var downTime;

window.action.setOnTouchListener(function (view, event) {
  switch (event.getAction()) {
    case event.ACTION_DOWN:
      x = event.getRawX();
      y = event.getRawY();
      windowX = window.getX();
      windowY = window.getY();
      downTime = new Date().getTime();
      return true;
    case event.ACTION_MOVE:
      //移动手指时调整悬浮窗位置
      window.setPosition(
        windowX + (event.getRawX() - x),
        windowY + (event.getRawY() - y)
      );
      //如果按下的时间超过1.5秒判断为长按，退出脚本
      if (new Date().getTime() - downTime > 1500) {
        exit();
      }
      return true;
    case event.ACTION_UP:
      //手指弹起时如果偏移很小则判断为点击
      if (
        Math.abs(event.getRawY() - y) < 5 &&
        Math.abs(event.getRawX() - x) < 5
      ) {
        onClick();
      }
      return true;
  }
  return true;
});

function onClick() {
  if (window.action.getText() == "开始运行") {
    // 执行主程序
    main = engines.execScriptFile("./main.js");
    window.action.setText("停止运行");

    //TODO 判断主程序是否异常退出

  } else {
    if (main) {
      main.getEngine().forceStop();
      console.log(engines.all());
    }

    window.action.setText("开始运行");
  }
}
