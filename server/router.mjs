import Router from 'koa-router'
import nodemailer from 'nodemailer'

const router = new Router()
const isDev = process.env.NODE_ENV === 'development'


// . 配置 nodemailer 邮件传输器（单例模式，避免重复创建连接）
let transporter;
try {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtpdm.aliyun.com', // 邮箱 SMTP 服务器（如 QQ：smtp.qq.com）
    port: parseInt(process.env.SMTP_PORT, 10) || 465, // SMTP 端口（SSL：465，非 SSL：25）
    secure: process.env.SMTP_SECURE === 'true' || true, // 是否启用 SSL（建议 true）
    auth: {
      user: process.env.EMAIL_USER || 'noreply@pushmail.isrc.ac.cn', // 发送邮件的邮箱账号（如：123456@qq.com）
      pass: process.env.EMAIL_PASS || 'XIAOhai20080', // 邮箱 SMTP 授权码（非登录密码！）
    },
    // 超时配置（避免邮件发送阻塞）
    connectionTimeout: 10000, // 连接超时 10s
    greetingTimeout: 5000, // 问候超时 5s
  });

  // 验证邮件传输器配置（仅开发环境打印）
    transporter.verify((error) => {
      if (error) {
        console.error('❌ 邮件传输器配置失败：', error.message);
      } else {
        console.log('✅ 邮件传输器配置成功，已准备就绪');
      }
    });
  
} catch (error) {
  console.error('❌ 初始化邮件传输器失败：', error.message);
  process.exit(1); // 邮件配置错误，直接退出服务
}


router.post('/subscribe', async (ctx,next) => {
  try{
      const { name,email,subscribeTime } = ctx.request.body

    const targetEmail = process.env.TARGET_EMAIL || isDev ? 'jianyu@iscas.ac.cn' : 'jiayi@iscas.ac.cn'; // 接收订阅信息的指定邮箱

      // 构造邮件内容（HTML 格式，支持自定义样式）
      const mailOptions = {
        from: `"openRuyi官网订阅通知" <${'noreply@pushmail.isrc.ac.cn'}>`, // 发件人（格式：昵称 <邮箱>）
        to: targetEmail, // 收件人（指定邮箱，多个用逗号分隔：a@xxx.com,b@xxx.com）
        subject: `【openRuyi官网订阅】新用户订阅 - ${name}（${email}）`, // 邮件主题（含关键信息，便于筛选）
        html: `
          <div style="font-family: 'Microsoft YaHei', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #f0f0f0; border-radius: 8px; background: #fff;">
            <div style="text-align: center; margin-bottom: 20px;">
              <h2 style="color: #2f54eb; margin: 0;">openRuyi 官网用户订阅信息</h2>
              <div style="height: 2px; width: 60px; background: #2f54eb; margin: 10px auto;"></div>
            </div>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr style="height: 40px; border-bottom: 1px solid #f0f0f0;">
                <td style="width: 30%; padding-left: 10px; font-weight: 500; color: #666;">姓名</td>
                <td style="padding-left: 10px; color: #333;">${name}</td>
              </tr>
           
              <tr style="height: 40px; border-bottom: 1px solid #f0f0f0;">
                <td style="width: 30%; padding-left: 10px; font-weight: 500; color: #666;">邮箱</td>
                <td style="padding-left: 10px; color: #333;">${email}</td>
              </tr>
             
              <tr style="height: 40px;">
                <td style="width: 30%; padding-left: 10px; font-weight: 500; color: #666;">订阅时间</td>
                <td style="padding-left: 10px; color: #333;">${subscribeTime}</td>
              </tr>
            </table>
            <div style="text-align: center; color: #999; font-size: 12px; margin-top: 30px;">
              <p>此邮件由openRuyi官网订阅系统自动发送，请勿直接回复</p>
              <p>© ${new Date().getFullYear()} 您的官网名称 - 保留所有权利</p>
            </div>
          </div>
        `,
        // 可选：添加文本格式备用（防止邮箱不支持 HTML）
        text: `
          官网用户订阅信息
          ----------------
          姓名：${name}
          邮箱：${email}
          订阅时间：${subscribeTime}
          ----------------
          此邮件由系统自动发送，请勿回复
        `,
      };

      // 发送邮件（await 等待发送结果，捕获异常）
      await transporter.sendMail(mailOptions);
     ctx.status = 200;
      ctx.body = {
        success: true,
        message: '订阅信息已成功发送到指定邮箱',
      };


  } catch (error) {
      // 邮件发送失败，返回 500 响应
      ctx.status = 500;
      ctx.body = {
        success: false,
        message: isDev ? `服务异常：${error.message}` : '订阅信息发送失败，请稍后重试',
      };

      // 打印错误日志（便于排查）
      console.error('❌ 邮件发送失败：', {
        userData: ctx.subscribeData,
        error: error.message,
        stack: error.stack,
      });
    }

})

export default router
