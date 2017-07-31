// var React = require('react');
// var ReactDom = require('react-dom');
import React from 'react';
import ReactDom from 'react-dom';

import App from './components/app.js';
import PersonCopn from './components/personManager.js';

ReactDom.render((
    <App className="appstyle">
         <PersonCopn /> 
    </App>
), document.getElementById('container'));