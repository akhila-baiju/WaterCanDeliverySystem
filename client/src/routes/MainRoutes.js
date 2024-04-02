import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '../components/home/Home.js';
import Login from '../components/login/Login.js';
import SignUp from '../components/login/Signup.js';
import Welcome from '../components/login/Welcome.js';
import Aboutus from '../components/home/Aboutus.js';
import Forgetpassword from '../components/login/Forgetpassword.js';
import Resetpassword from '../components/login/Resetpassword.js';

import User from '../components/user/Userdashboard.js';
import Userheader from '../components/user/Userheader.js';
import UserProfile from '../components/user/Profile.js';
import UserOrders from '../components/user/Userorders.js';
import UserBills from '../components/user/UserBills.js';
import UserWish from '../components/user/Usershoping.js';
import UserChangePassword from '../components/user/FormPasswordReset.js';
import ProductsList from '../components/products/Products.js';
import Subscription from '../components/home/Subscription.js';
import Offers from '../components/home/Offers.js';
import Footer from '../components/home/Footer.js';
//import Dashboard from '../components/home/Dashboard.js';
import Homepage from '../components/home/Homepage.js';
import Checkout from '../components/cart/Checkout.js';

import VendorHome from '../components/vendor/Home.js';
import VendorDashboard from '../components/vendor/Dashboard.js';
//import VendorListItems from '../components/vendor/Listitems.js';
import VendorAddProducts from '../components/vendor/Addproducts.js';
//import VendorTables from '../components/vendor/Tables.js';
import VendorProducts from '../components/vendor/Myproducts.js';

import ManufactureDashboard from '../components/manufacturer/Dashboard.js';
import ManufactureAddProducts from '../components/manufacturer/Addproducts.js';
import ManufactureListProducts from '../components/manufacturer/Listproducts.js';
import ViewOrders from '../components/manufacturer/Orders.js'
import ManufactureIssues from '../components/manufacturer/Issues.js';

const MainRoutes = () => {
  const BASE_PATH = '/';
  const PATH_LOGIN = '/login';
  const PATH_SIGNUP = '/signup';
  const PATH_HOME = "/homepage";
 const PATH_WELCOME ="/welcome";
 const PATH_ABOUTUS ="/aboutus";
 const PATH_FORGETPASSWORD ="/forgetpassword";
 const PATH_RESETPASSWORD ="/resetpassword";

 const PATH_PRODUCTS = "/productslist";
 const PATH_SUBSCRIPTION ="/subscription";
 const PATH_OFFERS ="/offers";
 const PATH_FOOTER="/footer";
 

const PATH_USER = "/user";
const PATH_USERHEADER = "/user/userheader"
const PATH_USERPROFILE = "/user/userheader/userprofile";
const PATH_CHANGEPASSWORD = "/user/userheader/resetpassword";

const PATH_USERBILLS = "/user/userheader/userbills";
const PATH_USERORDERS = "/user/userheader/userorders";
const PATH_USERWISH = "/user/userheader/userwish";
const PATH_USER_CHECKOUT ="/user/userheader/usercheckout";

const PATH_VEN_DASH = "/vendor";
const PATH_VEN_HOME = "/vendor/home";
const PATH_VEN_ADD = "/vendor/addproducts";
const PATH_VEN_PRO = "/vendor/myproducts";
//const PATH_VEN_LIST_ITEMS = "/vendor/listitems";
//const PATH_VEN_HOME = "/vendor/home";
//const PATH_VEN_TABLES = "/vendor/tables";

const PATH_MANU_DASH = "/manufacturer";       
const PATH_MANU_ADDPRO = "/manufacturer/addproducts"; 
const PATH_MANU_LISTPRODUCTS = "/manufacturer/listproducts";  
const PATH_MANU_VIEWORDERS= "/manufacturer/orders";      
const PATH_MANU_ISSUES = "/manufacturer/issues";
  return (
    <div>
      <Router>
        <Routes>
          <Route 
            path={BASE_PATH}
            element={
              <Home/>
            }
          >
            <Route path={PATH_HOME} element={<Homepage />} />
            <Route index element={<Homepage />} />
            <Route path={PATH_PRODUCTS} element={<ProductsList />} />
            <Route path={PATH_SUBSCRIPTION} element={<Subscription />} />
            <Route path={PATH_OFFERS} element={<Offers />} />
            <Route path={PATH_FOOTER} element={<Footer />} />
            <Route path={PATH_FORGETPASSWORD} element={<Forgetpassword />} />
            <Route path={PATH_RESETPASSWORD} element={<Resetpassword />} />

            <Route path={PATH_LOGIN} element={<Login />} />
            <Route path={PATH_SIGNUP} element={<SignUp />} />
            <Route path={PATH_WELCOME} element={ <Welcome /> }/>
            <Route path={PATH_ABOUTUS} element={ <Aboutus /> }/>
            
          </Route>

         {/* <Route path={PATH_USER} element={<User />}> */}
               <Route path={PATH_USERHEADER} element={<Userheader />}>
             <Route index element={<UserProfile />} />
              <Route path={PATH_USERPROFILE} element={<UserProfile />} />
              <Route path ={PATH_USERORDERS} element ={<UserOrders/>}/>
              <Route path ={PATH_USERBILLS} element ={<UserBills/>}/>
              <Route path ={PATH_USERWISH} element ={<UserWish/>}/>
              <Route path = {PATH_CHANGEPASSWORD} element = {<UserChangePassword/>}/>
          <Route path= {PATH_USER_CHECKOUT} element = {<Checkout/>}/>
          </Route>
          {/* </Route>  */}

          <Route path={PATH_MANU_DASH} element={<ManufactureDashboard />}>
          <Route index element={<ManufactureListProducts />} />
            <Route path={PATH_MANU_ADDPRO} element={<ManufactureAddProducts />} />
            <Route path={PATH_MANU_LISTPRODUCTS} element={<ManufactureListProducts />} />
            <Route path={PATH_MANU_VIEWORDERS} element={<ViewOrders />} />
            <Route path={PATH_MANU_ISSUES} element={<ManufactureIssues />} />
          </Route>

          {/* <Route path={PATH_VEN_HOME} element={<VendorHome />}> */}
          <Route path={PATH_VEN_DASH} element={<VendorDashboard />} >
          <Route path={PATH_VEN_HOME} element={<VendorHome />}/>
          <Route path={PATH_VEN_ADD} element ={<VendorAddProducts />}/>
          <Route path={PATH_VEN_PRO} element ={<VendorProducts />}/>
          
          {/* <Route path={PATH_VEN_LIST_ITEMS} element ={<VendorListItems />}/> */}
          </Route>
          {/* <Route path={PATH_VEN_TABLES} element={<VendorTables />}>
           <Route path={PATH_VEN_HOME} element={<VendorHome />}>
           <Route path={PATH_VEN_DASH} element={<VendorHome />}>
            <Route path={PATH_VEN_LIST} element={<VendorListOrders />} /> */}
          {/* </Route> */}
        </Routes>
      </Router>
    </div>
  );
};

export default MainRoutes;
