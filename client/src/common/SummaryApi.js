export const baseUrl = "http://localhost:8080"

const SummaryApi = {
    register:{
        url:'/api/users/register',
        method:'post'
    },
    login:{
        url:'/api/users/login',
        method:'post'
    }
}
export default SummaryApi