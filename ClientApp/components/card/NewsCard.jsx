import React, {Component} from 'react';
import {Link} from 'react-router';
import {Card, CardActions, CardTitle, CardText, CardMedia} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

// temporary image 
export class NewsCard extends Component {
    render() {
        return (
            <Card>
                <CardMedia
                    overlay={<CardTitle title={this.props.title} subtitle={this.props.author}/>}>
                    <img src={require('../ironman1.jpg')}/> 
                </CardMedia>
                <CardText>
                    {this.props.text}
                </CardText>
                <CardActions>
                    <FlatButton label="Czytaj dalej..." containerElement={<Link to="/news/5"/>}/>
                </CardActions>
            </Card>
        );
    }
}