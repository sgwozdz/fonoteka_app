import React, {Component} from 'react';
import {
    Card,
    CardHeader,
    CardMedia
} from 'material-ui/Card';

export class FriendElement extends Component {
    render() {
        return (
            <Card>
                <CardHeader
                    title={this.props.username}
                    avatar={require('../../images/default-user-image.jpg')}
                    />
            </Card>
        );
    }
}
