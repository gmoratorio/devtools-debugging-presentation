import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';

import DevToolsIndex from './components/DevToolsIndex';
import TalkDetail from './components/TalkDetail';


import store from './store';

class App extends Component {

    render() {
        return (
            <Provider store={store} r>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={DevToolsIndex}/>
                        <Route path="/detail" component={TalkDetail}/>
                    </Switch>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
