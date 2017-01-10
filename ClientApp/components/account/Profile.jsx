import React, {Component} from 'react';
import {Link} from 'react-router';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';
import {RaisedButton} from 'material-ui';
import {post} from '../../script/graphqlHTTP';
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
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        var userId = cookie.load("userId");
        
        var query = '{users (id: ' + JSON.stringify(userId) + ') {_id, username, email}}';
        var request = post();
        request._this = this;
        request.onload = function () {
            request._this.setState({user: request.response.data.users[0]})
        }
        request.send(JSON.stringify({query: query}));

        var query2 = '{albums (ratingUserId: ' + JSON.stringify(userId) + ') {_id, title, cover, ratings{user_id, rate}}}';
        var request2 = post();
        request2._this = this;
        request2.onload = function () {
            if (request2.response.data.albums) {
                request2.response.data.albums.forEach(function(element){
                    element.rate = element.ratings.filter((x)=> x.user_id === userId)[0].rate;
                    delete element.ratings;

                    var albums = request2._this.state.ratedAlbums;
                    albums.push(element);

                    request2._this.setState({ratedAlbums: albums})
                })
            }
        }
        request2.send(JSON.stringify({query: query2}));
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <div className='pure-g'>
                <div className='pure-u-1-3'>
                    <Card>
                        <CardTitle title={this.state.user.username}/>
                        <CardText>
                            <div>
                                <div className='pure-u-1-2'>Imię:</div>
                                <div className='pure-u-1-2'>{this.state.user.firstName}</div>
                            </div>
                            <div>
                                <div className='pure-u-1-2'>Nazwisko:</div>
                                <div className='pure-u-1-2'>{this.state.user.lastName}</div>
                            </div>
                            <div>
                                <div className='pure-u-1-2'>Adres email:</div>
                                <div className='pure-u-1-2'>{this.state.user.email}</div>
                            </div>
                            <div>
                                <div className='pure-u-1-2'>Data urodzenia:</div>
                                <div className='pure-u-1-2'>{this.state.user.birthdate}</div>
                            </div>
                        </CardText>
                        <CardActions>
                            <RaisedButton label="Edytuj" primary={true} containerElement={<Link to="/profile/edit"/>}/>
                        </CardActions>
                    </Card>
                </div>
                <div className='pure-u-16-24'>
                    <Card>
                        <CardTitle title="Ostatnio ocenione"/>
                        <CardText>
                            <GridList>
                                 {this.state.ratedAlbums.map((album) => (
                                    <GridTile
                                    key={album._id}
                                    title={album.title}
                                    subtitle={<span>oceniono na <b>{album.rate}</b></span>}>
                                        <img src={album.cover} alt='brak zdjęcia'/>
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