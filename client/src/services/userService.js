import axios from 'axios';
const API_URL = 'http://localhost:3001/api/user'; 
const userService =  {
    getUserById:async(id)=>{
        try{
             const response =await fetch(`${API_URL}/user/${id}`);
            return response
          //    const result = await response.json();
          //  //  console.log("response== "+result.email)
          //    return result;
        }catch(error){
          console.error('Error fetching user:', error);
          throw error;
        }
      },

      getManufacturer:async(id)=>{
        try{
          console.log("in service")
          const response =await fetch(`${API_URL}/user/manufacturer/${id}`);
          return response
     }catch(error){
       console.error('Error fetching user:', error);
       throw error;
     }
   },


   sendMail:async(id)=>{
    try{
      console.log("in service")
      const response =await axios.post(`${API_URL}/sendMail`,id);
      return response
 }catch(error){
   console.error('Error fetching user:', error);
   throw error;
 }
},

updateUser:async(values)=>{
  try{
    const response =await axios.put(`${API_URL}/update`,values);
   
}catch(error){
  console.error('Error fetching user:', error);
  throw error;
}
},


}


export default userService