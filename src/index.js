import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './components/app';
import './styles.css'

import { AppMui } from './components/app-mui';
// import { AntApp } from './components/app-ant';

const root = ReactDOM.createRoot(document.getElementById('root'));

// подключение AntApp
// root.render(<AntApp />);


// подключение AppMui
root.render(<AppMui />);


// root.render(<App />);






