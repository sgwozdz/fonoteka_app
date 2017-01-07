import React, {Component} from 'react';
import {Link} from 'react-router';
import {Card, CardActions, CardTitle, CardText, CardMedia} from 'material-ui/Card';
import {FlatButton, TextField, Dialog} from 'material-ui';
import * as $ from 'jquery';
import cookie from 'react-cookie';

export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            open: false,
            logged: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        var data = {
            username: this.state.username,
            password: this.state.password
        };
        var _this = this;
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: 'http://localhost:4000/login',
            success: function (data) {
                switch (data.status) {
                    case 100:
                        cookie.save('userId', data.userId, { path: '/' });
                        cookie.save('username', data.username, { path: '/' });
                        window.location = '/';
                        break;
                    case 200:
                        _this.setState({
                            open: true
                        })
                        break;
                }
            }
        });
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleClose(){
        this.setState({open: !this.state.open});
    };

    render() {
        const actions = [
            <FlatButton
                label="Ok"
                onTouchTap={this.handleClose}/>
        ];
        
        return (
            <div className='row'>
                <div className='col-sm-4 col-sm-offset-4 text-center'>
                    <Dialog
                        title='Błąd logowania'
                        actions={actions}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleClose}>
                        Podane błędne dane logowania. Spróbuj ponownie.
                    </Dialog>
                    <Card>
                        <CardTitle title='Logowanie :)'/>
                        <form onSubmit={this.handleSubmit}>
                            <CardText>
                                <div>
                                    <TextField
                                        name='username'
                                        floatingLabelText='login'
                                        errorText=''
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