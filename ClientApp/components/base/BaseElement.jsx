import * as React from 'react';
import {
    Card,
    CardHeader,
    CardActions,
    CardTitle,
    CardText,
    CardMedia
} from 'material-ui/Card';
import {FlatButton, Slider, Dialog} from 'material-ui';
import cookie from 'react-cookie';
import * as $ from 'jquery';

export class BaseElement extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sliderValue: 5,
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
            buttonLabel:{
            },
            dialog: {
                textAlign: 'center'
            }
        }
        this.hanldeSliderChange = this.hanldeSliderChange.bind(this);
        this.handleDialog = this.handleDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
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
        if(cookie.load('userId'))
        {
            var query = 'mutation{ratingAdd(album_id:' 
            + JSON.stringify(this.props.album._id) 
            + ', user_id:' + JSON.stringify(cookie.load('userId')) 
            + ', rate: ' + this.state.sliderValue + '){user_id, rate}}';
            $.post("http://localhost:4000/graphql", {
                    query: query
                }, function () {
                    this.setState({
                        dialogTitle: 'Właśnie oceniłeś album! Dziękujemy :)',
                        open: !this.state.open
                    });
                }.bind(this), "json");   
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
                <CardHeader
                    title={this.props.album.title}
                    subtitle={new Date(this.props.album.released).toLocaleDateString()}/>
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
                            sliderStyle={this.styles.sliderInner}
                            onChange={this.hanldeSliderChange}/>
                        <FlatButton 
                            label={buttonLabel}  
                            style={this.styles.button} 
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
