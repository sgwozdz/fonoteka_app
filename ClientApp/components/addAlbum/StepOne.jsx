import * as React from 'react';
import {FlatButton,TextField,SelectField,Chip,MenuItem,
    Dialog,DatePicker,RaisedButton,AutoComplete} from 'material-ui';
import {Card, CardActions, CardTitle, CardText, CardMedia} from 'material-ui/Card';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';
import {Step, Stepper, StepButton} from 'material-ui/Stepper';
import {TimeField} from '../utils/TimeField';
import {post} from '../../script/graphqlHTTP';
import IntlPolyfill from 'intl';
const DateTimeFormat = IntlPolyfill.DateTimeFormat;
require('intl/locale-data/jsonp/pl');
require('intl/locale-data/jsonp/pl-PL');

export class StepOne extends React.Component {
    constructor(props) {
        super(props);

        const maxDate = new Date();
        maxDate.setFullYear(maxDate.getFullYear());
        maxDate.setHours(0, 0, 0, 0);

        this.state = {
            autoComplete: {
                data: [],
                searchText: ''
            },
            title: this.props.title || '',
            cover: this.props.cover || '',
            released: this.props.released || null,
            length: this.props.length || '',
            artists: this.props.artists || [],
            genres: this.props.genres || [],
            titleError: '',
            lengthError: '',
            genresData: [],
            maxDate: maxDate
        };
        this.styles = {
            chip: {
                margin: '4px',
                float: 'left'
            },
            wrapper: {
                display: 'flex',
                flexWrap: 'wrap'
            },
            fileButton: {
                display: 'none'
            },
            iconStyle: {
                position: 'relative',
                top: '8px',
                marginLeft: '5px'
            },
            textAlignLeft: {
                textAlign: 'left'
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleUpdateInput = this.handleUpdateInput.bind(this);
        this.handleNewRequest = this.handleNewRequest.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
    }

    componentDidMount() {
        var query = "{genres {_id, label}}";
        var request = post();
        request._this = this;
        request.onload = function () {
            request._this.setState({genresData: request.response.data.genres})
        }
        request.send(JSON.stringify({query: query}));
    }
    componentWillUnmount(){
        this.handleTitleChange({target: {name:'title', value: this.state.title}});
    }
    handleChange(event) {
        if (event.target) {
            this.setState({
                [event.target.name]: event.target.value
            })
        }

        this.props.onChange(event);
    }

    handleTitleChange(event){
        var errorMessage = '';
        var outerErrorMessage = '';

        if (!event.target.value) {
            errorMessage = 'pole jest wymagane';
            outerErrorMessage = 'Nie wypełniłeś pola \"tytuł\"';
        }

        this.handleChange(event);
        this.props.onChange({target:{name: 'error', value: outerErrorMessage}})
        this.setState({
            titleError: errorMessage
        })
    }

    handleDateChange(event, date) {
        this.setState({released: date});
        this.props.onChange({target: {name: 'released', value:date}});
    };

    handleSelectChange(event, index, value) {
        var chips = this.state.genres;
        if (!chips.find((x) => x.key === value)) {
            chips.push({key: value, label: event.target.innerText});
            this.setState({genres: chips});
            this.props.onChange({target: {name: 'genres', value: chips}});
        }
    }

    handleInputChange(event) {
        var file = event.target.files[0];
        if (file) {
            var reader = new FileReader();
            reader.this = this;
            reader.onload = function (e) {
                var image = new Image();
                image.this = reader.this;
                image.onload = function () {
                    var canvas = document.createElement('canvas');
                    canvas.width = 300;
                    canvas.height = 300;
                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(image, 0,0,300,300);
                    
                    image.this.setState({cover: "done"});
                    image.this.props.onChange({target: {name: 'cover', value: canvas.toDataURL("image/jpeg")}});
                }

                image.src = e.target.result;
            }

            reader.readAsDataURL(file);
        };
    }

    handleRequestDelete(key, name) {
        var array = this.state[name];
        const chipToDelete = array.map((chip) => chip.key).indexOf(key);
        array.splice(chipToDelete, 1);
        this.setState({name: array});
        this.props.onChange({target: {name: name, value: array}});
    }

    handleUpdateInput(searchText) {
        var autoComplete = this.state.autoComplete;
        autoComplete.searchText = searchText;

        var query = '{artists (name: ' + JSON.stringify(searchText) + '){_id, name}}';
        var request = post();
        request._this = this;
        request.searchText = searchText;
        request.onload = function () {
            var autocomplete = request._this.state.autoComplete;
            autoComplete.searchText = searchText;
            autocomplete.data = request.response.data.artists;
            request._this.setState({autoComplete: autoComplete})
        }
        request.send(JSON.stringify({query: query}));
    };

    handleNewRequest(value) {
        var artist = this.state.autoComplete.data.find((x) => x.name === value);
        var artists = this.state.artists;

        if (artist != null && artists.indexOf(artist) === -1) {
            artists.push(artist);
            this.setState({artists: artists});
        }
        else{
            var query = 'mutation{artistAdd(name: '+ JSON.stringify(value) +') {_id, name}}';
            var request = post();
            request._this = this;
            request.onload = function(){
                var artists = request._this.state.artists;
                artists.push(request.response.data.artistAdd);

                request._this.setState({albums: artists})
            }

            request.send(JSON.stringify({query: query}));
        }

        var autoComplete = this.state.autoComplete;
        autoComplete.searchText = '';

        this.setState({autoComplete: autoComplete});
        this.props.onChange({target: {name: 'artists', value: artists}});
    };

    renderChip(data, type) {
        return (
            <Chip
                key={data.key || data._id}
                style={this.styles.chip}
                onRequestDelete={() => this.handleRequestDelete(data.key || data._id, type)}>
                {data.label || data.name}
            </Chip>
        );
    }

    render() {
        const displayInlineBlock = {
            display: 'inline-block'
        }
        const marginTop = {
            marginTop: '30px'
        }
        return (
                <div className='pure-u-1-3'>
                    <div>
                        <TextField
                            name='title'
                            floatingLabelText='tytuł'
                            value={this.state.title}
                            errorText={this.state.titleError}
                            onChange={this.handleTitleChange}/>
                    </div>
                    <div>
                        <AutoComplete
                            searchText={this.state.autoComplete.searchText}
                            floatingLabelText='artysta/zespół'
                            onUpdateInput={this.handleUpdateInput}
                            onNewRequest={this.handleNewRequest}
                            dataSource={this.state.autoComplete.data.map(x => x.name)}
                            filter={(searchText, key) => true}/>
                    </div>
                    <div style={displayInlineBlock}>
                        {this.state.artists.map((x)=>{return this.renderChip(x, 'artists')})}
                    </div>
                    <div style={marginTop}>
                        <RaisedButton containerElement='label' label='Dodaj okładkę' primary={true}>
                            <input
                                type="file"
                                style={this.styles.fileButton}
                                onChange={this.handleInputChange}/>
                        </RaisedButton>
                        {this.state.cover ? <CheckCircle style={this.styles.iconStyle}/> : ''
                        }
                    </div>
                    <div>
                        <DatePicker
                            name='released'
                            floatingLabelText='data wydania'
                            DateTimeFormat={DateTimeFormat}
                            okLabel="akceptuj"
                            cancelLabel="anuluj"
                            locale='pl-PL'
                            value={this.state.released}
                            onChange={this.handleDateChange}
                            maxDate={this.state.maxDate}/>
                    </div>
                    <div>
                        <TimeField
                            name='length'
                            floatingLabelText='długość'
                            errorText={this.state.lengthError}
                            value={this.state.length}
                            onChange={this.handleChange}/>
                    </div>
                    <div>
                        <SelectField
                            style={this.styles.textAlignLeft}
                            onChange={this.handleSelectChange}
                            floatingLabelText="gatunek">
                            {this.state.genresData.map(genre => 
                                <MenuItem key={genre._id} value={genre._id} primaryText={genre.label}/>)
                            }
                        </SelectField>
                    </div>
                    <div style={displayInlineBlock}>
                        {this.state.genres.map((x)=>{return this.renderChip(x, 'genres')})}
                    </div>
                </div>
        );
    }
}