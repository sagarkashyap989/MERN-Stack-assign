import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './store/store';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


import App1 from './App1'; 
import CategorySelector from './CategorySelector';
import TableComponent from './TableComponent';


const RootComponent = () => {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      
<TableComponent setModalShow = {setModalShow}/>
      <CategorySelector
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RootComponent />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
