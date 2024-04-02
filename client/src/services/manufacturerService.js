import axios from 'axios';
const API_URL = 'http://localhost:3001/api/manufacturer'; 
const manufacturerService =  {

      getManufacturer:async(id)=>{
        try{
         
          const response =await fetch(`${API_URL}/manufacturer/${id}`)
          return response
     }catch(error){
       console.error('Error fetching user:', error);
       throw error;
     }
   },
   getAllManufacturers:async()=>{
    try{
    
        const response =await fetch(`${API_URL}/allmanufacturers`);
       // console.log(response)
        return response
      
    }catch(error){
      console.error('Error fetching user:', error);
      throw error;
    }
  },

}


export default manufacturerService