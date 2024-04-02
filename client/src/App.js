
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import MainRoutes from './routes/MainRoutes.js';
Modal.setAppElement('#root');
const App = () => {
  return (
    <div>
      <MainRoutes />
      <ToastContainer />
    </div>
  );
}

export default App;
