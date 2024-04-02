
import axios from 'axios';
const API_URL = 'http://localhost:3001/api/products'; 

const productService = {
       addProducts:(formData)=>{
        try{  
          console.log("in service= "+formData.photo)
                  const response = axios.post(`${API_URL}/add`,formData);
           }
        catch(error){
                  console.error('Error fetching user:', error);
                  throw error;
                }
      }, 

      uploadProducts:(formData)=>{
        try{  
        
          const response = axios.post(`${API_URL}/add`,formData,{
       
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
           }
        catch(error){
                  console.error('Error fetching user:', error);
                  throw error;
                }
      },

     
      getProducts:async(id)=>{
        try{
           
             const response =await fetch(`${API_URL}/user/${id}`);
            return response
          
        }catch(error){
          console.error('Error fetching user:', error);
          throw error;
        }
      },

      getAllProducts:async()=>{
        try{
        
            const response =await fetch(`${API_URL}/allproducts`);
            //console.log(response)
            return response
          
        }catch(error){
          console.error('Error fetching user:', error);
          throw error;
        }
      },

      getProductsById:async(id)=>{
        try{
           
             const response =await fetch(`${API_URL}/product/${id}`);
            return response
          
        }catch(error){
          console.error('Error fetching user:', error);
          throw error;
        }
      },


}

export default productService