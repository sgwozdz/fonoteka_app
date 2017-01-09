import * as React from 'react';
import * as $ from 'jquery';
import {FlatButton,TextField,SelectField,Chip,MenuItem,
    Dialog,DatePicker,RaisedButton,AutoComplete} from 'material-ui';
import {TimeField} from '../utils/TimeField';

export class StepThree extends React.Component {
    constructor(props) {
        super(props);

        this.state= {
            title: this.props.title || '',
            cover: this.props.cover || '',
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
            <div className='row'>
                <div className='col-sm-4 col-sm-offset-1'>
                    <div className='row'>
                        <img src={this.state.cover}/>
                    </div>
                    <div className='row'>
                        <TextField
                            name='title'
                            disabled={true}
                            defaultValue={this.state.title}/>                             
                    </div>
                    <div className='row'>
                        <TextField
                            name='artists'
                            disabled={true}
                            defaultValue={this.state.artists.map(x=> x.name).join()}/>
                    </div>
                    <div className='row'>
                        <TextField
                            name='released'
                            disabled={true}
                            defaultValue={this.state.released ? this.state.released.toLocaleDateString() : ''}/>                            
                    </div>
                    <div className='row'>
                        <TextField
                            name='length'
                            disabled={true}
                            defaultValue={this.state.length}/>                                      
                    </div>
                    <div className='row'>
                        <TextField
                            name='genres'
                            disabled={true}
                            defaultValue={this.state.genres.map(x=>x.label).join()}/>
                    </div>
                </div>
                <div className='col-sm-5 col-sm-offset-1'>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>tytuł</th>
                                <th>feat</th>
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