import React, {Component} from 'react';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import {RaisedButton, TextField} from 'material-ui';
import {post} from '../../script/graphqlHTTP';
import cookie from 'react-cookie';

export class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state={
            user:{
                firstName: '',
                lastName: '',
                description: ''
            },
            userId: cookie.load('userId')
        }
        this.handleTap = this.handleTap.bind(this);
    }

    componentWillMount() {
        var query = '{users (id: ' + JSON.stringify(this.state.userId) + ') {firstName, lastName, description}}';
        var request = new XMLHttpRequest();
        request.open('POST', 'http://localhost:4000/graphql', false);
        request.setRequestHeader("Content-Type", "application/json");
        request.setRequestHeader("Accept", "application/json");
        request._this = this;
        request.onload = function () {
            request._this.setState({user: JSON.parse(request.response).data.users[0]})
        }
        request.send(JSON.stringify({query: query}));
    }

    handleTap(){
        var firstName = this.refs['firstName'].getValue();
        var lastName = this.refs['lastName'].getValue();
        var description = this.refs['description'].getValue();
        var firstNameQuery = ',firstName:' + JSON.stringify(firstName)
        var lastNameQuery = ',lastName:' + JSON.stringify(lastName)
        var descriptionQuery = ',description:' + JSON.stringify(description)

        var query = 'mutation{userEdit(_id:'+JSON.stringify(this.state.userId)+ firstNameQuery + lastNameQuery + descriptionQuery +'){_id, username, firstName, lastName}}'
        var request = post();
        request._this = this;
        request.onload = function () {
            request._this.props.router.push('/profile/details/' + request._this.state.userId);
        }

        request.send(JSON.stringify({query: query}));
    }

    render() {
        return (
            <div className='pure-g'>
                <div className="pure-u-1-4">&nbsp;</div>
                <div className='pure-u-1-2 text-center'>
                    <Card>
                        <CardTitle title='Edytuj profil'/>
                        <CardText>
                            <div>
                                <TextField
                                    name='firstName'
                                    floatingLabelText='imię'
                                    ref={'firstName'}
                                    defaultValue={this.state.user.firstName}/><br/>
                                <TextField
                                    name='lastName'
                                    floatingLabelText='nazwisko'
                                    ref={'lastName'}
                                    defaultValue={this.state.user.lastName}/><br/>
                                <TextField
                                    name='description'
                                    floatingLabelText='opis'
                                    type='text'
                                    multiLine={true}
                                    rows={1}
                                    rowsMax={4}
                                    style={{textAlign:'left', width:'80%'}}
                                    ref={'description'}
                                    defaultValue={this.state.user.description}/><br/>
                            </div>
                        </CardText>
                        <CardActions>
                            <RaisedButton
                                label='Zapisz'
                                primary={true}
                                onTouchTap={this.handleTap}/>
                        </CardActions>
                    </Card>
                </div>
            </div>
        );
    }
}