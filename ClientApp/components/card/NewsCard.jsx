import React, {Component} from 'react';
import {Link} from 'react-router';
import {Card, CardActions, CardTitle, CardText, CardMedia} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

export class NewsCard extends Component {
    constructor(props) {
        super(props);
        
        var p = this.props.post;

        this.state = {
            title: p.title,
            subtitle: p.author ? p.author.username : ''
        }
    }
    
    render() {

        return (
            <Card>
                <CardMedia
                    overlay={<CardTitle title={this.state.title} subtitle={this.state.subtitle}/>}>
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