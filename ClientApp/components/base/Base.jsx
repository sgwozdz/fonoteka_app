import * as React from 'react';
import {BaseElement} from './BaseElement';
import {Link} from 'react-router';
import {RaisedButton, TextField, SelectField, Chip, MenuItem, Dialog, DatePicker } from 'material-ui';
import { white, cyan800
} from 'material-ui/styles/colors';
import {post} from '../../script/graphqlHTTP';

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
        var query = "{genres {_id, label}}";
        var request = post();
        request._this = this;
        request.onload = function () {
            request._this.setState({genres: request.response.data.genres})
        }
        request.send(JSON.stringify({query: query}));
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
        var query = '{albums (limit:50' + titleQuery + genresQuery + ') {_id, title, released, artists{_id, name}, ratings {user_id, rate}, cover}}';
        var request = post();
        request._this = this;
        request.onload = function () {
            request._this.setState({albums: request.response.data.albums})
        }
        request.send(JSON.stringify({query: query}));
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
        const marginTop = {
            marginTop: 30,
            float: 'right'
        };
        return <div>          
            <div className='pure-g'>
                <div className='pure-u-2-3'>
                    <div className='pure-u-sm-1 pure-u-md-2-3'>
                        <TextField floatingLabelText="Wyszukiwanie..." 
                            floatingLabelStyle={colorCyan800} 
                            inputStyle={inputColor} 
                            underlineStyle={colorCyan800} 
                            onChange={this.handleChange}/>
                    </div>
                    <div className='pure-u-sm-1 pure-u-md-1-3'>
                        <RaisedButton 
                            label="Dodaj album"
                            primary={true}
                            style={marginTop}
                            containerElement={<Link to="/album/add"/>}/>
                    </div>
                </div>
            </div>
            <div className='pure-g'>
                <div className='pure-u-sm-2-3' >
                    {this
                        .state
                        .albums
                        .map(album => 
                        <div className='pure-u-sm-1-2 pure-u-lg-1-3' style={padding} key={album._id}>
                            <BaseElement album={album}/>
                        </div>)}
                </div>
                <div className="pure-u-1-12">&nbsp;</div>
                <div className='pure-u-1-4'>
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