import React, {Component} from 'react';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import {RaisedButton, TextField, Dialog} from 'material-ui';
import cookie from 'react-cookie';

export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            open: false
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

        var request = new XMLHttpRequest();
        request.responseType = 'json';
        request.open('POST', 'http://localhost:4000/login');
        request.setRequestHeader("Content-Type", "application/json");
        request.setRequestHeader("Accept", "application/json");
        request._this = this;
        request.onload = function() {
            switch (request.response.status) {
                    case 100:
                        cookie.save('userId', request.response.userId, { path: '/' });
                        cookie.save('username', request.response.username, { path: '/' });
                        window.location = '/';
                        break;
                    case 200:
                         request._this.setState({
                            open: true
                        })
                        break;
                }
        };

        request.send(JSON.stringify(data));;
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
            <RaisedButton
                label="Ok"
                primary={true}
                onTouchTap={this.handleClose}/>
        ];
        return (
            <div className='pure-g'>
                <div className="pure-u-1-3">&nbsp;</div>
                <div className='pure-u-1-3 text-center'>
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
                                <RaisedButton label='Zaloguj' type='submit' primary={true}/>
                            </CardActions>
                        </form>
                    </Card>
                </div>
            </div>
        );
    }
}