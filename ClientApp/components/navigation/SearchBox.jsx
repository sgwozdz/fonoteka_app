import React, {Component} from 'react';
import {Link} from 'react-router';
import {IconButton, TextField} from 'material-ui';
import Search from 'material-ui/svg-icons/action/search';

export class SearchBox extends Component{
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle() {
        this.setState({
            open: !this.state.open
        });
    }

    render() {
        return (
            <span>
                {this.state.open 
                ? <TextField hintText='Wyszukiwanie...' onBlur={this.handleToggle} autoFocus/>
                : <IconButton onClick={this.handleToggle}><Search/></IconButton>
            }
            </span>
        );
    }    
}