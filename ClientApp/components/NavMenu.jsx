import React, {Component} from 'react';
import {Link} from 'react-router';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

const Styles = () => getMuiTheme();

class AppBarIconMenu extends Component {
    render() {
        return (
            <IconMenu iconButtonElement={< IconButton > <MoreVertIcon/> </IconButton>}
                anchorOrigin={{horizontal: 'right',vertical: 'top'}}
                targetOrigin={{horizontal: 'right',vertical: 'top'}}>
                <MenuItem primaryText="Pomóż nam się rozwijać"/>
                <MenuItem primaryText="Ustawienia"/>
                <MenuItem primaryText="Pomoc"/>
                <MenuItem primaryText="Wyloguj"/>
            </IconMenu>
        );
    }
}

class Menu extends Component {
    render() {
        return (
            <div>
                <Link to={'/baza'} activeClassName='active'>
                    <FlatButton label='Baza'/>
                </Link>
                <Link to={'/znajomi'} activeClassName='active'>
                    <FlatButton label='Znajomi'/>
                </Link>
                <Link to={'/ranking'} activeClassName='active'>
                    <FlatButton label='Ranking'/>
                </Link>
                <AppBarIconMenu/>
            </div>
        );
    }
}

export class NavMenu extends Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={Styles()}>
                <AppBar title={<span> Fonoteka </span>}
                titleStyle={{color:'#F44336', fontSize:30}}
                iconElementLeft={<span></span>} 
                iconElementRight={<Menu/>}/>
            </MuiThemeProvider>
        );
    }
}