import * as React from 'react';
import {BaseElement} from './BaseElement';
import {Link} from 'react-router';
import * as $ from 'jquery';
import {FlatButton, TextField, SelectField, Chip, MenuItem, Dialog, DatePicker } from 'material-ui';
import { white, cyan800
} from 'material-ui/styles/colors';


export class Base extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDialogOpen: false,
            searchValue: '',
            albums: [],
            chipData: [],
            genres: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
    }

    componentDidMount() {
        this.getAlbums();
        this.getGenres();
    }

    getGenres() {
        $.post("http://localhost:4000/graphql", {
                query: '{genres {_id, label}}'
            }, function (response) {
                this.setState({genres: response.data.genres})
            }.bind(this), "json");
    }

    getAlbums(title, chips){
        if (!title) {
            title = this.state.searchvalue;
        }
        if (!chips) {
            chips = this.state.chipData;
        }
        var titleQuery = '';
        var genresQuery = '';
        if (title) {
            titleQuery = ', title:\"' + title + '\"';
        }
        if(this.state.chipData.length != 0){
            genresQuery = ', genres:[' + this.state.chipData.map(x=> x.key) + ']';
        }
        var albumsQuery = '{albums (limit:50' + titleQuery + genresQuery + ') {_id, title, released, cover}}';
        $.post("http://localhost:4000/graphql", {
                query: albumsQuery
            }, function (response) {
                this.setState({albums: response.data.albums})
            }.bind(this), "json");
   
    }
    handleChange(event){
        this.setState({searchValue: event.target.value});
        this.getAlbums(event.target.value);
    }
    handleSelectChange (event, index, value){
        var chips = this.state.chipData;
        chips.push({key: value, label: event.target.innerText});
        this.setState({chipData: chips});
        this.getAlbums(null, chips)
    }
    handleRequestDelete(key){
        this.chipData = this.state.chipData;
        const chipToDelete = this.chipData.map((chip) => chip.key).indexOf(key);
        this.chipData.splice(chipToDelete, 1);
        this.setState({chipData: this.chipData});
        this.getAlbums(null, this.chipData)
    }
    handleToggle() {
        this.setState({
            isDialogOpen: !this.state.isDialogOpen
        });
    }
    renderChip(data) {
    return (
        <Chip
            key={data.key}
            onRequestDelete={() => this.handleRequestDelete(data.key)}>
            {data.label}
        </Chip>
        );
    }
    render() {
        const inputColor = {
            color: 'blue'
        };
        const colorCyan800 = {
            color: cyan800
        };
        const padding = {
            paddingTop: 10
        };
        return <div>          
            <div className='row'>
                <div className='col-sm-12'>
                    <TextField floatingLabelText="Wyszukiwanie..." 
                    floatingLabelStyle={colorCyan800} 
                    inputStyle={inputColor} 
                    underlineStyle={colorCyan800} 
                    onChange={this.handleChange}/>
                    <FlatButton label="Dodaj album" containerElement={<Link to="/addAlbum"/>}/>
                </div>
            </div>
            <div className='row'>
                <div className='col-sm-8' >
                    {this
                        .state
                        .albums
                        .map(album => 
                        <div className='col-sm-6' style={padding} key={album._id}>
                            <BaseElement album={album}/>
                        </div>)}
                </div>
                <div className='col-sm-3 col-sm-offset-1'>
                     <SelectField
                        onChange={this.handleSelectChange}
                        floatingLabelText="gatunek">
                        {this.state.genres.map(genre => 
                            <MenuItem key={genre._id} value={genre._id} primaryText={genre.label} />)}
                    </SelectField>
                    <div>
                        {this.state.chipData.map(this.renderChip, this)}
                    </div>
                </div>
            </div>
        </div>;
    }
}