import React, {Component} from 'react';
import {AppBar} from 'material-ui';
import {RightMenu} from './RightMenu';
import {LeftDrawer} from './LeftDrawer';
import {white, grey900} from 'material-ui/styles/colors';

export class NavAppBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
        this.styles = {
            titleStyle: {
                fontSize: 30,
                color: white
            }
        }

        this.handleToggle = this.handleToggle.bind(this);
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
                    id='appbar'
                    title={<span> Fonoteka </span>}
                    titleStyle={this.styles.titleStyle}
                    style={{backgroundColor: grey900}}
                    onLeftIconButtonTouchTap={this.handleToggle}
                    iconElementRight={< RightMenu logged = {
                    this.props.logged
                } />}/>
                <LeftDrawer
                    logged={this.props.logged}
                    open={this.state.open}
                    onChange={this.handleToggle}/>
            </div>
        );
    }
}