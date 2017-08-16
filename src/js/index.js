// var React = require('react');
// var ReactDom = require('react-dom');
import React from 'react';
import ReactDom from 'react-dom';

import App from './components/app.js';
import PersonCopn from './components/personManager.js';
import ConsumCopn from './components/consumManager.js';
import '../css/app.less';

ReactDom.render((
    <App className="appstyle">
         <ConsumCopn /> 
    </App>
), document.getElementById('container'));