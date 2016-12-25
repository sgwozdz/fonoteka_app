import React, {Component} from 'react';
import {Link} from 'react-router';
import {MenuItem, IconMenu, IconButton} from 'material-ui';
import Person from 'material-ui/svg-icons/social/person';

export class AccountIconMenu extends Component{
    render() {
        return (
            <span>
                <IconMenu
                    iconButtonElement={<IconButton><Person/></IconButton>}
                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}>
                    <MenuItem primaryText="Zaloguj" containerElement={<Link to="/login"/>}/>
                    <MenuItem primaryText="Zarejestruj" containerElement={<Link to="/register"/>}/>
                </IconMenu>
            </span>
        );
    }
}