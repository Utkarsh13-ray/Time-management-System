import * as nodemailer from 'nodemailer';

export default async function handler(req, res) {
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "mateo84@ethereal.email", // generated ethereal user
          pass: "62jRUPy6mCbKrRS17U", // generated ethereal password
        },
    });

    const data = JSON.parse(JSON.stringify(req.body));
    console.log(data)
    if(req.method === "POST"){
        try{
            await transporter.sendMail({
                from: '"Fred Foo 👻" <foo@example.com>',
                to: data.recipient.email,
                subject: "Meeting",
                text: "Hello world?",
                html: "<b>Hello world?</b>",
            });
            console.log(req.body);
            console.log(data);
            res.status(200).json(data);
        } catch(err){
            console.log(err);
        }
        // console.log(req.body);
    } else {
        res.status(200).json({ message: "Yo" });
    }
}
