import React, {Component} from 'react';
import {Link} from 'react-router';
import {Card, CardHeader, CardActions, CardTitle, CardText, CardMedia} from 'material-ui/Card';
import {FlatButton, Slider, Dialog} from 'material-ui';
import cookie from 'react-cookie';
import {post} from '../../script/graphqlHTTP';

export class BaseElement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.album._id || '',
            title: this.props.album.title || '',
            artists: this.props.album.artists || [],
            released: this.props.album.released || null,
            sliderValue: 1,
            userId: cookie.load("userId") || '',
            open: false,
            dialogTitle: ''
        }
        this.styles = {
            sliderInner: {
                marginTop: 0,
                marginBottom: 0
            },
            button:{
                width: '100%'
            },
            dialog: {
                textAlign: 'center'
            }
        }

        this.hanldeSliderChange = this.hanldeSliderChange.bind(this);
        this.handleDialog = this.handleDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
    }

    componentDidMount() {
        if (this.props.album.ratings && this.state.userId) {
            var userRate = this.props.album.ratings.find(x=> x.user_id ===this.state.userId);
            if (userRate) {
                this.setState({
                    sliderValue: userRate.rate,
                    rated: true
                })
            }
        }
    }

    hanldeSliderChange(event, value) {
        this.setState({sliderValue: value});
    };
    
    closeDialog(){
        this.setState({
            open: !this.state.open
        });
    }

    handleDialog() {
        if(this.state.userId)
        {
            var query = 'mutation{ratingAdd(album_id:' 
            + JSON.stringify(this.props.album._id) 
            + ', user_id:' + JSON.stringify(this.state.userId) 
            + ', rate: ' + this.state.sliderValue + '){user_id, rate}}';
            var request = post();
            request._this = this;
            request.onload = function () {
                request._this.setState({
                    dialogTitle: 'Właśnie oceniłeś album! Dziękujemy :)',
                    open: !request._this.state.open
                })
            }
            request.send(JSON.stringify({query: query}));
        }
        else{
            this.setState({
                dialogTitle: 'Aby móc oceniać albumy musisz być zalogowany.',
                open: !this.state.open
            });
        }     
    };

    render() {
        const buttonLabel = 'daję ' + this.state.sliderValue + '/10';
        return (
            <Card>
                <Link to={'/album/details/' + this.state.id}>
                    <CardHeader className="reset-padding-right" title={this.props.album.title} subtitle={this.state.artists.map(x=> x.name).join()} style={{color: 'red'}}/>
                </Link>
                <CardMedia>
                <img src={this.props.album.cover}/>
                </CardMedia>
                <CardActions>
                    <div>
                        <Slider
                            min={1}
                            max={10}
                            step={1}
                            value={this.state.sliderValue}
                            disabled={this.state.userId ? false : true}
                            sliderStyle={this.styles.sliderInner}
                            onChange={this.hanldeSliderChange}/>
                        <FlatButton 
                            label={buttonLabel}  
                            style={this.styles.button} 
                            disabled={this.state.userId ? false : true}
                            onTouchTap={this.handleDialog}/>
                        <Dialog
                            title={this.state.dialogTitle}
                            style={this.styles.dialog} 
                            modal={false}
                            open={this.state.open}
                            onRequestClose={this.closeDialog}>
                            <FlatButton 
                                label="Ok" 
                                style={this.styles.button} 
                                onTouchTap={this.closeDialog}/>
                        </Dialog>
                    </div>
                </CardActions>
            </Card>
        );
    }
}
