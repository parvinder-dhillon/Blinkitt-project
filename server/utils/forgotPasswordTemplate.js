const forgotPasswordTemplate =({ name , otp})=>{
    return `
    <div>
    <p>Dear, ${name}</p>
    <p>you've requested to reset your password. Please use the following OTP to reset your password:</p>
    <div style="text-align:center;padding:2px;font-size:2rem;background:yellow;margin:20px 0;">
    ${otp}
    </div>
    <pThis otp is valid for 1 hour only.Enter this otp in blinkitt website to procede with resting your password  </p>
    </br>
    </br> 
    <p>thank you for using blinkitt</p>
    </div>
    `
}
export default forgotPasswordTemplate