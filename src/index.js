import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router/router'
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios'

axios.defaults.baseURL = 'http://yinhengli.com:8081/';

ReactDOM.render(<Router />, document.getElementById('root'));
registerServiceWorker();
