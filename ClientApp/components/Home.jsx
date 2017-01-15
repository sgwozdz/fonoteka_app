import React, {Component} from 'react';
import {Link} from 'react-router';
import {NewsCard} from './newsCard/NewsCard';
import {RaisedButton} from 'material-ui';
import {post} from '../script/graphqlHTTP';

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
        this.styles={
            marginBottom:{
                marginBottom: '20px'
            }
        }
    }

    componentDidMount() {
        var query = '{posts {_id, title, author {_id, username}, picture, createDate, body}}';
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
                <RaisedButton 
                    label="Dodaj news"
                    primary={true}
                    fullWidth={true}
                    style={this.styles.marginBottom}
                    containerElement={<Link to="/news/add"/>}/>
                {this.state.posts.map(post => 
                    <div key={post._id} className='pure-u-1-3'>
                        <NewsCard post={post}/>
                    </div>)}
            </div>
        );
    }
}