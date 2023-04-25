import { getDbConnection } from '../../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

export const userLoginRoute = {
    path: '/api/user/login',
    method: 'post',
    handler: async (req, res) => {

        //https://stackoverflow.com/questions/32264946/sending-email-from-local-host-with-nodemailer
        let transporter = nodemailer.createTransport({
            port: process.env.API_MAIL_PORT,
            host: process.env.API_MAIL_HOST,
            secureConnection: false,
            auth: {
                user: process.env.API_MAIL_USER,
                pass: process.env.API_MAIL_PASS
            },
            tls: {
                ciphers:'SSLv3'
            }
        });

        const { email, password } = req.body;

        const db = getDbConnection(process.env.API_DB_NAME);

        const user = await db.collection('person').findOne({ email })

        if (!user) {
            res.sendStatus(401);
            return;
        }


        if( ! ("passwordHash" in user)){
            await jwt.sign({
                id: user._id,
                username: user.firstName
            },
                process.env.JWT_SECRET,
            {
                expiresIn: process.env.API_LOGIN_PERIOD
            }, (err, passwordGenLink)=>{
                if (err) {
                    res.status(500).json(err);
                    return;
                }

                let mailOptions = {
                    from: 'pilgosample@gmail.com',
                    to: user.email,
                    subject: `${ process.env.API_PORTAL_NAME } - Create your password`,
                    text: `Hi ${user.firstName}, \n Please create your password from the following link /password/generate/${ passwordGenLink }/ .  \n the above link is only valid for the next 2 hours.`,
                    html: `<html>
                    <body style='font-family:arial;'>
                       <div style='width:100%;background:#f7f7f7;display:block;color:#242424'>
                          <Br/>
                          <div style='width:500px;background:#fff;display:block;margin: 20px auto;box-sizing:border-box;padding:20px;'>
                             <a href='https://www.piloggroup.com/' target='_blank'>
                                <img style='max-width:80px;' src='${ process.env.API_EMAIL_LOGO }'>
                             </a>
                             <br/>
                             <p>Hello ${  user.firstName },
                                <br/>
                                <br/>
                                <b>Please create password for your account from the button below.</b>
                                <br/>
                                <br/> 
                                <a style='background:#0b4a99;text-decoration:none;color: #fff;padding:5px 10px;margin-top:2px;' href='https://${ process.env.API_WEB_ADDR }/password/generate/${ passwordGenLink }/' target='_blank'>Generate Password</a>. <br/>
                                <br/> If the above button is not working, copy the link below and paste it into the address bar.
                                <br/>
                                <div style="width:calc( 100% - 20px);background:#f7f7f7;border:1px solid #e7e7e7;border-radius:5px;padding:10px;"><a style="color:#666;font-size:12px;">https://${ process.env.API_WEB_ADDR }/password/generate/${ passwordGenLink }/</a></div>
                                <br/>
                                If you have any problem generating your password, our team is always happy to help. You can visit our <a style='color:#0b4a99;text-decoration:none' href='https://${ process.env.API_WEB_ADDR }/' target='_blank'>website</a> for more information or reply to this email to get in touch. 
                                <br/>
                                <br/>
                                Regards,
                                <br/>
                                <b>Team ${ process.env.API_PORTAL_NAME }</b>
                                </p>
                          </div>
                          <Br/>
                          <div style='color:#222;font-size:10px; width:500px;opacity:0.6;text-align:center; margin: 0 auto;display:block;'>Address</div>
                          <br/>
                       </div>
                    </body>
                 </html>`
                };

                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log("error", error);
                        res.sendStatus(200).json({
                            message: "We are unable to send you password verification link. Contact support team to generate the password."
                        })
                    } else {
                        console.log("sent")
                        res.sendStatus(200).json({
                            message: "Please create password for your account with the link sent on your email."
                        })
                    }
                });

                
                return;
            }
            )

            return;
            
        }else{

            console.log("else cond");
            
            const { _id: id, passwordHash, firstName, lastName, type, kycStatus } = user;
    
            const isCorrect = await bcrypt.compare(password, passwordHash);
    
            if (isCorrect) {
                jwt.sign(
                    {
                        id,
                        email,
                        username: firstName + " " + lastName,
                        userType: type,
                        kycStatus
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: process.env.API_LOGIN_PERIOD
                    }, (err, token) => {
                        if (err) {
                            res.status(500).json(err);
                            return;
                        }
                        res.status(200).json({ token, userType: type });
                    }
                )
            } else {
                res.sendStatus(401);
            }
        }


    }
}