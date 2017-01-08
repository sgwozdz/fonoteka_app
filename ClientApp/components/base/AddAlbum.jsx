import * as React from 'react';
import * as $ from 'jquery';
import {FlatButton, TextField, SelectField, Chip, MenuItem, Dialog, DatePicker, RaisedButton, AutoComplete } from 'material-ui';
import {Card, CardActions, CardTitle, CardText, CardMedia} from 'material-ui/Card';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';

export class AddAlbum extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            autoComplete:{
                data: [],
                searchText: ''
            },
            title: '',
            cover: '',
            released: null,
            length: '',
            artists: [],
            tracks: [],
            genresData: [],
            chipData: []
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
            fileButton:{
                display: 'none'
            },
            iconStyle:{
                position: 'relative',
                top: '8px',
                marginLeft: '5px'
            },
            textAlignLeft:{
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
    }
    
    componentDidMount() {
         $.post("http://localhost:4000/graphql", {
                query: '{genres {_id, label}}'
            }, function (response) {
                this.setState({genresData: response.data.genres})
            }.bind(this), "json");
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleDateChange(event, date){
        this.setState({
            released: date,
        });
    };
    handleSelectChange (event, index, value){
        var chips = this.state.chipData;
        if (!chips.find((x) => x.key === value)) {
            chips.push({key: value, label: event.target.innerText});
            this.setState({chipData: chips});
        }
    }
    handleInputChange(event){
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        var _this = this;
        reader.onload = function () {
            _this.setState({
                cover: reader.result
            });
        };
    }

    handleRequestDelete(key){
        this.chipData = this.state.chipData;
        const chipToDelete = this.chipData.map((chip) => chip.key).indexOf(key);
        this.chipData.splice(chipToDelete, 1);
        this.setState({chipData: this.chipData});
    }

    handleSubmit(){
        event.preventDefault();
        var genresQuery = '';
        if(this.state.chipData.length != 0){
            genresQuery = ', genres:[' + this.state.chipData.map(x=> x.key) + ']';
        }
        var artistsQuery = '';
        if(this.state.artists.length != 0){
            artistsQuery = ', artists:[' + this.state.artists.map(x=> JSON.stringify(x._id)) + ']';
        }


        var query = "mutation{albumAdd(title:" + JSON.stringify(this.state.title) + ", released:" + JSON.stringify(this.state.released) + genresQuery + ", cover:" + JSON.stringify(this.state.cover) + artistsQuery + ") {_id}}";
        console.log(query);
        $.post("http://localhost:4000/graphql", {
            query: query
        }, function (response) {
            console.log(response.data.albumAdd._id);
        }.bind(this), "json");
    }
    
    renderChip(data) {
        return (
            <Chip
                key={data.key || data._id}
                style={this.styles.chip}
                onRequestDelete={()=> this.handleRequestDelete(data.key || data._id)}>
                {data.label || data.name}
            </Chip>
        );
    }

    handleUpdateInput(searchText){
        var autoComplete = this.state.autoComplete;
        autoComplete.searchText = searchText;

        $.post("http://localhost:4000/graphql", {
                query: '{artists (name: '+ JSON.stringify(searchText) +'){_id, name}}'
            }, function (response) {
                autoComplete.data = response.data.artists;
                this.setState({autoComplete: autoComplete})
            }.bind(this), "json");
    };

    handleNewRequest(value) {
        var artist = this.state.autoComplete.data.find((x)=> x.name === value);
        var artists = this.state.artists;

        if (artists.indexOf(artist) === -1) 
          artists.push(artist);

        var autoComplete = this.state.autoComplete;
        autoComplete.searchText = '';

        this.setState({artists: artists, autoComplete: autoComplete})
    };

    render(){
        return (
             <div className='row'>
                <div className='col-sm-4 col-sm-offset-4 text-center'>
                    <Card>
                        <CardTitle title='Dodawanie albumu'/>
                            <CardText>
                                <div>
                                   <TextField
                                        name='title'
                                        floatingLabelText='tytuł'
                                        value={this.state.title}
                                        onChange={this.handleChange}/><br/>
                                    <RaisedButton
                                        containerElement='label'
                                        label='Dodaj okładkę'>
                                        <input type="file" 
                                        style={this.styles.fileButton} 
                                        onChange={this.handleInputChange}/>
                                    </RaisedButton>
                                    {this.state.cover 
                                        ? <CheckCircle style={this.styles.iconStyle}/>
                                        : ''    
                                    }    
                                    <AutoComplete 
                                        searchText={this.state.autoComplete.searchText}
                                        floatingLabelText= 'artysta/zespół'
                                        onUpdateInput={this.handleUpdateInput}
                                        onNewRequest={this.handleNewRequest}
                                        dataSource={this.state.autoComplete.data.map(x=> x.name)}
                                        filter={(searchText, key) => true}/><br/>
                                    <div>
                                        {this.state.artists.map(this.renderChip, this)}
                                    </div><br/>
                                    <DatePicker 
                                        name='released'
                                        mode="landscape"
                                        floatingLabelText='data wydania'
                                        value={this.state.released}
                                        onChange={this.handleDateChange}/><br/>  
                                    <SelectField
                                        style={this.styles.textAlignLeft}
                                        onChange={this.handleSelectChange}
                                        floatingLabelText="gatunek">
                                        {this.state.genresData.map(genre => 
                                            <MenuItem key={genre._id} value={genre._id} primaryText={genre.label} />)}
                                    </SelectField>
                                    <div>
                                        {this.state.chipData.map(this.renderChip, this)}
                                    </div>
                                </div>
                            </CardText>
                            <CardActions>
                                <FlatButton label='Dodaj album' onTouchTap={this.handleSubmit}/>
                            </CardActions>
                    </Card>
                </div>
            </div>
        );
    }
}