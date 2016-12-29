import React, {Component} from 'react';
import {Link} from 'react-router';
import {Card, CardActions, CardTitle, CardText, CardMedia} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import * as $ from 'jquery';

export class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            passwordAgain: '',
            email: ''
        };

        this.handleChange = this
            .handleChange
            .bind(this);
        this.handleSubmit = this
            .handleSubmit
            .bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        var data = {
            username: this.state.username,    
            password: this.state.password,    
            passwordAgain: this.state.passwordAgain,    
            email: this.state.email  
        };

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: 'http://localhost:4000/register',
            success: function (data) {
                console.log('success');
            }
        });
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return (
            <div className='row'>
                <div className='col-sm-4 col-sm-offset-4 text-center'>
                    <Card>
                        <CardTitle title='Zakładanie konta :)'/>
                        <form id='register-form' onSubmit={this.handleSubmit}>
                            <CardText>
                                <div>
                                    <TextField
                                        name='username'
                                        floatingLabelText='login'
                                        value={this.state.username}
                                        onChange={this.handleChange}/><br/>
                                    <TextField
                                        name='email'
                                        floatingLabelText='e-mail'
                                        value={this.state.email}
                                        onChange={this.handleChange}/><br/>
                                    <TextField
                                        name='password'
                                        floatingLabelText='hasło'
                                        value={this.state.password}
                                        onChange={this.handleChange}/><br/>
                                    <TextField
                                        name='passwordAgain'
                                        floatingLabelText='powtórz hasło'
                                        value={this.state.passwordAgain}
                                        onChange={this.handleChange}/><br/>
                                </div>
                            </CardText>
                            <CardActions>
                                <FlatButton label='Zakładam konto' type='submit'/>
                            </CardActions>
                        </form>
                    </Card>
                </div>
            </div>
        );
    }
}