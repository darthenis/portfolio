import * as nodemailer from 'nodemailer'
import axios from 'axios'


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

            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth:{
                    user: 'emidesarrolloweb@gmail.com',
                    pass: 'lorencia676'
                }
            });

            const info = await transporter.sendMail({

                        from: '"Desde la Web" <'+ 'emidesarrolloweb@gmail.com' +'>',
                        to: 'emi.acevedo.letras@gmail.com',
                        subject: "Consulta desde la web",
                        text: message,
                        html: htmlEmail,
                        headers: { 'x-myheader': 'test header' }
                   });

            console.log("Message sent: %s", info.response);

        }


export const checkToken = async (token:string) => {

        const checkToken = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=6LdEjskaAAAAADlaEZBm8-hlcvU03Pndl2xorkZ5&response=${token}`)

        return checkToken
       

    }

export const infoAccount = async (token : number, email : string) => {

                    
            let htmlEmail = `
            
            <h3>Email enviado desde la app RoleTools</h3>
            <p>Este es el codigo: ${token}</p>
                
            `

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth:{
                user: 'emidesarrolloweb@gmail.com',
                pass: 'lorencia676'
            }
        });

        const info = await transporter.sendMail({

                    from: '"Desde la Web" <'+ 'emidesarrolloweb@gmail.com' +'>',
                    to: email,
                    subject: "Recuperación de cuenta",
                    html: htmlEmail,
                    headers: { 'x-myheader': 'test header' }
               });

        console.log("Message sent: %s", info.response);

    }



export const confirmationEmail = async (token : string, email : string) => {

                    
        let htmlEmail = `
        
        <h3>Email enviado desde la app RoleTools</h3>
        <p>Gracias por registrarte en RoleTools, a continuacion haga click en el siguiente link 
        <a href='http://localhost:3000/roletools/confirm/${token}'>Haga click aquí</a></p>
            
        `

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth:{
            user: 'emidesarrolloweb@gmail.com',
            pass: 'lorencia676'
        }
    });

    const info = await transporter.sendMail({

                from: '"Desde la Web" <'+ 'emidesarrolloweb@gmail.com' +'>',
                to: email,
                subject: "Confirmación de email",
                html: htmlEmail,
                headers: { 'x-myheader': 'test header' }
           });

    console.log("Message sent: %s", info.response);

}