import { getDbConnection } from '../../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import nodemailer from 'nodemailer';

export const createIndividualInvestor = {
    path: '/api/create-individual-investor/',
    method: 'put',
    handler: async (req, res) => {

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

        //get auth header from client
        const { authorization } = req.headers;
        const { _id,contactPoint,personalInfo } = req.body;

        if (!authorization) {
            return res.status(401).json({ message: "No Authorization header sent." })
        }

        // bearer [Token] <=== need this
        const token = authorization.split(" ")[1];

        jwt.verify(
            token,
            process.env.JWT_SECRET,
            async (err, decoded) => {
                if (err) return res.status(401).json({ message: "Unable to verify user" });

                const db = getDbConnection(process.env.API_DB_NAME);

                //check if email already exist
                const user = await db.collection('person').findOne({ email: contactPoint.email });
                if(user){
                    res.sendStatus(409);
                    return;
                }

                // const result = await db.collection("roles").find({}).toArray();
                const result = await db.collection('person').insertOne({
                    ...contactPoint,
                    ...personalInfo,
                    dob: new Date(personalInfo.dob),
                    type: "Individual Investor",
                    kycStatus: "Draft",
                    membershipStatus: "Incomplete",
                    privateLaunchInvestor: "Regular",
                    createdAt: new Date(),
                    createdBy: ObjectId(_id)
                })

                //send password link
                await jwt.sign({
                    id: result.insertedId
                },
                    process.env.JWT_SECRET,
                {
                    expiresIn: process.env.API_LOGIN_PERIOD
                }, (err, passwordGenLink)=>{
                    if (err) {
                        res.status(500).json(err);
                        return;
                    }

                    console.log(contactPoint.email, contactPoint.firstName)
    
                    let mailOptions = {
                        from: 'pilgosample@gmail.com',
                        to: contactPoint.email,
                        subject: `${ process.env.API_PORTAL_NAME } - Create your password`,
                        text: `Hi ${contactPoint.firstName}, \n Please create your password from the following link /password/generate/${ passwordGenLink }/ .  \n the above link is only valid for the next 2 hours.`,
                        html: `<html>
                        <body style='font-family:arial;'>
                           <div style='width:100%;background:#f7f7f7;display:block;color:#242424'>
                              <Br/>
                              <div style='width:500px;background:#fff;display:block;margin: 20px auto;box-sizing:border-box;padding:20px;'>
                                 <a href='https://www.piloggroup.com/' target='_blank'>
                                    <img style='max-width:80px;' src='${ process.env.API_EMAIL_LOGO }'>
                                 </a>
                                 <br/>
                                 <p>Hello ${  contactPoint.firstName },
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
                            res.status(200).json({ message: "Individual Investor Created", emailSent: false, createdId: result.insertedId })
                        } else {
                            console.log("sent")
                            res.status(200).json({ message: "Individual Investor Created", emailSent: true,  createdId: result.insertedId })
                        }
                    });
    
                    
                    return;
                }
                )


                

            }
        )


    }
}
