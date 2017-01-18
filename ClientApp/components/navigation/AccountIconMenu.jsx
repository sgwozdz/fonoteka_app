import React, {Component} from 'react';
import {Link} from 'react-router';
import {MenuItem, IconMenu, IconButton} from 'material-ui';
import Person from 'material-ui/svg-icons/social/person';

export class AccountIconMenu extends Component {
    render() {
        var position = {
            horizontal: 'right', 
            vertical: 'top'
        }
        return (
            <span>
                <IconMenu
                    iconButtonElement={<IconButton><Person/></IconButton>}
                    anchorOrigin={position}
                    targetOrigin={position}>
                    <MenuItem primaryText="zaloguj" containerElement={<Link to="/login"/>}/>
                    <MenuItem primaryText="załóż konto" containerElement={<Link to="/register"/>}/>
                </IconMenu>
            </span>
        );
    }
}