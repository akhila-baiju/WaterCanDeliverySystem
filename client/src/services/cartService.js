import axios from 'axios';
const API_URL = 'http://localhost:3001/api/cart'; 

const cartService = {
  addToCart:async(formData)=>{
    try{
      const response = axios.post(`${API_URL}/addcart`,formData);
    }catch(error){
      console.error('Error fetching user:', error);
      throw error;
    }
  },
    
    getItemQuantityInCart:async(userId, productId)=>{
        try{ 
         const response = await fetch(`${API_URL}/getquantity/${userId}/${productId}`);
        
         return response
            }catch(error){
          console.error('Error fetching user:', error); 
          throw error;
        }
      },
   

      updateCart:async(formData)=>{
        console.log("form = "+formData)
    try{
      const response = axios.put(`${API_URL}/updateCart`,formData);
      return response;
    }catch(error){
      console.error('Error fetching user:', error);
      throw error;
    }
  },

  getCart:async(id)=>{
    try{
       
         const response =await fetch(`${API_URL}/cart/${id}`);
        return response
      
    }catch(error){
      console.error('Error fetching user:', error);
      throw error;
    }
  },

  
  removeItem:async(id)=>{
    try{
      const response = axios.put(`${API_URL}/remove/${id}`);
    }catch(error){
      console.error('Error fetching user:', error);
      throw error;
    }
  },

}

export default cartService