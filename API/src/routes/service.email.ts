import * as nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

export const email = async (from : string, name : string, message : string) => {

            let htmlEmail = `
            
                <h3>Email enviado desde la página web</h3>
                <ul>
                    <li>Email: ${from}</li>
                    <li>Nombre: ${name}</li>
                </ul>
                <h3>Mensaje</h3>
                <p>${message}</p>
                    
                `

            let mailOptions = {
                from: "emidesarrolloweb@gmail.com",
                to: "emi.acevedo.letra@gmail.com",
                subject: "Consulta desde la web",
                text: message,
                html: htmlEmail,
                headers: { 'x-myheader': 'test header' }
            };

            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth:{
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

            const info = await transporter.sendMail({

                        from: '"Desde la Web" <'+ process.env.EMAIL_USER +'>',
                        to: process.env.EMAIL,
                        subject: "Consulta desde la web",
                        text: message,
                        html: htmlEmail,
                        headers: { 'x-myheader': 'test header' }
                   });

            console.log("Message sent: %s", info.response);

        }