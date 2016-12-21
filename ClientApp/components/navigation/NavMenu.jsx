import React, {Component} from 'react';
import {Link} from 'react-router';
import {AppBar, Drawer, IconMenu, MenuItem, 
    Divider, FlatButton, IconButton, TextField} from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Search from 'material-ui/svg-icons/action/search';
var injectTapEventPlugin = require("react-tap-event-plugin");

injectTapEventPlugin();

class AppBarIconMenu extends Component {
    render() {
        return (
            <IconMenu
                iconButtonElement={<IconButton> <MoreVertIcon/> </IconButton>}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}>
                <MenuItem primaryText="Pomóż nam się rozwijać"/>
                <MenuItem primaryText="Pomoc"/>
            </IconMenu>
        );
    }
}

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSearchVisible: false,
            labelStyle: {
                fontSize: 20
            },
            hoverColor: '#E91E63'
        }
        this.handleToggle = this.handleToggle.bind(this)
    }

    handleToggle() {
        this.setState({
            isSearchVisible: !this.state.isSearchVisible
        });
    }

    render() {
        return (
            <div>
            {this.state.isSearchVisible 
                ? <TextField hintText='Search textbox' onBlur={this.handleToggle} autoFocus/>
                : <IconButton onClick={this.handleToggle}><Search/></IconButton>
            }
                <Link to={'/login'}>
                    <FlatButton
                        label='Zaloguj'
                        labelStyle={this.state.labelStyle}
                        hoverColor={this.state.hoverColor}/>
                </Link>
                <Link to={'/register'}>
                    <FlatButton
                        label='Zarejestruj'
                        labelStyle={this.state.labelStyle}
                        hoverColor={this.state.hoverColor}/>
                </Link>
                <AppBarIconMenu/>
            </div>
        );
    }
}

export class NavMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };

        this.handleToggle = this.handleToggle.bind(this)
    }

    handleToggle() {
        this.setState({
            open: !this.state.open
        });
    }

    render() {
        return (
            <div>
            <AppBar
                title={<span> Fonotekaa </span>}
                titleStyle={{
                color: '#F44336',
                fontSize: 30
            }}
            onLeftIconButtonTouchTap={this.handleToggle}
                iconElementRight={< Menu />}/>
                  <Drawer open={this.state.open} docked={true}>
                    <MenuItem containerElement={<Link to="/" />}>Aktualności</MenuItem>
                    <MenuItem containerElement={<Link to="/base" />}>Baza</MenuItem>
                    <MenuItem containerElement={<Link to="/ranking" />}>Ranking</MenuItem>
                    <Divider />
                    <MenuItem containerElement={<Link to="/friends" />}>Znajomi</MenuItem>
                    <MenuItem containerElement={<Link to="/messages" />}>Wiadomości</MenuItem>
                    <MenuItem containerElement={<Link to="/events" />}>Wydarzenia</MenuItem>
                    <Divider />
                    <MenuItem containerElement={<Link to="/settings" />}>Ustawienia</MenuItem>
                    <MenuItem>Wyloguj</MenuItem>
                </Drawer>
            </div>
        );
    }
}