import React, {Component} from 'react';
import {Link} from 'react-router';
import {Card, CardActions, CardTitle, CardText, CardMedia} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import * as $ from 'jquery';

export class Register extends Component {
    constructor(props) {
        super(props);

        this.registerUser = this
            .registerUser
            .bind(this);
    }

    registerUser() {
        $.post("http://localhost:4000", {
                query: "{rankedAlbums (limit:10) {_id, title, averageRate}}"
            }, function (response) {
                this.setState({albums: response.data.rankedAlbums})
            }.bind(this), "json");
    }

    render() {
        return (
            <div className='row'>
                <div className='col-sm-4 col-sm-offset-4 text-center'>
                    <Card>
                        <CardTitle title='Zakładanie konta :)'/>
                        <CardText>
                            <div>
                                <TextField floatingLabelText='login'/><br/>
                                <TextField floatingLabelText='e-mail'/><br/>
                                <TextField floatingLabelText='hasło'/><br/>
                                <TextField floatingLabelText='powtórz hasło'/><br/>
                            </div>
                        </CardText>
                        <CardActions>
                            <FlatButton label='Zakładam konto' containerElement={< Link to = '/news/5' />}/>
                        </CardActions>
                    </Card>
                </div>
            </div>
        );
    }
}