import React, { useState,useEffect } from 'react';
import Stack from '@mui/joy/Stack';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import Button from '@mui/joy/Button';
import userService from '../../services/userService';

const ShippingInfoPage = ({ onSubmit }) => {
    const [formData, setFormData] = useState(null);
    const id = localStorage.getItem('id');
    console.log("checkout page== "+id)
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await userService.getUserById(id);
           const result = await response.json();
           console.log("result== "+result.firstName);
           setFormData(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    fetchData();
    }, []);
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length === 0) {
          onSubmit(formData);
        } else {
          setErrors(validationErrors);
        }
      };

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '', // Clear validation error when the field changes
    });
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.address.trim()) {
      errors.address = 'Address is required';
    }
    if (!data.email.trim()) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(data.email)) {
      errors.email = 'Invalid email address';
    }
    if (!data.contactNumber.trim()) {
      errors.contactNumber = 'Contact Number is required';
    } else if (!isValidPhoneNumber(data.phone)) {
      errors.contactNumber = 'Invalid phone number';
    }
    return errors;
  };

  const isValidEmail = (email) => {
    // Basic email validation
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const isValidPhoneNumber = (phone) => {
    // Basic phone number validation
    const re = /^[0-9]{10}$/;
    return re.test(phone);
  };

    return (
        <div>

            <form onSubmit={handleSubmit}>
                <Stack spacing={1} sx={{ flexGrow: 1 }}>
                    <FormLabel>Name</FormLabel>
                    <FormControl
                        sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                    >
                        <Input size="sm" 
                        value={formData.firstName+" "+formData.lastName}
                         variant="standard" disabled/>
                    </FormControl>

                    <FormLabel>Contact Number</FormLabel>
                    <FormControl
                        sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                    >
                        <Input size="sm"  
                        value={formData.contactNumber}
                         variant="standard" sx={{ flexGrow: 1 }} onChange={handleChange} />
                        {errors.contactNumber && <span style={{ color: 'red' }}>{errors.contactNumber}</span>}
                    </FormControl>
                    <FormLabel>Email</FormLabel>
                    <FormControl
                        sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                    >
                        <Input size="sm" type="email"
                       value={formData.email} 
                         variant="standard" sx={{ flexGrow: 1 }} onChange={handleChange}/>
                        {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                    </FormControl>
                    <FormLabel>Address</FormLabel>
                    <FormControl
                        sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                    >
                        <Textarea name="Plain" 
                        value={formData.address} 
                        placeholder="Enter your Delivery Address" variant="plain" sx={{ flexGrow: 1 }} onChange={handleChange} />
                        {errors.address && <span style={{ color: 'red' }}>{errors.address}</span>}
                    </FormControl>

                    <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                        <CardActions sx={{ alignSelf: 'flex-end', pt: 2 , gap: 7}}>

                            <Button size="sm" variant="solid" type='submit'>
                                Update
                            </Button>
                        </CardActions>
                    </CardOverflow>
                </Stack>
            </form>
        </div>
    );
};

export default ShippingInfoPage;
