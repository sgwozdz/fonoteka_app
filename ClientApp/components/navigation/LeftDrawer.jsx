import React, {Component} from 'react';
import {Link} from 'react-router';
import {Drawer,MenuItem, Divider} from 'material-ui';

export class LeftDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: this.props.open
        };

        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle() {
        this.setState({
            open: !this.state.open
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
                <MenuItem containerElement={<Link to="/friends"/>} onTouchTap={this.handleToggle}>Znajomi</MenuItem>
              { /* <MenuItem containerElement={<Link to="/messages"/>} onTouchTap={this.handleToggle}>Wiadomości</MenuItem> 
                <Divider />
                <MenuItem containerElement={<Link to="/settings"/>} onTouchTap={this.handleToggle}>Ustawienia</MenuItem> */}
            </div>
        );
    }

    render() {
        return (
            <Drawer open={this.state.open} docked={false} onRequestChange={this.handleToggle}>
                <div>
                    <MenuItem containerElement={<Link to="/"/>} onTouchTap={this.handleToggle}>Aktualności</MenuItem>
                    <MenuItem containerElement={<Link to="/base"/>} onTouchTap={this.handleToggle}>Baza</MenuItem>
                    <MenuItem containerElement={<Link to="/ranking"/>} onTouchTap={this.handleToggle}>Ranking</MenuItem>
                { /*     <MenuItem containerElement={<Link to="/events"/>} onTouchTap={this.handleToggle}>Wydarzenia</MenuItem> */}
                </div>
                {this.props.logged ? this.renderLoggedMenu() : ''}
            </Drawer>
        );
    }
}