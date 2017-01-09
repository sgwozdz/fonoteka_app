import * as React from 'react';
import * as $ from 'jquery';
import {FlatButton,TextField,SelectField,Chip,MenuItem,
    Dialog,DatePicker,RaisedButton,AutoComplete} from 'material-ui';
import {Card, CardActions, CardTitle, CardText, CardMedia} from 'material-ui/Card';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';
import {Step, Stepper, StepButton} from 'material-ui/Stepper';
import {TimeField} from '../utils/TimeField';

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
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdateInput = this.handleUpdateInput.bind(this);
        this.handleNewRequest = this.handleNewRequest.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
    }

    componentDidMount() {
        $
            .post("http://localhost:4000/graphql", {
                query: '{genres {_id, label}}'
            }, function (response) {
                this.setState({genresData: response.data.genres})
            }.bind(this), "json");

            
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
                    image.this.props.onChange({target: {name: 'cover', value: canvas.toDataURL()}});
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

    handleSubmit() {
        event.preventDefault();
        var genresQuery = '';
        if (this.state.genres.length != 0) {
            genresQuery = ', genres:[' + this.state.genres.map(x => x.key) + ']';
        }
        var artistsQuery = '';
        if (this.state.artists.length != 0) {
            artistsQuery = ', artists:[' + this.state.artists.map(x => JSON.stringify(x._id)) + ']';
        }

        var query = "mutation{albumAdd(title:" + JSON.stringify(this.state.title) 
        + ", released:" + JSON.stringify(this.state.released) 
        + genresQuery 
        + ", cover:" + JSON.stringify(this.state.cover) 
        + artistsQuery + ") {_id}}";
        console.log(query);
        $.post("http://localhost:4000/graphql", {
            query: query
        }, function (response) {
            console.log(response.data.albumAdd._id);
        }.bind(this), "json");
    }

    handleUpdateInput(searchText) {
        var autoComplete = this.state.autoComplete;
        autoComplete.searchText = searchText;

        $.post("http://localhost:4000/graphql", {
            query: '{artists (name: ' + JSON.stringify(searchText) + '){_id, name}}'
        }, function (response) {
            autoComplete.data = response.data.artists;
            this.setState({autoComplete: autoComplete})
        }.bind(this), "json");
    };

    handleNewRequest(value) {
        var artist = this.state.autoComplete.data.find((x) => x.name === value);
        var artists = this.state.artists;

        if (artists.indexOf(artist) === -1) 
            artists.push(artist);
        
        var autoComplete = this.state.autoComplete;
        autoComplete.searchText = '';

        this.setState({artists: artists, autoComplete: autoComplete})
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
        const marginTop = {
            marginTop: '30px'
        }
        return (
            <div className='row'>
                <div className='col-sm-12'>
                    <div className='row'>
                        <TextField
                            name='title'
                            floatingLabelText='tytuł'
                            value={this.state.title}
                            errorText={this.state.titleError}
                            onChange={this.handleTitleChange}/>
                    </div>
                    <div className='row'>
                        <AutoComplete
                            searchText={this.state.autoComplete.searchText}
                            floatingLabelText='artysta/zespół'
                            onUpdateInput={this.handleUpdateInput}
                            onNewRequest={this.handleNewRequest}
                            dataSource={this.state.autoComplete.data.map(x => x.name)}
                            filter={(searchText, key) => true}/>
                    </div>
                    <div className='row'>
                        <div className='col-sm-6 col-sm-offset-3'>
                            {this.state.artists.map((x)=>{return this.renderChip(x, 'artists')})}
                        </div>
                    </div>
                    <div className='row' style={marginTop}>
                        <RaisedButton containerElement='label' label='Dodaj okładkę' primary={true}>
                            <input
                                type="file"
                                style={this.styles.fileButton}
                                onChange={this.handleInputChange}/>
                        </RaisedButton>
                        {this.state.cover
                            ? <CheckCircle style={this.styles.iconStyle}/>
                            : ''
                        }
                    </div>
                    <div className='row'>
                        <DatePicker
                            name='released'
                            floatingLabelText='data wydania'
                            value={this.state.released}
                            onChange={this.handleDateChange}
                            maxDate={this.state.maxDate}/>
                    </div>
                    <div className='row'>
                        <TimeField
                            name='length'
                            floatingLabelText='długość'
                            errorText={this.state.lengthError}
                            value={this.state.length}
                            onChange={this.handleChange}/>
                    </div>
                    <div className='row'>
                        <SelectField
                            style={this.styles.textAlignLeft}
                            onChange={this.handleSelectChange}
                            floatingLabelText="gatunek">
                            {this.state.genresData.map(genre => 
                                <MenuItem key={genre._id} value={genre._id} primaryText={genre.label}/>)
                            }
                        </SelectField>
                    </div>
                    <div className='row'>
                        <div className='col-sm-6 col-sm-offset-3'>
                            {this.state.genres.map((x)=>{return this.renderChip(x, 'genres')})}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}