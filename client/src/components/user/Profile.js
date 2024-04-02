import * as React from 'react';
import { useEffect,useState } from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import userService from '../../services/userService';

import UpdateForm from './UpdateForm';
export default function Profile() {
  const [data, setData] = useState(null);
  const id = localStorage.getItem('id');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    address: '',
  });

  useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await userService.getUserById(id);
           const result = await response.json();
          // console.log("result== "+result);
           setData(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    fetchData();
}, []);

// const handleChange = (e) => {
//   const { name, value } = e.target;
//   setFormData((prevFormData) => ({
//     ...prevFormData,
//     [name]: value,
//   }));
//   //console.log("name: "+name+" value: "+value)
// };
// const handleSubmit = (values) => {
//   // Handle form submission logic here
//   console.log('Form submitted with values:', values);
// };
    const handleUpdate = async (values) => {
      alert("updat")
      // try {
      //     const response = await adminService.updateUser(id, values);
      // } catch (error) {
      //     console.error('Error updating user:', error);
      // }
      // toast.success('User Data Updated Succseefully!!!!', {
      //     position: toast.POSITION.TOP_CENTER,
      // });

      // navigate('/admin/list');
  };
  return (
  
      <Box >
        <Stack
          spacing={4}
          sx={{
            display: 'flex',
            maxWidth: '800px',
            mx: 'auto',
            // px: { xs: 2, md: 6 },
            // py: { xs: 2, md: 3 },
          }}
        >
        <Card>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md">Personal info</Typography>
          </Box>
          <Divider />
          <Stack
            direction="row"
            spacing={3}
            sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
          >
            <Stack direction="column" spacing={1}>
              <AspectRatio
                ratio="1"
                maxHeight={200}
                sx={{ flex: 1, minWidth: 120, borderRadius: '100%' }}
              >
                
              </AspectRatio>
              <IconButton
                aria-label="upload new picture"
                size="sm"
                variant="outlined"
                color="neutral"
                sx={{
                  bgcolor: 'background.body',
                  position: 'absolute',
                  zIndex: 2,
                  borderRadius: '50%',
                  left: 100,
                  top: 170,
                  boxShadow: 'sm',
                }}
              >
                <EditRoundedIcon />
              </IconButton>
            </Stack>
     
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
            {data && <UpdateForm initialValues={data}/>}
            </Stack>
           </Stack>
        </Card>
       </Stack> 
   </Box> 
  );
}
