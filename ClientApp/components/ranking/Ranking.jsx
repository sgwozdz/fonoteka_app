import React, {Component} from 'react';
import { RankingElement } from './RankingElement';
import {Link} from 'react-router';
import {SelectField, Chip, MenuItem} from 'material-ui';
import {post} from '../../script/graphqlHTTP';

export class Ranking extends Component {
    constructor(props) {
        super(props);
        this.state =
        {
            albums: [],
            genres: [],
            selectedGenres: [],
            years: [],
            selectedYear: ''
        }
        this.styles = {
            chip: {
                margin: '4px',
                float: 'left'
            }
        }
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }
    
    componentDidMount() {
        this.getAlbums();
        this.getGenres();
        this.setState({
            years: Array.apply(null, Array(48)).map(function (_, i) {return 2017-i;})
        })
    }
    getAlbums(released, genres){
        if (!released) 
            released = this.state.selectedYear;
        if (!genres) 
            genres = this.state.selectedGenres;
        
        var releasedQuery = '';
        var genresQuery = '';
        if (released && released !== -1) 
            releasedQuery = ', released:\"' + released + '\"';        
        if(genres.length != 0)
            genresQuery = ', genres:[' + genres.map(x=> x.key) + ']';
        
        var query = '{rankedAlbums (limit:10' + releasedQuery + genresQuery + ') {_id, title, cover, artists{name}, averageRate}}';
        var request = post();
        request._this = this;
        request.onload = function () {
            request._this.setState({albums: request.response.data.rankedAlbums});
        }
        request.send(JSON.stringify({query: query}));
    }
    getGenres() {
        var query = "{genres {_id, label}}";
        var request = post();
        request._this = this;
        request.onload = function () {
            request._this.setState({genres: request.response.data.genres});
        }

        request.send(JSON.stringify({query: query}));
    }
    handleYearChange(event, index, value){
        this.setState({selectedYear: value});
        this.getAlbums(value, null);
    }
    handleSelectChange (event, index, value){
        var genres = this.state.selectedGenres;
        genres.push({key: value, label: event.target.innerText});
        this.setState({selectedGenres: genres});
        this.getAlbums(null, genres);
    }
    handleRequestDelete(key){
        var selectedGenres = this.state.selectedGenres;
        var chipToDelete = selectedGenres.map((chip) => chip.key).indexOf(key);
        selectedGenres.splice(chipToDelete, 1);
        this.setState({selectedGenres: selectedGenres});
        this.getAlbums(null, selectedGenres);
    }
    renderChip(data) {
        return (
            <Chip
                key={data.key}
                style={this.styles.chip}
                onRequestDelete={() => this.handleRequestDelete(data.key)}>
                {data.label}
            </Chip>
            );
    }
    render() {
        const displayInlineBlock = {
            display: 'inline-block'
        }
        return (
        <div className='pure-g'>
            <div className='pure-u-2-3'>
                <table className="pure-table" style={{width:'100%'}}>
                    <thead>
                        <tr>
                            <th style={{width: '10%'}}>#</th>
                            <th>Album</th>
                            <th style={{width: '15%'}}>Ocena</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.albums.map((album, index) =>
                            <RankingElement key={index} ranked={index+1} album={album} />)}
                    </tbody>
                </table>
            </div>
            <div className='pure-u-1-12'>&nbsp;</div>
            <div className='pure-u-1-4'>
                <div>
                    <SelectField
                        floatingLabelText="rok wydania"
                        value={this.state.selectedYear}
                        onChange={this.handleYearChange}>
                         <MenuItem value={-1} primaryText={''} />
                        {this.state.years.map(year =>
                            <MenuItem key={year} value={year} primaryText={year} />
                        )}
                        </SelectField>
                </div>
                <div>
                    <SelectField
                    onChange={this.handleSelectChange}
                    floatingLabelText="gatunek">
                    {this.state.genres.map(genre => 
                        <MenuItem key={genre._id} value={genre._id} primaryText={genre.label} />)}
                    </SelectField>
                    <div style={displayInlineBlock}>
                        {this.state.selectedGenres.map(this.renderChip, this)}
                    </div>
                </div>
            </div>
        </div>);
    }
} 