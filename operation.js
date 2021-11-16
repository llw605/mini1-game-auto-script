/*
 * @Descripttion: 操作相关库
 * @version:
 * @Author: xiaowuyaya
 * @Date: 2021-11-13 20:42:37
 */
const {
  clickHere
} = require("./func_work");
const {
  getImageLocationInScreen,
  findColorInScreen
} = require("./func_work");
const i = require("./img_res");

module.exports = {
  /**
   * @name: 进入游戏窗口
   * @param {*}
   * @return {*}
   */
  beginGame() {

    console.info("========正在执行流程0：进入游戏窗口========");
    // clickHere(i.joinGame);
    // clickColorInScreen("#FCCF1E", 500, 485, 150,80)
    click(656, 520)
    sleep(1000)
    // clickHere(i.eveningGamesNotic);
    // clickColorInScreen("#fdda12", 560, 575, 150,40)
    click(640, 590)
    sleep(1000)
    // clickHere(i.systemNotice);
    // clickColorInScreen("#fdda12", 555, 450, 150,40)
    click(640, 465)
    sleep(5000)
  },

  /**
   * @name: 判断是否已经进入大厅
   * @param {*}
   * @return {*}
   */
  isBeginGameOver() {
    if (getImageLocationInScreen(i.friendButtom)) {
      console.log("判断：已成功进入大厅");
      return true;
    }
    console.log("判断：暂未进入大厅");
    return false;
  },

  /**
   * @name: 关闭游戏中的弹窗
   * @param {*}
   * @return {*}
   */
  gameBeginCloseWindow() {
    console.info("========正在执行流程1：关闭游戏中的弹窗========");
    clickHere(i.advertisement_1);
    clickHere(i.advertisement_2);
    clickHere(i.accountSecurity);
    getImageLocationInScreen(i.onlineGame)

  },

  /**
   * @name:  判断是否以及完全关闭
   * @param {*}
   * @return {*}
   */
  isGameBeginCloseWindowOver() {
    if (getImageLocationInScreen(i.onlineGame)) {
      console.log("判断：游戏内弹窗已经关闭");
      return true;
    }
    console.log("判断：游戏内弹窗未完全关闭");
    return false;
  },



  /**
   * @name: 进入地图
   * @param {*}
   * @return {*}
   */
  enterMap() {
    console.info("========正在执行流程2：进入地图========");
    clickHere(i.onlineGame);
    clickHere(i.createRoom);
    clickHere(i.goGameRoom);
    getImageLocationInScreen(i.onlineGame)
    // 确定备份
    clickHere(i.eveningGamesNotic);
  },

  /**
   * @name: 判断是否进入地图
   * @param {*}
   * @return {*}
   */
  isEnterMapOver() {
    if (getImageLocationInScreen(i.onlineGame)) {
      console.log("判断：未进入地图");
      return false;
    }
    if (getImageLocationInScreen(i.createRoom)) {
      console.log("判断：未进入地图");
      return false;
    }
    if (getImageLocationInScreen(i.goGameRoom)) {
      console.log("判断：未进入地图");
      return false;
    }
    if (getImageLocationInScreen(i.eveningGamesNotic)) {
      console.log("判断：未进入地图");
      return false;
    }
    console.log("判断：已进入地图");
    return true;
  },

  /**
   * @name: 关闭地图中的窗口
   * @param {*}
   * @return {*}
   */
  closeWindowOnMap() {
    console.info("========正在执行流程3：关闭地图中的窗口========");
    clickHere(i.windowsInGame_1);
    clickHere(i.windowsInGame_2);
    clickHere(i.windowsInGame_3);
    clickHere(i.tryAgain)
  },

  /**
   * @name: 是否成功进入地图
   * @param {*}
   * @return {*} 如果不存在返回空
   */
  isCloseWindowOnMapOver() {
    if (getImageLocationInScreen(i.InGameMap)) {
      console.log("判断：关闭地图中的弹窗完成");
      return true;
    }
    console.log("判断：关闭地图中的弹窗未完成");
    return false;
  },

  /**
   * @name: 判断当前房间是否有人
   * @param {*}
   * @return {*}
   */
  getNumOfUser() {

    console.info("========正在执行流程4：判断当前房间是否有人========");

    while (true) {

      clickHere(i.tryAgain)

      console.log("检测到玩家已经死亡，复活中...")
      // 房间信息坐标
      click(1244, 228);

      // 等房间信息窗口开
      sleep(500)

      // 是否打开房间信息
      if (getImageLocationInScreen(i.RoomInText)) {
        // 判断是否有人
        var p1 = findColorInScreen("#cfe7d7", 425, 250, 30, 20);
        var p2 = findColorInScreen("#cfe7d7", 145, 370, 30, 40);
        var p3 = findColorInScreen("#cfe7d7", 460, 210, 30, 40);
        // console.log(p1);
        // console.log(p2);
        // clickHere(i.closeRoominfo);

        click(1250, 25);

        if (p1 && p2 && p3) {
          console.log("当前房间没人");
          return false;
          break;

        }
        console.log("当前房间有人");
        return true;
        break;

      } else {
        // 没进就break
        console.warn("未打开房间信息");
        return false;
        break
      }
    }
  },


};