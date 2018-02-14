// var React = require('react');
// var ReactDom = require('react-dom');
import React from 'react';
import ReactDom from 'react-dom';
import { HashRouter,BrowserRouter,Switch,Route,IndexRoute} from 'react-router-dom';

import App from './components/app.jsx';
import PersonCopn from './components/personManager.jsx';
import ConsumCopn from './components/consumManager.jsx';
import '../css/app.less';

class AppRouter extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <IndexRoute component={PersonCopn}/>
                {/* <Route exact path={'/'} component={App}>
                </Route> */}
                <Switch>
                    <Route path="/person" component={PersonCopn} />
                    <Route path="/consum" component={ConsumCopn} />
                </Switch>
            </BrowserRouter>
        )
    }
}

ReactDom.render((
    <AppRouter/>
), document.getElementById('container'));

// ReactDom.render((
//     <App className="appstyle">
//          <PersonCopn /> 
//     </App>
// ), document.getElementById('container'));