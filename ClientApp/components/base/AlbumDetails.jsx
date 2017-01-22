import React, {Component} from 'react';
import {Card, CardActions, CardTitle, CardText, CardHeader} from 'material-ui/Card';
import {RaisedButton, TextField, Dialog} from 'material-ui';
import cookie from 'react-cookie';
import {post} from '../../script/graphqlHTTP';
import {grey800} from 'material-ui/styles/colors';

export class AlbumDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            album: {
                _id: '',
                title: '',
                cover: '',
                sample: '',
                artists: [],
                released: '',
                length: '',
                genres: [],
                tracks: [],
                comments: []
            },
            logged: cookie.load('userId') ? true : false
        }

        this.handleAddComment = this.handleAddComment.bind(this);
    }

    componentDidMount() {
        var query = '{albums (id:' + JSON.stringify(this.props.params.id) 
        + '){_id, title, cover, sample, artists {name}, released, length, genres{label}, tracks{id, title, feat, length}, comments {_id, author{_id, username}, parent_id, body, createDate}}}';
        var request = post();
        request._this = this;
        request.onload = function () {
            request._this.setState({album: request.response.data.albums[0]})
        }

        request.send(JSON.stringify({query: query}));
    }

    handleAddComment(parent_id, event){
        var commentState = 'comment' + parent_id;
        var value = this.refs['comment' + parent_id].getValue();
        if (value) {
            var userId = cookie.load('userId');
            var query = 'mutation{albumCommentAdd(album_id: '+ JSON.stringify(this.state.album._id) 
            +', body:'+ JSON.stringify(value) +', author:'+ JSON.stringify(userId) 
            +', parent_id: '+ JSON.stringify(parent_id) +'){_id, author {_id, username}, parent_id, body, createDate}}';
            var request = post();
            request._this = this;
            request.onload = function () {
                var album = request._this.state.album;
                album.comments.push(request.response.data.albumCommentAdd);
                request._this.setState({album: album});
            }

            request.send(JSON.stringify({query: query}));
            this.refs['comment' + parent_id].getInputNode().value = '';
        }
    }

    render() {
        const paddingTable = {
            paddingTop: '20px',
            paddingBottom: '20px'
        }
        const whiteColor={
            color: 'white'
        }
        const cursorDefault={
            cursor:'default'
        }
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
                <div className="pure-u-1-12">&nbsp;</div>
                <div className='pure-u-20-24'>
                    <div className='text-center'>
                        <Card>
                            <CardTitle title={'Album ' + this.state.album.title}/>
                            <div className='pure-u-1-2'>
                                <div>
                                    <img src={this.state.album.cover || ''}/>
                                </div>
                            </div>
                            <div className='pure-u-1-3'>
                                <div>
                                    <TextField 
                                        name='title' 
                                        disabled={true} 
                                        value={this.state.album.title} 
                                        style={cursorDefault}
                                        inputStyle={whiteColor}/>
                                </div>
                                <div>
                                    <TextField 
                                        name='artists'
                                        disabled={true}
                                        style={cursorDefault}
                                        inputStyle={whiteColor}
                                        value={this.state.album.artists.map(x => x.name).join(', ')}/>
                                </div>
                                <div>
                                    <TextField
                                        name='released'
                                        disabled={true}
                                        style={cursorDefault}
                                        inputStyle={whiteColor}
                                        value={this.state.album.released ? new Date(this.state.album.released).toLocaleDateString() : ''}/>
                                </div>
                                <div>
                                    <TextField 
                                        name='length' 
                                        disabled={true}
                                        style={cursorDefault}
                                        inputStyle={whiteColor} 
                                        value={this.state.album.length || ''}/>
                                </div>
                                <div>
                                    <TextField 
                                        name='genres' 
                                        disabled={true}
                                        style={cursorDefault}
                                        inputStyle={whiteColor} 
                                        value={this.state.album.genres.map(x => x.label).join(', ')}/>
                                </div>
                                <div style={{marginTop: '25px'}}>
                                    <audio controls src={this.state.album.sample || ''}/>
                                </div>
                            </div>
                            <div className='pure-u-1-12'>&nbsp;</div>
                            <div className='pure-u-1-2' style={paddingTable}>
                                <table className='pure-table'>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th className='text-center width-500'>tytuł</th>
                                            <th>czas</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.album.tracks.map((track, cIndex) =>
                                            <tr key={cIndex}>
                                                <th>{track.number || ''}</th>
                                                <th>{track.title + (track.feat ? ' (feat. '+ track.feat +')' : '')}</th>
                                                <th>{track.length || ''}</th>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </div>
                    <div className='pure-u-1-6'></div>
                    <div className='pure-u-16-24' style={{marginTop: '30px'}}>
                    {this.state.album.comments.filter(x=> x.parent_id == null).map((comment, cIndex) => 
                        <Card key={cIndex}>
                            <CardHeader
                                title={comment.author ? comment.author.username || 'Anonimowy' : 'Anonimowy'}
                                subtitle={comment.body}
                                actAsExpander={true}
                                showExpandableButton={true}/>
                            {this.state.album.comments.filter(y=> y.parent_id == comment._id).map((innerComment, icIndex) => 
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