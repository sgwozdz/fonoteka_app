import './css/site.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { browserHistory, Router } from 'react-router';
import routes from './routes';


//This code starts up the React app. 
//Sets up the routing configuration
//Injects the app into DOM element
ReactDOM.render(
<Router history={browserHistory} children={routes} />,
  document.getElementById('react-app')
);