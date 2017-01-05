import React, {Component} from 'react';
import {Link} from 'react-router';
import {MenuItem, IconMenu, IconButton} from 'material-ui';
import Person from 'material-ui/svg-icons/social/person';
import cookie from 'react-cookie';
import FlatButton from 'material-ui/FlatButton';
export class LoggedMenu extends Component{
    constructor(props) {
        super(props);

        this.handleTap = this
            .handleTap
            .bind(this);
    }

    handleTap() {
        cookie.remove('userId');
        window.location = '/';  
    }

    render() {
        return (
            <span>
                <IconMenu
                    iconButtonElement={<IconButton><Person/></IconButton>}
                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}>
                    <MenuItem primaryText="mój profil" containerElement={<Link to="/profile"/>}/>
                    <MenuItem primaryText="wyloguj" onTouchTap={this.handleTap}/>
                </IconMenu>
            </span>
        );
    }
}