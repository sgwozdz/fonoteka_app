import React, {Component} from 'react';
import {Link} from 'react-router';
import {Card, CardActions, CardTitle, CardText, CardMedia} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

export class NewsCard extends Component {
    render() {
        return (
            <Card>
                <CardMedia
                    overlay={<CardTitle title={this.props.post.title} subtitle={this.props.post.author.username}/>}>
               <img src={require('../ironman1.jpg')}/> 
                </CardMedia>
                <CardText>
                    {this.props.post.body}
                </CardText>
                <CardActions>
                    <FlatButton label="Czytaj dalej..." containerElement={<Link to="/news/5"/>}/>
                </CardActions>
            </Card>
        );
    }
}