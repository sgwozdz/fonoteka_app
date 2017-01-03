import React, {Component} from 'react';
import {Link} from 'react-router';
import {Card, CardActions, CardTitle, CardText, CardMedia} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import * as $ from 'jquery';
import cookie from 'react-cookie';

export class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            buttonDisabled: true,
            data: {
                username: '',
                password: '',
                passwordAgain: '',
                email: ''
            },
            errors: {
                username: '',
                password: '',
                passwordAgain: '',
                email: ''
            }
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
            username: this.state.data.username,
            password: this.state.data.password,
            passwordAgain: this.state.data.passwordAgain,
            email: this.state.data.email
        };

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: 'http://localhost:4000/register',
            success: function (data) {
                cookie.save('userId', data.userId, { path: '/' });
                window.location = '/';
            },
            error: function (data) {
                console.log(data);
            }
        });
    }

    handleChange(event) {
        var errorMessage = '';
        var errors = this.state.errors;
        var data = this.state.data;

        if (event.target.name === 'username') {
            if (event.target.value.length < 3) {
                errorMessage = 'minimum 3 znaki';
            }
        } else if (event.target.name === 'email') {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (!re.test(event.target.value)) {
                errorMessage = 'to nie jest poprawny email';
            }
        } else if (event.target.name === 'password') {
            if (event.target.value.length < 6) {
                errorMessage = 'minimum 6 znaków';
            }
        } else if (event.target.name === 'passwordAgain') {
            if (event.target.value != this.state.data.password) {
                errorMessage = 'hasła nie są takie same';
            }
        }

        data[event.target.name] = event.target.value;
        errors[event.target.name] = errorMessage;

        this.setState({data: data, errors: errors})

        var disabled = false;
        if (this.state.data.username == '' || this.state.data.password == '' || this.state.data.passwordAgain == '' || this.state.data.email == '') {
            disabled = true;
        }
        for (var error in errors) 
            if (errors[error] != '') {
                disabled = true;
            }
        
        this.setState({buttonDisabled: disabled})
    }

    render() {
        return (
            <div className='row'>
                <div className='col-sm-4 col-sm-offset-4 text-center'>
                    <Card>
                        <CardTitle title='Zakładanie konta :)'/>
                        <form onSubmit={this.handleSubmit}>
                            <CardText>
                                <div>
                                    <TextField
                                        name='username'
                                        floatingLabelText='login'
                                        value={this.state.data.username}
                                        onChange={this.handleChange}
                                        errorText={this.state.errors.username}/><br/>
                                    <TextField
                                        name='email'
                                        floatingLabelText='e-mail'
                                        value={this.state.data.email}
                                        onChange={this.handleChange}
                                        errorText={this.state.errors.email}/><br/>
                                    <TextField
                                        name='password'
                                        floatingLabelText='hasło'
                                        value={this.state.data.password}
                                        onChange={this.handleChange}
                                        errorText={this.state.errors.password}
                                        type="password"/><br/>
                                    <TextField
                                        name='passwordAgain'
                                        floatingLabelText='powtórz hasło'
                                        value={this.state.data.passwordAgain}
                                        onChange={this.handleChange}
                                        errorText={this.state.errors.passwordAgain}
                                        type="password"/><br/>
                                </div>
                            </CardText>
                            <CardActions>
                                <FlatButton
                                    label='Zakładam konto'
                                    type='submit'
                                    disabled={this.state.buttonDisabled}/>
                            </CardActions>
                        </form>
                    </Card>
                </div>
            </div>
        );
    }
}