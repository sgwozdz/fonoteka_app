import React, {Component} from 'react';
import {Link} from 'react-router';
import {RaisedButton, TextField, AutoComplete, MenuItem, Dialog } from 'material-ui';
import { white, cyan800
} from 'material-ui/styles/colors';
import cookie from 'react-cookie';
import {post} from '../../script/graphqlHTTP';

import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import {Card} from 'material-ui/Card';
import {FriendElement} from './FriendElement';
import Done from 'material-ui/svg-icons/action/done';
import PersonAdd from 'material-ui/svg-icons/social/person-add';

export class Friends extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userSearchValue: '',
            friendSearchValue: '',
            friends: [],
            friendRequests: [],
            users: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.filterUsers = this.filterUsers.bind(this);
        this.handleTap = this.handleTap.bind(this);
        this.checkIfCanRequest = this.checkIfCanRequest.bind(this);
    }

    componentDidMount() {
        this.getFriends();
        this.getUsers();
        this.getRequests();
    }

    getFriends(){
        var userId = cookie.load('userId');
        if (userId) {
            var query = '{users(id:'+ JSON.stringify(userId) +'){friends {_id, username}}}';
            var request = post();
            request._this = this;
            request.onload = function () {
                request._this.setState({friends: request.response.data.users[0].friends})
            }
            request.send(JSON.stringify({query: query}));
        }
    }

    getUsers(){
        var query = '{users{_id, username}}';
        var request = post();
        request._this = this;
        request.onload = function () {
            var users = request.response.data.users;
            var userId = cookie.load('userId');

            if (users && userId) {
                request._this.setState({users: users.filter(x=> x._id != userId)});
            }
        }
        request.send(JSON.stringify({query: query}));
    }

    getRequests(){
        var userId = cookie.load('userId');
        if (userId) {
            var query = '{friendRequests (from:'+ JSON.stringify(userId) +') {_id, from, to, status}}'
            var request = post();
            request._this = this;
            request.onload = function () {
                request._this.setState({friendRequests: request.response.data.friendRequests})
            }
            request.send(JSON.stringify({query: query}));
        }
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }

    filterUsers(type, value){
        var searchValue = '';

        if (type === 'users') 
            searchValue = this.state.userSearchValue;       
        if (type === 'friends') 
            searchValue = this.state.friendSearchValue;
        
        var regexp = new RegExp('.*' +searchValue + '.*', 'i');

        return regexp.test(value.username);
    }

    handleTap(toId, event){
        var userId = cookie.load('userId');

        if (userId && this.checkIfCanRequest(toId)) {
            var query = 'mutation{friendRequestAdd(from:'+JSON.stringify(userId)+', to:'+JSON.stringify(toId)+'){_id, from, to, status}}'
            var request = post();
            request._this = this;
            request.onload = function () {
                var result =  request._this.state.friendRequests;
                result.push(request.response.data.friendRequestAdd);
                request._this.setState({friendRequests: result})
            }
            request.send(JSON.stringify({query: query}));
        }
    }
    checkIfCanRequest(toId){
        var friendRequest = this.state.friendRequests.find(x=> x.to === toId);
        var friendNow = this.state.friends.find(x=> x._id == toId);
        
        if (friendRequest || friendNow) {
            return false;
        }

        return true;
    }
    render() {
        const inputColor = {
            color: 'blue'
        };
        const colorCyan800 = {
            color: cyan800
        };
        const padding = {
            paddingTop: 10
        };
        const marginTop = {
            marginTop: 30,
            float: 'right'
        };
        const borderBox ={
            borderTop: '1px solid rgb(217, 217, 217)',
            borderRight: '1px solid rgb(217, 217, 217)',
            borderBottom: '1px solid rgb(217, 217, 217)',
            borderLeft: '1px solid rgb(217, 217, 217)'
        }
        return <div>          
            <div className='pure-g'>
                <div className='pure-u-2-3'>
                    <div className='pure-u-1'>
                        <TextField floatingLabelText='Wyszukiwanie...'
                            name='friendSearchValue'
                            floatingLabelStyle={colorCyan800} 
                            inputStyle={inputColor} 
                            underlineStyle={colorCyan800}
                            fullWidth={true} 
                            onChange={this.handleChange}/>
                    </div>
                </div>
            </div>
            <div className='pure-g'>
                <div className='pure-u-sm-2-3' >
                    {this.state.friends.filter(this.filterUsers.bind(this, 'friends')).map((friend, cIndex) =>
                        <div key={cIndex} className='pure-u-lg-1-4'>
                            <div className='pure-u-lg-5-6'>
                                    <FriendElement username={friend.username}/>
                            </div> 
                            <div className='pure-u-lg-1-6'></div>
                        </div>)}
                </div>
                <div className='pure-u-1-12'>&nbsp;</div>
                <div className='pure-u-1-4'>
                    <div className='pure-u-1'>
                        <TextField floatingLabelText='Wyszukiwanie...'
                            name='userSearchValue'
                            floatingLabelStyle={colorCyan800} 
                            inputStyle={inputColor} 
                            underlineStyle={colorCyan800}
                            fullWidth={true} 
                            onChange={this.handleChange}/>
                    </div>
                    <div className='pure-u-1'>
                        <Card>
                            <List>
                                <Subheader>Chcesz dodać znajomych?</Subheader>
                                <Divider/>
                                {this.state.users.filter(this.filterUsers.bind(this, 'users')).map((user, cIndex) => 
                                    <ListItem key={cIndex}
                                        primaryText={user.username}
                                        onTouchTap={this.handleTap.bind(this, user._id)}
                                        rightIcon={this.checkIfCanRequest(user._id) ? <PersonAdd color={white}/> : <Done color={white}/>}
                                        leftAvatar={<Avatar src={require('../../images/default-user-image.jpg')}/>}
                                    />
                                )}
                            </List>
                        </Card>
                    </div>
                </div>
            </div>
        </div>;
    }
}