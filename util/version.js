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
    // 获取本地版本信息
    var storage = storages.create("xiaowuyaya:mini1_script");
    local_version = JSON.parse(storage.get("local_version"))

    // 发送请求
    console.log("[更新] 正在检查新版本... \n 当前： \n 版本：%s \n 图片资源版本：%s ", local_version.bin.version_name, local_version.img.date)
    toast("正在检查新版本...")

    var address = "https://llw605.github.io/mini1-script/version.json"
    http.get(address, {}, function (res, err) {
      if (err) {
        console.error("[更新] http请求异常,%s", err);
        return;
      }

      if (res.statusCode === 200) {
        // 请求成功
        var new_version = JSON.parse(res.body.string())

        var r = {
          bin: false,
          bin_link: "",
          img: false,
          img_link: ""
        }

        //判断
        if (local_version.bin.version_name != new_version.bin.version_name) {
          console.log("[更新] 检查到有新版本发布！")
          toast("检查到有新版本发布！")

          r.bin = true,
            r.bin_link = new_version.bin.link
        }

        if (local_version.img.date != new_version.img.date) {
          console.log("[更新] 检查到图片资源更新！")
          toast("检查到图片资源更新！")
          r.img = true,
            r.img_link = new_version.img.link
        }

        if (!r.bin && !r.img) {
          console.log("[更新] 当前为最新版本！")
          toast("更新：当前为最新版本！")
        }



      } else {
        log("更新：网络异常")
        toastLog("更新：网络异常")
      }
    });
  }

}