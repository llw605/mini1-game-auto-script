/*
 * @Descripttion: 
 * @version: 
 * @Author: xiaowuyaya
 * @Date: 2021-11-19 12:22:08
 */
console.log("**开始检测主程序状态 10秒一次**")
setInterval(() => {
  try {
    
    var list = engines.all().toString();
    var index = list.indexOf("main.js");
  
    if (index === -1) {
      console.log("[检测] 主程序不存在,正在重启...")
      engines.execScriptFile("./main.js");
    } else {
      console.log("[检测] 主程序存在.")
    }
  
  } catch (e) {
    console.warn("[检测] 发生异常： %s", e)
  }
}, 10000);