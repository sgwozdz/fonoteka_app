import React, {Component} from 'react';
import {NewsCard} from './card/NewsCard'
import cookie from 'react-cookie';
import * as $ from 'jquery';

export class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        $
            .post("http://localhost:4000/graphql", {
                query: "{posts {_id, title, author {_id, username}, createDate, body}}"
            }, function (response) {
                var parsedResponse = JSON.stringify(response.data.posts);
                this.setState({posts: response.data.posts})
            }.bind(this), "json");
    }

    render() {
        return (
            <div>
                {this
                    .state
                    .posts
                    .map(post => <div className='col-sm-4'>
                        <NewsCard post={post}/>
                    </div>)}
            </div>
        );
    }
}