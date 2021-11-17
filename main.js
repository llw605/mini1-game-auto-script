/*
 * @Descripttion: 主程序
 * @version:
 * @Author: xiaowuyaya
 * @Date: 2021-11-12 17:22:26
 */
const {
  init,
  launchGame,
  logging
} = require("./main_dir/func_work");

const op = require("./main_dir/operation");

const {LogginSendToMail} = require("./util/email")
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


/* ==========================执行============================ */

try{
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
}catch(e){
  // 将日志发送到邮箱
  var log = {
    title:"有一台设备出现异常，请查看(undefind)",
    content: e
  }
  LogginSendToMail(log)
}
