import React, {Component} from 'react';
import { MoreIconMenu } from './MoreIconMenu';
import { AccountIconMenu } from './AccountIconMenu';
import { LoggedMenu } from './LoggedMenu';
import { SearchBox } from './SearchBox';
import {IconButton, IconMenu, MenuItem, Badge} from 'material-ui';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import cookie from 'react-cookie';
import {post} from '../../script/graphqlHTTP';

export class RightMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            friendRequests: [],
            users: []
        }

        this.handleTap = this.handleTap.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.logged) {
            if (!this.state.friendRequests.length) {
                this.getRequests();
            }                
        }
    }

    componentDidMount() {
        this.getUsers();
        this.getRequests();
    }

    getRequests() {
        var userId = cookie.load('userId');
        if (userId) {
            var query = '{friendRequests(to:'+JSON.stringify(userId)+', status:"Created"){_id, from, to, status}}';
            var request = post();
            request._this = this;
            request.onload = function () {
                request._this.setState({friendRequests: request.response.data.friendRequests});
            }

            request.send(JSON.stringify({query: query}));
        }
    }

    getUsers() {
        var query = '{users{_id, username}}';
        var request = post();
        request._this = this;
        request.onload = function () {
            request._this.setState({users: request.response.data.users});
        }

        request.send(JSON.stringify({query: query}));
    }

    handleTap(id, status, event) {
        var query = 'mutation{friendRequestUpdate(requestId:'+ JSON.stringify(id) +', status:'+ JSON.stringify(status) +'){_id, from, to, status}}';
        var request = post();
        request._this = this;
        request.onload = function () {
            var requests = request._this.state.friendRequests.filter(x=> x._id !== request.response.data.friendRequestUpdate._id);
            request._this.setState({friendRequests: requests});
        }

        request.send(JSON.stringify({query: query}));
    }

    renderBadge() {
        return(
            <Badge
                badgeContent={this.state.friendRequests.length}
                primary={true}
                style={{padding:'0px'}}>
                <IconMenu
                    iconButtonElement={<IconButton><NotificationsIcon /></IconButton>}
                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}>
                    {this.state.friendRequests.map((request, cIndex) =>
                        <MenuItem
                            key={cIndex}
                            style={{fontSize:'12px'}}
                            primaryText={this.state.users.find(x=> x._id === request.from).username + ' zaprasza Cię do znajomych'}
                            leftIcon={<ArrowDropDown />}
                            menuItems={[
                                <MenuItem primaryText="Akceptuj" onTouchTap={this.handleTap.bind(this, request._id, 'OK')}/>,
                                <MenuItem primaryText="Odrzuć" onTouchTap={this.handleTap.bind(this, request._id, 'Rejected')}/>
                            ]}  
                        />
                    )}
                </IconMenu>   
            </Badge>
        );
    }

    render() {
        return (
            <div>
                {/*<SearchBox/> */}     
                {this.props.logged
                    ? <LoggedMenu/>
                    : <AccountIconMenu/>
                }
                {this.props.logged
                    ? this.renderBadge()
                    : ''
                }
                {/*   <MoreIconMenu/> */}
            </div>
        );
    }
}