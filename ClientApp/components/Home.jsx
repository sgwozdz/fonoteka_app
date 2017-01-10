import React, {Component} from 'react';
import {NewsCard} from './card/NewsCard'
import cookie from 'react-cookie';
import {post} from '../script/graphqlHTTP';

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        var query = '{posts {_id, title, author {_id, username}, createDate, body}}';
        var request = post();
        request._this = this;
        request.onload = function () {
            request._this.setState({posts: request.response.data.posts})
        }
        request.send(JSON.stringify({query: query}));
    }

    render() {
        return (
            <div className='pure-g'>
                {this
                    .state
                    .posts
                    .map(post => <div key={post._id} className='pure-u-1-3'>
                        <NewsCard post={post}/>
                    </div>)}
            </div>
        );
    }
}