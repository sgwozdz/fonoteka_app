import React, {Component} from 'react';
import {Card, CardTitle, CardText, CardMedia, CardHeader} from 'material-ui/Card';
import {TextField, RaisedButton} from 'material-ui';
import {post} from '../../script/graphqlHTTP';
import cookie from 'react-cookie';
import {grey800} from 'material-ui/styles/colors';

export class NewsCardDetails extends Component {
    constructor(props) {
        super(props);
        
        this.state={
            post:{
                _id: '',
                title: '',
                author: '',
                picture: '',
                createDate: '',
                body: '',
                likes: [],
                comments: []
            },
            logged: cookie.load('userId') ? true : false
        }
        this.handleAddComment = this.handleAddComment.bind(this);
    }

    componentDidMount() {
        var query = '{posts (id:'+ JSON.stringify(this.props.params.id)+'){_id, title, author {_id, username}, picture, createDate, body, likes, comments {_id, author{_id, username}, parent_id, body, createDate}}}';
        var request = post();
        request._this = this;
        request.onload = function () {
            request._this.setState({post: request.response.data.posts[0]})
        }
        request.send(JSON.stringify({query: query}));
    }

    handleAddComment(parent_id, event){
        var commentState = 'comment' + parent_id;
        var value =this.refs['comment' + parent_id].getValue();
        if (value) {
            var userId = cookie.load('userId');
            var query = 'mutation{commentAdd(post_id: '+ JSON.stringify(this.state.post._id) 
            +', body:'+ JSON.stringify(value) +', author:'+ JSON.stringify(userId) 
            +', parent_id: '+ JSON.stringify(parent_id) +'){_id, author {_id, username}, parent_id, body, createDate}}';
            var request = post();
            request._this = this;
            request.onload = function () {
                var post = request._this.state.post;
                post.comments.push(request.response.data.commentAdd);
                request._this.setState({post: post});
            }

            request.send(JSON.stringify({query: query}));
            this.refs['comment' + parent_id].getInputNode().value = '';
        }
    }

    render() {
        const commentStyle={
            marginLeft: '16px',
            width: '90%'
        }
        const innerCommentStyle = {
            paddingLeft: '32px',
            backgroundColor: grey800
        }
        return (
            <div className='pure-g'>
                <div className='pure-u-1'>
                    <Card>
                        <CardMedia
                            overlay={<CardTitle title={this.state.post.title} />}>
                        <img src={this.state.post.picture} height="500px"/>
                        </CardMedia>
                        <CardText >
                            {this.state.post.body}
                        </CardText>
                    </Card>
                    <div className='pure-u-1-6'></div>
                    <div className='pure-u-16-24' style={{marginTop: '30px'}}>
                    {this.state.post.comments.filter(x=> x.parent_id == null).map((comment, cIndex) => 
                        <Card key={cIndex}>
                            <CardHeader
                                title={comment.author ? comment.author.username || 'Anonimowy' : 'Anonimowy'}
                                subtitle={comment.body}
                                actAsExpander={true}
                                showExpandableButton={true}/>
                            {this.state.post.comments.filter(y=> y.parent_id == comment._id).map((innerComment, icIndex) => 
                                <CardHeader
                                    key={icIndex}
                                    style={innerCommentStyle}
                                    title={innerComment.author ? innerComment.author.username || 'Anonimowy' : 'Anonimowy'}
                                    subtitle={innerComment.body}
                                    expandable={true}>
                                </CardHeader>
                            )}
                            <CardText expandable={true} style={{backgroundColor: grey800}}>
                                <TextField
                                    ref={'comment' + comment._id}
                                    type='text'
                                    floatingLabelText="Odpowiedz na komentarz..."
                                    multiLine={true}
                                    rows={1}
                                    rowsMax={4}
                                    style={commentStyle}
                                    disabled={!this.state.logged}/>
                                <div className='text-center'>
                                    <RaisedButton 
                                        containerElement='label' 
                                        label='Dodaj komentarz' 
                                        primary={true} 
                                        onTouchTap={this.handleAddComment.bind(this, comment._id)}
                                        disabled={!this.state.logged}/>
                                </div>
                            </CardText>
                        </Card>
                    )}
                    <TextField
                        ref="comment"
                        floatingLabelText="Napisz komentarz..."
                        multiLine={true}
                        rows={1}
                        rowsMax={4}
                        style={commentStyle}
                        disabled={!this.state.logged}/>
                    <div className='text-center'>
                        <RaisedButton 
                            containerElement='label' 
                            label='Dodaj komentarz' 
                            primary={true}
                            onTouchTap={this.handleAddComment.bind(this, '')}
                            disabled={!this.state.logged}/>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}