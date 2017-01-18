import React, {Component} from 'react';
import {Link} from 'react-router';
import {Drawer,MenuItem, Divider} from 'material-ui';

export class LeftDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: this.props.open
        };

        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.setState({
            open: false
        });
        this.props.onChange();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            open: nextProps.open
        })
    }

    renderLoggedMenu() {
        return(
            <div> 
                <Divider />
                <MenuItem containerElement={<Link to="/friends"/>} onTouchTap={this.handleClose}>Znajomi</MenuItem>
              { /* <MenuItem containerElement={<Link to="/messages"/>} onTouchTap={this.handleClose}>Wiadomości</MenuItem> 
                <Divider />
                <MenuItem containerElement={<Link to="/settings"/>} onTouchTap={this.handleClose}>Ustawienia</MenuItem> */}
            </div>
        );
    }

    render() {
        return (
            <Drawer open={this.state.open} docked={false} onRequestChange={(open) => this.setState({open})}>
                <div>
                    <MenuItem containerElement={<Link to="/"/>} onTouchTap={this.handleClose}>Aktualności</MenuItem>
                    <MenuItem containerElement={<Link to="/base"/>} onTouchTap={this.handleClose}>Baza</MenuItem>
                { /*    <MenuItem containerElement={<Link to="/ranking"/>} onTouchTap={this.handleClose}>Ranking</MenuItem>
                    <MenuItem containerElement={<Link to="/events"/>} onTouchTap={this.handleClose}>Wydarzenia</MenuItem> */}
                </div>
                {this.props.logged ? this.renderLoggedMenu() : ''}
            </Drawer>
        );
    }
}