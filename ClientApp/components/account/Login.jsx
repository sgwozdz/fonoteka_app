import React, {Component} from 'react';
import {Link} from 'react-router';
import {Card, CardActions, CardTitle, CardText, CardMedia} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

export class Login extends Component {
    render() {
        return (
            <div className='row'>
                <div className='col-sm-4 col-sm-offset-4 text-center'>
                    <Card>
                        <CardTitle title='Logowanie :)'/>
                        <CardText>
                            <div>
                                <TextField floatingLabelText='login'/><br/>
                                <TextField floatingLabelText='hasło'/><br/>
                            </div>
                        </CardText>
                        <CardActions>
                            <FlatButton label='Zaloguj' containerElement={< Link to = '/news/5' />}/>
                        </CardActions>
                    </Card>
                </div>
            </div>
        );
    }
}