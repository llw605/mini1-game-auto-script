/*
 * @Descripttion: 
 * @version: 
 * @Author: xiaowuyaya
 * @Date: 2021-11-17 17:40:14
 */
//导入FloatButton模块
var {
  FloatButton,
  FloatButtonConfig
} = require('./FloatButton/init');

let fb = new FloatButton();

//修改停靠动画时间
FloatButtonConfig.time.direction = 510;

//设置logo图标
fb.setIcon('https://llw605.github.io/ek1.github.io/res/mini1_script/imgs/logo.png');
//设置logo图标着色
//fb.setTint('#FFFFFF');
//设置logo背景颜色
fb.setColor('#FFFFFF');
//设置所有按钮大小 默认40
fb.setAllButtonSize(46);
//设置所有按钮内边距 默认8
//fb.setAllButtonPadding(8);

//添加菜单按钮
fb.addItem('update')
  //设置图标
  .setIcon('@drawable/ic_sync_black_48dp')
  //图标着色
  .setTint('#FFFFFF')
  //背景颜色
  .setColor('#019581')
  //点击事件
  .onClick((view, name) => {
    toastLog('onClick:' + name)
    //返回 true:保持菜单开启 false:关闭菜单
    return false;
  });


fb.addItem('run')
  //启用复选框属性
  .toCheckbox(mUtil => {
    //未选中样式
    mUtil.icon1('@drawable/ic_play_arrow_black_48dp').tint1('#FFFFFF').color1('#41A4F5');
    //选中样式
    mUtil.icon2('@drawable/ic_stop_black_48dp').tint2('#FFFFFF').color2('#ED524E');
  })

fb.addItem('info')
  .setIcon('@drawable/ic_info_black_48dp')
  .setTint('#FFFFFF')
  .setColor('#ED524E');


//在无操作一段时间后自动关闭菜单
fb.setAutoCloseMenuTime(3000);

// 初始化脚本引擎
var script = null;

//菜单按钮点击事件
fb.on('item_click', (view, name, state) => {
  //如果在addItem中添加了onClick事件 则不会在这里触发

  switch (name) {
    case 'update':
      toastLog('item_click:' + name);
      //返回 true:保持菜单开启 false:关闭菜单
      return true;
      break;

    case 'run':
      toastLog('名称 : ' + name + '\n状态 : ' + state);

      if (state) {
        // 运行脚本程序
        script = engines.execScriptFile("./main.js");
      } else {
        // 关闭脚本程序
        script.getEngine().forceStop();
      }
      return true;
      break;

    case 'info':
      toastLog('item_click:' + name);
      return true;
      break;
  }



});


fb.show();