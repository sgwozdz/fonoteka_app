import React, {Component} from 'react';
import {Link} from 'react-router';
import {MenuItem, IconMenu, IconButton, FlatButton} from 'material-ui';
import Person from 'material-ui/svg-icons/social/person';
import cookie from 'react-cookie';

export class LoggedMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: cookie.load('username') || ''
        }     
        this.styles = {
            nameLabel: {
                fontSize: '14px',
                fontWeight: '500',
                paddingLeft: '10px',
                paddingRight: '10px',
                letterSpacing: '0px',
                verticalAlign: 'super',
                textTransform: 'uppercase'
            }
        }

        this.handleTap = this.handleTap.bind(this);
    }

    handleTap() {
        cookie.remove('userId');
        cookie.remove('username');
        window.location = '/';  
    }

    render() {
        return (
            <span>
            <span style={this.styles.nameLabel}>{this.state.username}</span>
                <IconMenu
                    iconButtonElement={<IconButton><Person/></IconButton>}
                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}>
                    <MenuItem primaryText="mój profil" containerElement={<Link to={'/profile/details/' + cookie.load('userId')}/>}/>
                    <MenuItem primaryText="wyloguj" onTouchTap={this.handleTap}/>
                </IconMenu>
            </span>
        );
    }
}