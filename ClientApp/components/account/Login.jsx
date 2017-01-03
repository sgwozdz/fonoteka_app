import React, {Component} from 'react';
import {Link} from 'react-router';
import {Card, CardActions, CardTitle, CardText, CardMedia} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import * as $ from 'jquery';
import cookie from 'react-cookie';

export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            logged: false
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
            password: this.state.password
        };

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: 'http://localhost:4000/login',
            success: function (data) {
                cookie.save('userId', data.userId, { path: '/' });
                window.location = '/';
            },
            error: function (data) {
                console.log('err');
            }
        });
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <div className='row'>
                <div className='col-sm-4 col-sm-offset-4 text-center'>
                    <Card>
                        <CardTitle title='Logowanie :)'/>
                        <form onSubmit={this.handleSubmit}>
                            <CardText>
                                <div>
                                    <TextField
                                        name='username'
                                        floatingLabelText='login'
                                        value={this.state.username}
                                        onChange={this.handleChange}/><br/>
                                    <TextField
                                        name='password'
                                        floatingLabelText='hasło'
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                        type="password"/><br/>
                                </div>
                            </CardText>
                            <CardActions>
                                <FlatButton label='Zaloguj' type='submit'/>
                            </CardActions>
                        </form>
                    </Card>
                </div>
            </div>
        );
    }
}