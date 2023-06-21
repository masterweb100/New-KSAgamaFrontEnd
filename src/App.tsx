import React from 'react';
import './App.css';
import PageRouter from './routes/routes';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment';
import 'moment/locale/id'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

moment.locale('id')
function App() {
  return (
    <div style={{ backgroundColor: '#fff' }}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <PageRouter></PageRouter>
        <ToastContainer
          position={"top-right"}
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick={true}
          pauseOnHover={true}
          draggable={true}
          theme={"light"}
        />
      </LocalizationProvider>
    </div>
  );
}

export default App;
