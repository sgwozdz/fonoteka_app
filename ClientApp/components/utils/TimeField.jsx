import React, {Component} from 'react';
import {TextField} from 'material-ui';

export class TimeField extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.name || '',
            value: this.props.value || '',
            errorText: this.props.errorText || '',
            floatingLabelText: this.props.floatingLabelText || ''
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        const re = /^$|^([0-2]?\d?\d?):([0-5]\d)$/;
        var errorMessage = '';
       
        if (!re.test(event.target.value)) {
            errorMessage = 'poprawny format to mmm:ss (46:56, 112:45)';
        }

        this.props.onChange(event);
        this.props.onChange({target:{name: 'timeFieldError', value: errorMessage}});
        
        this.setState({
                value: event.target.value,
                errorText: errorMessage
        })
    }

    render() {
        var {name, value, errorText, floatingLabelText} = this.state; 

        return (
            <TextField
                name={name}
                floatingLabelText={floatingLabelText}
                errorText={errorText}
                value={value}
                onChange={this.handleChange}/>
        );
    }
}