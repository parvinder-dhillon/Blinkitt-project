import Axios from './Axios'
import SummaryApi from '../common/SummaryApi'

const uploadImage = async(image)=>{
    try{
        console.log("this is upload image",image)
        const formData = new FormData()
        console.log("this is upload formData",formData)
        formData.append('image',image)
        const response = await Axios({
            ...SummaryApi.uploadImage,
            data: formData
        })
        return response
     } catch (error){
        return error
        }
}
export default uploadImage