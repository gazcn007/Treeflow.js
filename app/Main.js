// Root File for The Tree Flow app
import React from 'react';// Import boilerplates
import ReactDOM from 'react-dom';import createBrowserHistory from 'history/createBrowserHistory';import { Provider } from 'mobx-react';import { BrowserRouter as Router, Route , hashHistory} from 'react-router-dom';import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';import {NavBar} from 'Components';const app = document.getElementById('app');// Import Mobx Stores :
import FormSetStore from './DataPanel/FormSetStore';
import DataPanel from './DataPanel'
const browserHistory = createBrowserHistory();const routingStore = new RouterStore();const history = syncHistoryWithStore(browserHistory, routingStore);
var stores = {routingStore,FormSetStore};
var routes = [{dispLabel: 'DataPanel', route:'/data-panel'},];    ReactDOM.render(    <Provider {...stores}><Router history={browserHistory}><div><NavBar routes={routes}/><Route path='/data-panel' component={DataPanel}/></div></Router></Provider>, app)