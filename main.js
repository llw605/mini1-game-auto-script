/*
 * @Descripttion: 主程序
 * @version:
 * @Author: xiaowuyaya
 * @Date: 2021-11-12 17:22:26
 */
const {
  init,

  logging
} = require("./main_dir/func_work");

const op = require("./main_dir/operation");

const func = require("./main_dir/func_work")

const {
  LogginSendToMail
} = require("./util/email")
/* 
  流程判断，
  0: 进入游戏中
  1: 关闭大厅窗口中
  2: 进入地图中
  3: 关闭地图中的窗口中
  4: 判断房间人数
*/
var procedure = 0;
var procedureRunTime = 0;

function main() {

  console.info("当前执行流程：%s, 此流程循环次数流程循环次数：%s次", procedure, procedureRunTime);

  switch (procedure) {
    case 0:
      // 记录流程执行次数
      procedureRunTime++

      // 进入游戏
      op.beginGame();
      if (op.isBeginGameOver()) {
        procedure = 1;
        procedureRunTime = 0;
      }

      break;

    case 1:
      // 记录流程执行次数
      procedureRunTime++


      // 关闭进入游戏时候的弹窗
      op.gameBeginCloseWindow();
      if (op.isGameBeginCloseWindowOver()) {

        procedure = 2;
        procedureRunTime = 0;
      }
      break;

    case 2:
      // 记录流程执行次数
      procedureRunTime++

      // 进入地图
      op.enterMap();

      if (op.isEnterMapOver()) {
        procedure = 3;
        procedureRunTime = 0;
      }
      break;

    case 3:
      // 记录流程执行次数
      procedureRunTime++

      // 关闭游戏中的弹窗
      op.closeWindowOnMap();
      if (op.isCloseWindowOnMapOver()) {
        procedureRunTime = 0;
        procedure = 4;
      }
      break;

    case 4:
      //进房间后延迟10分钟
      sleep(600000);

      // 开始循环
      for (let index = 0; index < 10; index++) {
        // 判断房间是否有人
        if (op.getNumOfUser()) {
          //如果有人就在等3分钟
          sleep(180000);

        } else {
          // 没人就直接退出
          break;

        }

      }

      //去重开房间
      procedure = 0;

      // 重开游戏
      launchGame();
      break;

  }

}

/**
 * @name: 打开游戏
 * @param {*}
 * @return {*}
 */
function launchGame() {
  console.info("启动游戏： ")
  // 返回home
  home();

  var appPackage = getPackageName("迷你世界");

  sleep(3000);

  // 关闭游戏
  console.log("[启动游戏] 正在关闭游戏进程 5s");

  app.openAppSetting(appPackage);
  sleep(5000)

  // 关闭操作

  if (text("强行停止").exists()) {
    click("强行停止")
    // text("强行停止").click();
    sleep(5000);
    // text("确定").click();
    if (text("确定").exists()) {
      click("确定")
      log("[启动游戏] 关闭成功")
      sleep(3000);
    } else {
      log("确定按钮不存在...")
      log("[启动游戏] 应用不能被正常关闭或者不在后台运行");
      sleep(1000);
    }
  }

  home()

  log("package: %s", appPackage)

  // 启动游戏
  while (true) {
    log("[启动游戏] 打开游戏中");
    log("[启动游戏] 正在寻找游戏图标");
    var icon = func.getImageLocationInScreen("./img/game.png");
    sleep(3000)
    if (icon) {
      log("[启动游戏] 游戏图标已找到，点击打开...");
      click(icon.x, icon.y);
    } else {
      log("[启动游戏] 游戏图标未找到，通过包名打开...");
      launch(appPackage)
    }

    log("[启动游戏] 等待启动 5s")
    sleep(5000);

    if (currentPackage() == "com.minitech.miniworld") {
      log("[启动游戏] 判断到游戏已进入！")
      break;
    } else {
      log("[启动游戏] 判断到游戏未进入，重新启动")
    }

  }



  // // 等待游戏启动
  // waitForPackage(appPackage)

  // log("[启动游戏] 游戏启动成功")
}


/* ==========================执行============================ */

try {
  // 初始化
  init()
  //日志初始化
  // logging()

  // 启动游戏
  launchGame();

  while (true) {

    if (procedureRunTime == 15) {
      procedure = 0;
      procedureRunTime = 0;
      // 重启游戏
      launchGame();
    }

    // 执行程序
    main();
    sleep(1000);
  }
} catch (e) {
  // 将日志发送到邮箱
  var log = {
    title: "有一台设备出现异常，请查看",
    content: "异常内容： \n " + e
  }
  // LogginSendToMail(log)
  console.warn(e);
}
