import './css/site.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hashHistory, browserHistory, Router } from 'react-router';
import routes from './routes';


//This code starts up the React app. 
//Sets up the routing configuration
//Injects the app into DOM element
//browserHistory for PROD
ReactDOM.render(
<Router history={hashHistory} children={routes} />,
  document.getElementById('react-app')
);