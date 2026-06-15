"use server"
import nodemailer from "nodemailer"
import process from "process";

const subjects = ["Adhesion", "Programmation", "Infos", "Autre"]
const regexp : RegExp = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;

export async function POST(req: Request) {
  try {
    const { email, message, subject} = await req.json();
    console.log(email, message, subject);
    if (!subjects.includes(subject)) {
      return Response.json({ message: "Subject invalid."}, { status : 400 })
    }
    if (!regexp.test(email)) {
      return Response.json({ message: "Email invalid."}, { status : 400 })
    }
    if (message === "" || !message) {
      return Response.json({ message: "Message invalid."}, { status : 400 })
    }    
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASS
      },
    });
    try {
      await transporter.sendMail({
        from: email,
        replyTo: email,
        to: process.env.EMAIL_L2A,
        subject: `Site Web : ${subject}`,
        text: message,
      });
      return Response.json({ message:'Email sent with success!' }, { status: 200 })
    }
    catch (e) {
      console.log(e);
      return Response.json({ message:"An error occured." }, { status : 500});
    }
  }
  catch (e) {
    console.log(e);
    return Response.json({ message:"An error occured." }, { status: 500 })
  }

}
