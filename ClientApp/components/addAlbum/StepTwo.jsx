import * as React from 'react';
import {FlatButton,TextField,SelectField,Chip,MenuItem,
    Dialog,DatePicker,RaisedButton,AutoComplete} from 'material-ui';
import {TimeField} from '../utils/TimeField';

export class StepTwo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            number: '',
            title: '',
            feat: '',
            length: '',
            tracks: this.props.tracks || [],
            numberError: '',
            titleError: '',
            timeFieldError: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleAddTrack = this.handleAddTrack.bind(this);
    }

    handleChange(event) {
        if (event.target) {
            this.setState({
                [event.target.name]: event.target.value
            })
        }
    }

    handleNumberChange(event){
        const re = /^$|^(\d?\d)$/;
        var errorMessage = '';
       
        if (!re.test(event.target.value)) {
            errorMessage = 'numer z przedziału 0-99';
        }

        this.handleChange(event);

        this.setState({
            numberError: errorMessage
        })
    }

    handleTitleChange(event){
        var errorMessage = '';
       
        if (!event.target.value) {
            errorMessage = 'pole jest wymagane';
        }

        this.handleChange(event);

        this.setState({
            titleError: errorMessage
        })
    }

    handleAddTrack(){
        if (!this.state.title) {
            this.setState({
                titleError: 'pole jest wymagane'
            })
        }
        if (!this.state.numberError && !this.state.titleError && !this.state.timeFieldError) {
            var tracks = this.state.tracks;
            var newTrack = {
                number: this.state.number,
                title: this.state.title,
                feat: this.state.feat,
                length: this.state.length
            }

            tracks.push(newTrack);

            this.setState(tracks)
            this.props.onChange({target: {name: 'tracks', value: tracks}});
        }
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
                        <TextField
                            name='number'
                            floatingLabelText='numer'
                            value={this.state.number}
                            errorText = {this.state.numberError}
                            onChange={this.handleNumberChange}/>                                     
                    </div>
                    <div>
                        <TextField
                            name='title'
                            floatingLabelText='tytuł'
                            value={this.state.title}
                            errorText = {this.state.titleError}
                            onChange={this.handleTitleChange}/>                                     
                    </div>
                    <div>
                        <TextField
                            name='feat'
                            floatingLabelText='feat'
                            value={this.state.feat}
                            onChange={this.handleChange}/>                                     
                    </div>
                    <div>
                        <TimeField
                            name='length'
                            floatingLabelText='długość'
                            value={this.state.length}
                            onChange={this.handleChange}/>
                    </div>
                    <div>
                        <RaisedButton label='Dodaj utwór' onTouchTap={this.handleAddTrack} primary={true}/>
                    </div>
                </div>
                <div className="pure-u-1-12">&nbsp;</div>
                <div className='pure-u-5-12'>
                    <table className="pure-table">
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