import React, {Component} from 'react';
import {IconMenu, MenuItem, IconButton} from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

export class MoreIconMenu extends Component {
    render() {
        return (
            <span>
                <IconMenu
                    iconButtonElement={<IconButton> <MoreVertIcon/> </IconButton>}
                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}>
                    <MenuItem primaryText="pomóż nam się rozwijać"/>
                    <MenuItem primaryText="pomoc"/>
                </IconMenu>
            </span>
        )
    }
}