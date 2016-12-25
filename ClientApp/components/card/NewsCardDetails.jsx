import React, {Component} from 'react';
import {Card, CardActions, CardTitle, CardText, CardMedia} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import ThumbUpIcon from 'material-ui/svg-icons/action/thumb-up';
import ThumbDownIcon from 'material-ui/svg-icons/action/thumb-down';

// get data from webapi 
export class NewsCardDetails extends Component {
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
            </Card>
        );
    }
}