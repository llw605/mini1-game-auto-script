/*
 * @Descripttion: 检查更新模块
 * @version: 
 * @Author: xiaowuyaya
 * @Date: 2021-11-17 21:40:49
 */
module.exports = {

  /**
   * @name: 缓存本地
   * @param {*}
   * @return {*}
   */
  createVersionStorage() {
    // 创建缓存对象
    var storage = storages.create("xiaowuyaya:mini1_script");
    // 读取本地版本文件
    var version = files.read("./version.json");
    // 缓存当前版本信息
    storage.remove("local_version")
    storage.put("local_version", version)
  },

  /**
   * @name: 获取最新版本信息
   * @param {*}
   * @return {*}
   */
  getNewVersion() {
    var local_version = this.getLocalVersion();
    // 发送请求
    log("更新：正在检查新版本... \n 当前： \n 版本：%s \n 图片资源版本：%s ",local_version.bin.version_name,local_version.img.date)
    toast("更新：正在检查新版本...")

    var address = "https://llw605.github.io/ek1.github.io/app_update.json"
    http.get(address, {}, function (res, err) {
      if (err) {
        console.error("更新：http请求异常,%s", err);
        return;
      }
      
      if (res.statusCode === 200) {
        // 请求成功
        var new_version = JSON.parse(res.body.string()).mini1_script
      
        //判断
        if(local_version.bin.version_name != new_version.bin.version_name){
          log("检查到有新版本发布！")
          toastLog("检查到有新版本发布！")

          return
        }

        if(local_version.img.date != new_version.img.date){
          log("检查到图片资源更新！")
          toastLog("检查到图片资源更新！")

          return
        }

        log("当前为最新版本！")
        toast("当前为最新版本！")
      }
    });
  },

  /**
   * @name: 获取当前版本信息
   * @param {*}
   * @return {*}
   */
  getLocalVersion() {
    // 创建缓存对象
    var storage = storages.create("xiaowuyaya:mini1_script");

    local_version = JSON.parse(storage.get("local_version"))
    // log("当前版本：%s",local_version.bin.version_name);
    // log("当前图片版本：%s",local_version.img.date)
    return local_version;
  }

}