/*
 * @Descripttion: 发送邮件模块
 * @version: 
 * @Author: xiaowuyaya
 * @Date: 2021-11-17 19:33:01
 */
runtime.loadDex("./libs/email.jar")
importClass(java.util.Properties);
importPackage(javax.mail);
importPackage(javax.activation)
importPackage(javax.mail.internet);


module.exports = {

  /**
   * @name: 发送邮件
   * @param {*} json对象
   * @return {*}
   */  
  LogginSendToMail(data) {
    // 配置邮箱信息
    var props = new Properties();
    props.put("mail.smtp.host", "smtp.163.com");
    let SENDER = "liaolingwei605@163.com"
    let RECEIVER = "10895852@qq.com"
    let COPYTO = "282143356@qq.com"
    let AUTH_CODE = "FDAPOYDWIIFQYIAP"

    var session = javax.mail.Session.getInstance(props, null);

    //配置日志文件信息
    // var log = open(loginFile)
    // var data = log.read()
    

    try {
      var msg = new MimeMessage(session);
      //发送方
      msg.setFrom(SENDER);
      //接收方
      msg.setRecipients(javax.mail.Message.RecipientType.TO, RECEIVER);
      msg.setRecipients(javax.mail.Message.RecipientType.CC, COPYTO);
      //标题
      msg.setSubject(data.title);
      //发送时间
      msg.setSentDate(new Date());
      //发送内容
      msg.setText(data.content);

      //发送
      Transport.send(msg, SENDER, AUTH_CODE);
      console.info("异常信息邮件发送成功")
    } catch (mex) {
      console.warn("异常信息邮件发送失败：" + mex)
    }
  },
}
