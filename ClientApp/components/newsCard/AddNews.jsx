import React, {Component} from 'react';
import {post} from '../../script/graphqlHTTP';
import cookie from 'react-cookie';
import {RaisedButton, TextField} from 'material-ui';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';

export class AddNews extends Component {
    constructor(props) {
        super(props);

        this.state = {
            picture: '',
            errorTitle: '',
            errorBody: '',
            logged: cookie.load('userId') ? true : false
        };

        this.styles = {
            fileButton: {
                display: 'none'
            },
            iconStyle: {
                position: 'relative',
                top: '8px',
                marginLeft: '5px'
            },
            alignLeft:{
                textAlign: 'left'
            },
            alignCenter:{
                textAlign: 'center'
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        var file = event.target.files[0];
        if (file) {
            var reader = new FileReader();
            reader.this = this;
            reader.onload = function (e) {
                var image = new Image();
                image.this = reader.this;
                image.onload = function () {
                    var canvas = document.createElement('canvas');
                    canvas.width = 300;
                    canvas.height = 300;
                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(image, 0,0,300,300);
                    
                    image.this.setState({picture: canvas.toDataURL("image/jpeg")});
                }

                image.src = e.target.result;
            }

            reader.readAsDataURL(file);
        };
    }

    handleSubmit() {
        var userId = cookie.load('userId');
        var body = this.refs.body.getValue();
        var title = this.refs.title.getValue();

        if (userId && title && body) {
            var query = 'mutation{postAdd (author:'+ JSON.stringify(userId) +', title:'+ JSON.stringify(title) 
            +', body:'+ JSON.stringify(body) +', picture:'+ JSON.stringify(this.state.picture) +'){_id}}';     
            var request = post();
            request._this = this;
            request.onload = function () {
                 if (request.response.data.postAdd) {
                    request._this.props.router.push('/dialog/3');
                }
            }

            request.send(JSON.stringify({query: query}));
        }

        var errorTitle = title ? '' : 'pole jest wymagane';
        var errorBody = body ? '' : 'pole jest wymagane';

        this.setState({
            errorTitle: errorTitle,
            errorBody: errorBody
        })
    }

    render() {
        const marginTop = {
            marginTop: '30px'
        }
        return (
            <div className='pure-g'>
                <div className="pure-u-1-12">&nbsp;</div>
                <div className='pure-u-20-24 text-center'>
                    <Card>
                        <CardTitle title='Dodawanie newsa'/>
                        <CardText>
                            <div className='pure-u-2-3'>
                                <div>
                                    <TextField
                                        name='title'
                                        ref='title'
                                        floatingLabelText='tytuł'
                                        errorText={this.state.errorTitle}
                                        fullWidth={true}/>
                                </div>
                                <div style={marginTop}>
                                    <RaisedButton containerElement='label' label='Dodaj zdjęcie' primary={true}>
                                        <input
                                            type="file"
                                            style={this.styles.fileButton}
                                            onChange={this.handleInputChange}/>
                                    </RaisedButton>
                                    {this.state.picture ? <CheckCircle style={this.styles.iconStyle}/> : ''}
                                </div>
                                <div>
                                    <TextField
                                        name='body'
                                        ref='body'
                                        floatingLabelText='treść'
                                        errorText={this.state.errorBody}
                                        fullWidth={true}
                                        multiLine={true}
                                        rows={1}
                                        style={this.styles.alignLeft}
                                        errorStyle={this.styles.alignCenter}/>
                                </div>
                            </div>
                        </CardText>
                        <CardActions>
                            <RaisedButton
                                label='Dodaj news'
                                labelPosition="before"
                                primary={true}
                                onTouchTap={this.handleSubmit}
                                disabled={!this.state.logged}/>
                        </CardActions>
                    </Card>
                </div>
            </div>
        );
    }
}