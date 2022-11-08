import transporter from "../config/nodemailer.js";

async function sendConfirm(id, email) {
    let message = await transporter.sendMail({
        from: '"OtsoStorage " <admin@otso.su>',
        to: email,
        subject: "Подтверждение регистрации | Otso Storage",
        html: 
        `
            <head>
                <style>
                button {
                    transition-duration: 0.4s;
                }
                button:hover {
                    box-shadow: 0 0px 2px 0 rgba(0,0,0,0.24), 0 0px 11px 0 rgba(0,0,0,0.19);
                }
                </style>
            </head>
            <body>
                <center>&nbsp;<br /><center>
                <table style="height: 445px; width: 400px;">
                    <tbody>
                        <tr style="height: 31px;">
                            <td style="width: 16.0833px; height: 31px;">&nbsp;</td>
                            <td style="width: 350.033px; text-align: center; height: 31px;">
                            <h3><img src="https://i.ibb.co/hHPD1xm/logo.jpg" alt="" width="178" height="54" /></h3>
                            <hr style="border-top: 1px solid #ededed;" /></td>
                            <td style="width: 13.4833px; text-align: center; height: 31px;">&nbsp;</td>
                        </tr>
                            <tr style="height: 85.8333px;">
                            <td style="width: 16.0833px; height: 85.8333px;">&nbsp;</td>
                            <td style="width: 350.033px; height: 85.8333px;"><span style="color: #333333; font-size: 16px; font-family: Tahoma;">Подтвердите свою почту, чтобы завершить регистрацию на сайте Otso Storage.<br /></span>
                            <p><span style="color: #666666; font-size: 14px; font-family: Tahoma;">Этот адрес электронной почты был указан при регистрации. Если это были не Вы, проигнорируйте это письмо.<br /></span></p>
                        </td>
                            <td style="width: 13.4833px; height: 85.8333px;">&nbsp;</td>
                        </tr>
                        <tr style="height: 24px;">
                            <td style="width: 16.0833px; height: 24px;">&nbsp;</td>
                            <td style="width: 350.033px; height: 24px;"><hr style="border-top: 1px solid #ededed;" /><br /><center>
                                <a href="http://localhost:3000/confirm/${id}" target="_blank" rel="noopener"> 
                                    <button style="background-color: #2368c7; color: white; border: 1px solid #3B82F6; padding: 8px; border-radius: 6px; cursor: pointer; font-size: 15px; font-family: Tahoma;">Подтвердить регистрацию</button> 
                                </a>
                                </center><center></center><center><br /><br /><span style="color: #4d4f51; font-size: 11px; font-family: Tahoma;">Если Вы не видите кнопку, подтвердите свой аккаунт по ссылке: <a href="http://localhost:3000/confirm/${id}" target="_blank">http://localhost:3000/confirm/${id}</a><br></span></center></td>
                            <td style="width: 13.4833px; height: 24px;">&nbsp;</td>
                        </tr>
                    </tbody>
                </table>
            </body>
        `,
    });
    return message;
}


export default sendConfirm;