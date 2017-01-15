import React, {Component} from 'react';
import {Link} from 'react-router';
import {Card, CardActions, CardTitle, CardText, CardMedia} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

export class NewsCard extends Component {
    constructor(props) {
        super(props);
        
        var p = this.props.post;

        this.state = {
            id: p._id || '',
            title: p.title || '',
            author: p.author ? (p.author.username || ''): '',
            picture: p.picture || '',
            createDate: p.createDate || '',
            body: p.body || ''
        }
    }
    
    render() {
        return (
            <Card>
                <CardMedia
                    overlay={<CardTitle title={this.state.title} subtitle={this.state.author}/>}>
                <img src={this.state.picture}/>
                </CardMedia>
                <CardText>
                    {this.state.body.slice(0,100)}...
                </CardText>
                <CardActions>
                    <FlatButton label="Czytaj dalej..." containerElement={<Link to={'/news/details/' + this.state.id}/>}/>
                </CardActions>
            </Card>
        );
    }
}