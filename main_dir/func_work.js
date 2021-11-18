/*
 * @Descripttion: 方法库
 * @version:
 * @Author: xiaowuyaya
 * @Date: 2021-11-13 17:47:24
 */
module.exports = {
  /**
   * @name: 在当前屏幕下找到输入图片
   * @param {*} img 要找的图片
   * @return {*} 可点击区域坐标
   */
  getImageLocationInScreen(imgPath) {

    var img = images.read(imgPath);
    var imgInfo = images.readPixels(imgPath);
    // 截图
    sleep(1000);
    var screenImg = captureScreen();

    // // 灰度化图片
    // var grayImg = images.grayscale(img);

    // //转四通道
    // var grayImgArgb = images.cvtColor(grayImg, "GRAY2BGRA");

    // 定位
    var r = images.findImage(screenImg, img, {
      threshold: 0.8
    });

    // 资源释放
    screenImg.recycle();
    img.recycle();
    // grayImg.recycle();
    // grayImgArgb.recycle();

    // 判断图片是否存在
    if (r) {
      var point = {
        x: r.x + imgInfo.width / 2,
        y: r.y + imgInfo.height / 2,
      };
      console.log("[%s]: %s", imgPath, JSON.stringify(point));
      return point;
    }
    console.log("[%s]: 未找到", imgPath);
    return null;
  },

  /**
   * @name: 在屏幕上找颜色
   * @param {*} color
   * @param {*} x
   * @param {*} y
   * @param {*} width
   * @param {*} height
   * @return {*}
   */
  findColorInScreen(color, x, y, width, height) {
    // 截图
    var screenImg = captureScreen();
    sleep(1000);
    var point = images.findColorEquals(screenImg, color, x, y, width, height);
    screenImg.recycle;
    console.log("找色[%s]结果: %s", color, point);
    if (point) {
      return true;
    }
    console.log("找色结果: %s", color, "未找到");
    return false;
  },

  clickColorInScreen(color, x, y, width, height) {
    // 截图
    var screenImg = captureScreen();
    sleep(1000);
    var point = images.findColorEquals(screenImg, color, x, y, width, height);
    screenImg.recycle;
    console.log("找色[%s]结果: %s", color, point);
    if (point) {
      click(point.x, point.y);
    }
    console.log("找色结果: %s", color, "未找到");
    return null;
  },

  init() {

    console.info("========初始化========");

    // 初始化
    toastLog("应用初始化中");

    // 无障碍服务
    auto("fast");

    if (!$floaty.checkPermission()) {
      // 没有悬浮窗权限，提示用户并跳转请求
      toast(
        "本脚本需要悬浮窗权限来显示悬浮窗，请在随后的界面中允许并重新运行本脚本。"
      );
      $floaty.requestPermission();
      exit();
    } else {
      console.log("已有悬浮窗权限");
    }

    // 截图权限
    requestScreenCapture({
      orientation: 0
    });

    // 前台服务状态
    log("前台服务: " + $settings.isEnabled("foreground_service"));
    // 开启前台服务
    $settings.setEnabled("foreground_service", true);
  },

  /**
   * @name: 打开游戏
   * @param {*}
   * @return {*}
   */
  launchGame() {
    console.info("========启动游戏========");

    // 返回home
    home();

    sleep(2000);

    // 关闭游戏
    var appPackage = getPackageName("迷你世界");

    // // if (!name) {
    // //   if (getAppName(packageName)) {
    // //     name = packageName;
    // //   } else {
    // //     return false;
    // //   }
    // // }
    // app.openAppSetting(name);
    // // sleep(3000)
    // text(app.getAppName(name)).waitFor();
    // let isSure = textMatches(/(.*强.*|.*停.*|.*结.*|.*行.*)/).findOne();
    // if (isSure.enabled()) {
    //   textMatches(/(.*强.*|.*停.*|.*结.*|.*行.*)/)
    //     .findOne()
    //     .click();
    //   sleep(1000);
    //   textMatches(/(.*确.*|.*定.*)/)
    //     .findOne()
    //     .click();
    //   log(app.getAppName(name) + "应用已关闭");
    //   sleep(1000);
    //   home();
    // } else {
    //   log(app.getAppName(name) + "应用不能被正常关闭或者不在后台运行");
    //   sleep(1000);
    //   home();
    // }

    // 滑动关闭
    recents(); // 进入任务窗口
    sleep(1500);
    var findApp = desc("迷你世界" + ",未加锁").findOnce();
    if (findApp != null) {
      log("关闭游戏中")
      var app = findApp.bounds();
      console.log(app);
      swipe(app.centerX(), app.centerY(), device.width, app.centerY(), 300); //模拟滑屏
      sleep(1000);
      home(); //返回桌面
      sleep(1000);
    } else {
      log("未找到");
      home();
    }


    // 用包名打开，如果找不到找游戏名
    if (!launch(appPackage)) {
      launchApp("迷你世界")
      sleep(5000);
    }
  },

  /**
   * @name: 点击图片所在位置
   * @param {*} imgPath
   * @return {*}
   */
  clickHere(imgPath) {
    // console.log(imgPath);
    var point = this.getImageLocationInScreen(imgPath);
    if (point) {
      click(point.x, point.y);
    }
    // sleep(1500);
  },

  logging() {
    // 日志存储地址
    let logPath = "/sdcard/xiaowuyaya/mini1_script/log/" + Date.parse(new Date()) + ".log"

    console.setGlobalLogConfig({
      file: logPath,
      maxFileSize: 1048576, // 1MB
      maxBackupSize: 10
    });
    console.log("日志文件存储在: %s", logPath);
  },

};
