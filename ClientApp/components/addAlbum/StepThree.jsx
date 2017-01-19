import React, {Component} from 'react';
import {FlatButton,TextField,SelectField,Chip,MenuItem,
    Dialog,DatePicker,RaisedButton,AutoComplete} from 'material-ui';
import {TimeField} from '../utils/TimeField';

export class StepThree extends Component {
    constructor(props) {
        super(props);

        this.state= {
            title: this.props.title || '',
            cover: this.props.cover || '',
            sample: this.props.sample || '',
            released: this.props.released || '',
            length: this.props.length || '',
            artists: this.props.artists || [],
            genres: this.props.genres || [],
            tracks: this.props.tracks || []
        };
    }

    renderTrack(track){
        const wordWrap = {
                wordWrap: 'normal',
                wordBreak: 'break-all'
        }
        return(
        <tr key={track.number}>
            <th>{track.number}</th>
            <th style={wordWrap}>{track.title}</th>
            <th style={wordWrap}>{track.feat}</th>
            <th>{track.length}</th>
        </tr>
        );
    }

    render() {
        return (
            <div>
                <div className='pure-u-1-3'>
                    <div>
                        <img src={this.state.cover}/>
                    </div>
                    <div style={{marginTop: '25px'}}>
                        <audio controls src={this.state.sample || ''}/>
                    </div>
                    <div>
                        <TextField
                            name='title'
                            disabled={true}
                            defaultValue={this.state.title}/>                             
                    </div>
                    <div>
                        <TextField
                            name='artists'
                            disabled={true}
                            defaultValue={this.state.artists.map(x=> x.name).join(', ')}/>
                    </div>
                    <div>
                        <TextField
                            name='released'
                            disabled={true}
                            defaultValue={this.state.released ? this.state.released.toLocaleDateString() : ''}/>                            
                    </div>
                    <div>
                        <TextField
                            name='length'
                            disabled={true}
                            defaultValue={this.state.length}/>                                      
                    </div>
                    <div>
                        <TextField
                            name='genres'
                            disabled={true}
                            defaultValue={this.state.genres.map(x=>x.label).join(', ')}/>
                    </div>
                </div>
                <div className="pure-u-1-12">&nbsp;</div>
                <div className='pure-u-5-12'>
                    <table className="pure-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th className='text-center width-100'>tytuł</th>
                                <th className='text-center width-100'>feat</th>
                                <th>czas</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.tracks.map(this.renderTrack,this)}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
} 