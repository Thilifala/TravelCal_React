import React from 'react';
import ReactDom from 'react-dom';
import { AnimatedSwitch } from 'react-router-transition';
import { HashRouter as Router,BrowserRouter,Switch,Route,IndexRoute,Redirect} from 'react-router-dom';

import {createStore} from 'redux';
import {popupWinControl} from './reducer/reducer';

import App from './components/app.jsx';
import PersonCopn from './components/personManager.jsx';
import ConsumCopn from './components/consumManager.jsx';

//redux test
let store = createStore(popupWinControl,{showPopupWin:false});
store.subscribe(() => {
    console.log(store.getState())
})
window.store = store;
//控制台可以通过以下代码修改store：window.store.dispatch({type:"SHOW_MODAL_PER",showPopupWin:true})

class AppRouter extends React.Component {
    render() {
        return (
            <App>
                <Router>
                    <AnimatedSwitch
                        atEnter={{ opacity: 0 }}
                        atLeave={{ opacity: 0 }}
                        atActive={{ opacity: 1 }}
                        className="fade-router"
                    >
                        <Route exact path="/" render={() => (
                            <Redirect to="/person" />
                        )} />
                        <Route path="/person" component={PersonCopn} />
                        <Route path="/consum" component={ConsumCopn} />
                    </AnimatedSwitch>
                </Router>
            </App>
        )
    }
}

ReactDom.render((
    <AppRouter/>
), document.getElementById('container'));
