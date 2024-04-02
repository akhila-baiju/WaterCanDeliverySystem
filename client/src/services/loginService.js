
import axios from 'axios';
const API_URL = 'http://localhost:3001/api'; 

const loginService = {
       signupUser:(formData)=>{
        try{ 
                  const response = axios.post(`${API_URL}/signup`,formData);
                 // console.log("user - "+formData.firstName)
           }
        catch(error){
                  console.error('Error fetching user:', error);
                  throw error;
                }
      },

      loginUser:async(formData)=>{
        try{ 
         // const data = await response.json();
                  const response =await axios.post(`${API_URL}/login`,formData);
                  const id=response.data.userId;
                  const role=response.data.userType;
                  console.log("role= "+role)
                  if(role=="customer")
                  {
                   
                    localStorage.setItem("id",id)
                    return "/user/userheader";
                  }
                 else
                  {
                    
                    localStorage.setItem("id",id)
                    return "/"+role;
                  }
                
           }
        catch(error){
                  console.error('Error fetching user:', error);
                  throw error;
                }
      },
 

      resetPassword:async(formData)=>{
        try{ 
         // const data = await response.json();
                  const response =await axios.post(`${API_URL}/resetpassword`,formData);
                  return response;
                
           }
        catch(error){
                  console.error('Error fetching user:', error);
                  throw error;
                }
      }
}

export default loginService