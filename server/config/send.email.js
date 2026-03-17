import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config()
//check if api availible or not 
if(!process.env.RESEND_API_KEY){
  console.log("please provide RESEND_API")
}

//providing api key to Resend
const resend = new Resend(process.env.RESEND_API_KEY);

//sendemail function to send email to user 
const sendEmail = async({sendTo,subject,html})=>{
  try {
    // send() is work via 4 keys and then give response as data and error 
    const { data, error } = await resend.emails.send({
      from:'Blinkitt <onboarding@resend.dev>',
      to:sendTo,
      subject:subject,
      html:html
    })
    if(error){
      return console.log({error})
    }
    return data
  } catch (error) {
    console.log(error)
  }
}
export default sendEmail

 