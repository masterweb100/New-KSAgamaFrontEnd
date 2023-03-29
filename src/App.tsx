import React from 'react';
import logo from './logo.svg';
import './App.css';
import PageRouter from './routes/routes';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

function App() {
  return (
    <div style={{ backgroundColor: '#fff' }}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <PageRouter></PageRouter>
      </LocalizationProvider>
    </div>
  );
}

export default App;
