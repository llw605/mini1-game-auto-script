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
      console.log("[截屏找图] %s: %s", imgPath, JSON.stringify(point));
      return point;
    }
    console.log("[截屏找图] %s: 未找到", imgPath);
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
    console.log("[截屏找色] %s: %s", color, point);
    if (point) {
      return true;
    }
    console.log("[截屏找色] %s: %s", color, "未找到");
    return false;
  },

  clickColorInScreen(color, x, y, width, height) {
    // 截图
    var screenImg = captureScreen();
    sleep(1000);
    var point = images.findColorEquals(screenImg, color, x, y, width, height);
    screenImg.recycle;
    console.log("[截屏找色并点击] %s: %s", color, point);
    if (point) {
      click(point.x, point.y);
    }
    console.log("[截屏找色并点击] %s: %s", color, "未找到");
    return null;
  },

  init() {

    console.info("初始化：")

    // 初始化
    toast("[初始化] 应用初始化中");

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
      console.log("[初始化] 已有悬浮窗权限");
    }

    // 截图权限
    requestScreenCapture({
      orientation: 0
    });

    // 前台服务状态
    console.log("[初始化] " + "前台服务: " + $settings.isEnabled("foreground_service"));
    // 开启前台服务
    $settings.setEnabled("foreground_service", true);
  },

  /**
   * @name: 打开游戏
   * @param {*}
   * @return {*}
   */
  launchGame() {
    console.info("启动游戏： ")
    // 返回home
    home();

    var appPackage = getPackageName("迷你世界");

    sleep(2000);

    // 关闭游戏
    console.log("[启动游戏] 正在关闭游戏进程");


    // 滑动关闭
    recents(); // 进入任务窗口
    sleep(1500);
    // 查找后台


    if (desc("迷你世界").exists()) {
      console.log("[启动游戏] 找到游戏后台")
      
      
      var app = text("迷你世界").findOne(5000).bounds();
      swipe(app.width() , app.centerY(), app.width() , device.height, 500); //模拟滑屏

      text("全部清除").findOne(5000).click()

      sleep(2000)
    

      // sleep(1000);
      // home(); //返回桌面  Cannot find function centerX in object UiObject
      // sleep(1000);
    } else {
      log("[启动游戏] 未找到游戏后台")
    }



    log("package: %s", appPackage)
    // 用包名打开，如果找不到找游戏名
    if (!launch(appPackage)) {
      launchApp("迷你世界")
      sleep(5000);
    }

    log("[启动游戏] 正在等待游戏启动")

    // 等待游戏启动
    waitForPackage(appPackage, 500)
  },

  /**
   * @name: 点击图片所在位置
   * @param {*} imgPath
   * @return {*}
   */
  clickHere(imgPath) {
    var point = this.getImageLocationInScreen(imgPath);
    if (point) {
      click(point.x, point.y);
    }
  },

  logging() {
    // 日志存储地址
    let logPath = "/sdcard/xiaowuyaya/mini1_script/log/" + Date.parse(new Date()) + ".log"

    console.setGlobalLogConfig({
      file: logPath,
      maxFileSize: 1048576, // 1MB
      maxBackupSize: 10
    });
    console.log("[日志文件] 日志文件存储在: %s", logPath);
  },

};