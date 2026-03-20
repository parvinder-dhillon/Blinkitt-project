export const baseUrl = "http://localhost:8080"

const SummaryApi = {
    register:{
        url:'/api/users/register',
        method:'post'
    },
    login:{
        url:'/api/users/login',
        method:'post'
    },
    ForgotPassword:{
        url:'/api/users/forgot-password',
        method:'put'
    },
    VerifyForgotPasswordOtp:{
        url:'/api/users/verify-forgot-password-otp',
        method:'put'
    },
    ResetPassword:{
        url:'/api/users/reset-password',
        method:'put'
    },
}
export default SummaryApi