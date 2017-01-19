import React, {Component} from 'react';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import {RaisedButton, TextField, Dialog} from 'material-ui';
import cookie from 'react-cookie';
import {post} from '../../script/graphqlHTTP';

export class AlbumDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            album: {
                title: '',
                cover: '',
                sample: '',
                artists: [],
                released: '',
                length: '',
                genres: [],
                tracks: []
            }
        }
    }

    componentDidMount() {
        var query = '{albums (id:' + JSON.stringify(this.props.params.id) 
        + '){title, cover, sample, artists {name}, released, length, genres{label}, tracks{id, title, feat, length}}}';
        var request = post();
        request._this = this;
        request.onload = function () {
            request._this.setState({album: request.response.data.albums[0]})
        }

        request.send(JSON.stringify({query: query}));
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

        return (
            <div className='pure-g'>
                <div className="pure-u-1-12">&nbsp;</div>
                <div className='pure-u-20-24 text-center'>
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
            </div>
        );
    }
}