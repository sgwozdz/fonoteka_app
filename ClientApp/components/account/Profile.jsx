import React, {Component} from 'react';
import {Link} from 'react-router';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';
import {FlatButton, TextField} from 'material-ui';
import * as $ from 'jquery';
import cookie from 'react-cookie';

export class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                _id: '',
                username: '',
                firstName: '',
                lastName: '',
                email: '',
                birthdate: ''
            },
            ratedAlbums:[]
        };

        this.handleChange = this
            .handleChange
            .bind(this);
    }

    componentDidMount() {
        var userId = cookie.load("userId");

        $.post("http://localhost:4000/graphql", {
            query: "{users (id: " + JSON.stringify(userId) + ") {_id, username, email}}"
        }, function (response) {
            this.setState({user: response.data.users[0]})
        }.bind(this), "json");

        $.post("http://localhost:4000/graphql", {
            query: "{albums (ratingUserId: " + JSON.stringify(userId) + ") {_id, title, artists{name}, released, ratings{user_id, rate}}}"
        }, function (response) {
            response.data.albums.forEach(function(element) {
                element.rate = element.ratings.filter((x)=> x.user_id === userId)[0].rate;
                delete element.ratings;

                var albums = this.state.ratedAlbums;
                albums.push(element);

                this.setState({ratedAlbums: albums})
            }, this);
        }.bind(this), "json");
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <div className='row'>
                <div className='col-sm-4'>
                    <Card>
                        <CardTitle title={this.state.user.username}/>
                        <CardText>
                            <div className='row'>
                                <div className='col-sm-6'>Imię:</div>
                                <div className='col-sm-6'>{this.state.user.firstName}</div>
                            </div>
                            <div className='row'>
                                <div className='col-sm-6'>Nazwisko:</div>
                                <div className='col-sm-6'>{this.state.user.lastName}</div>
                            </div>
                            <div className='row'>
                                <div className='col-sm-6'>Adres email:</div>
                                <div className='col-sm-6'>{this.state.user.email}</div>
                            </div>
                            <div className='row'>
                                <div className='col-sm-6'>Data urodzenia:</div>
                                <div className='col-sm-6'>{this.state.user.birthdate}</div>
                            </div>
                        </CardText>
                        <CardActions>
                            <FlatButton label="Edytuj" containerElement={<Link to="/profile/edit"/>}/>
                        </CardActions>
                    </Card>
                </div>
                <div className='col-sm-8'>
                    <Card>
                        <CardTitle title="Ostatnio ocenione"/>
                        <CardText>
                            <GridList>
                                 {this.state.ratedAlbums.map((album) => (
                                    <GridTile
                                    key={album._id}
                                    title={album.title}
                                    subtitle={<span>oceniono na <b>{album.rate}</b></span>}>
                                    </GridTile>
                                 ))}
                            </GridList>
                        </CardText>
                    </Card>
                </div>
            </div>
        );
    }
}