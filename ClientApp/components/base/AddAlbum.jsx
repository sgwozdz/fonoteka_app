
import * as React from 'react';
import * as $ from 'jquery';
import {FlatButton, TextField, SelectField, Chip, MenuItem, Dialog, DatePicker } from 'material-ui';
import {Card, CardActions, CardTitle, CardText, CardMedia} from 'material-ui/Card';
export class AddAlbum extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            released: null,
            length: '',
            artists: [],
            genres: [],
            tracks: [],
            genresData: [],
            chipData: []
        };
        this.styles = {
            chip: {
                margin: 4,
            },
            wrapper: {
                display: 'flex',
                flexWrap: 'wrap',
            },
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        chips.push({key: value, label: event.target.innerText});
        this.setState({chipData: chips});
    }
   handleRequestDelete(key){
        this.chipData = this.state.chipData;
        const chipToDelete = this.chipData.map((chip) => chip.key).indexOf(key);
        this.chipData.splice(chipToDelete, 1);
        this.setState({chipData: this.chipData});
    }

    handleSubmit(){
        //post to graphql
    }

    renderChip(data) {
        return (
            <Chip
                key={data.key}
                style={this.styles.chip}
                onRequestDelete={()=> this.handleRequestDelete(data.key)}>
                {data.label}
            </Chip>
        );
    }
    render(){
        return (
             <div className='row'>
                <div className='col-sm-4 col-sm-offset-4 text-center'>
                    <Card>
                        <CardTitle title='Dodawanie albumu'/>
                        <form onSubmit={this.handleSubmit}>
                            <CardText>
                                <div>
                                   <TextField
                                        name='title'
                                        floatingLabelText='tytuł'
                                        value={this.state.title}
                                        onChange={this.handleChange}/><br/>
                                    <DatePicker 
                                        name='released'
                                        mode="landscape"
                                        floatingLabelText='data wydania'
                                        value={this.state.released}
                                        onChange={this.handleDateChange}/><br/>  
                                    <SelectField
                                        onChange={this.handleSelectChange}
                                        floatingLabelText="Gatunek">
                                        {this.state.genresData.map(genre => 
                                            <MenuItem key={genre._id} value={genre._id} primaryText={genre.label} />)}
                                    </SelectField><br/>
                                    <div style={this.styles.wrapper}>
                                        {this.state.chipData.map(this.renderChip, this)}
                                    </div>
                                </div>
                            </CardText>
                            <CardActions>
                                <FlatButton label='Dodaj album' type='submit'/>
                            </CardActions>
                        </form>
                    </Card>
                </div>
            </div>
        );
    }
}