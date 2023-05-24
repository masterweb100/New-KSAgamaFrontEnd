import React from 'react';
import './App.css';
import PageRouter from './routes/routes';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment';
import 'moment/locale/id'

moment.locale('id')
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
