import * as React from 'react';
import {post} from '../../script/graphqlHTTP';
import {RaisedButton, Dialog} from 'material-ui';
import {Card, CardActions, CardTitle, CardText, CardMedia} from 'material-ui/Card';
import {Step, Stepper, StepButton } from 'material-ui/Stepper';
import {StepOne} from '../addAlbum/StepOne';
import {StepTwo} from '../addAlbum/StepTwo';
import {StepThree} from '../addAlbum/StepThree';
import ArrowForward from  'material-ui/svg-icons/navigation/arrow-forward';

export class AddAlbum extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            stepIndex: 0,
            title: '',
            cover: '',
            released: '',
            length: '',
            artists: [],
            genres: [],
            tracks: [],
            error: '',
            open: false
        };
        this.styles = {
            chip: {
                margin: '4px',
                float: 'left'
            },
            wrapper: {
                display: 'flex',
                flexWrap: 'wrap'
            },
            fileButton:{
                display: 'none'
            },
            iconStyle:{
                position: 'relative',
                top: '8px',
                marginLeft: '5px'
            },
            textAlignLeft:{
                textAlign: 'left'
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.getStepContent = this.getStepContent.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    
    componentDidMount() {
        var query = '{genres {_id, label}}';
        var request = post();
        request._this = this;
        request.onload = function () {
            request._this.setState({genresData: request.response.data.genres})
        }
        request.send(JSON.stringify({query: query}));
    }

    handleChange(event) {
        if (event.target) {
            this.setState({
                [event.target.name]: event.target.value
            })
        }
    }

    handleSubmit(){
        if (this.state.error) {
           this.setState({
               open: true
           });
        }
        else{
            var genresQuery = '';
            if(this.state.genres.length != 0){
                genresQuery = ', genres:[' + this.state.genres.map(x=> x.key) + ']';
            }
            var artistsQuery = '';
            if(this.state.artists.length != 0){
                artistsQuery = ', artists:[' + this.state.artists.map(x=> JSON.stringify(x._id)) + ']';
            }
            var tracksQuery = '';
            if(this.state.tracks.length != 0){
                tracksQuery = ', tracks:[';
                this.state.tracks.forEach(function(track) {
                    tracksQuery += '{';
                    if (track.id) 
                        tracksQuery += ' id: '+JSON.stringify(track.number);
                    if (track.title)
                        tracksQuery += ' title: '+JSON.stringify(track.title);
                    if (track.feat)
                        tracksQuery += ' feat: '+JSON.stringify(track.feat);
                    if (track.length)
                        tracksQuery += ' length: '+JSON.stringify(track.length);
                    tracksQuery += '}';
                }, this);
                tracksQuery += ']';
            }

            var query = 'mutation{albumAdd(title:' + JSON.stringify(this.state.title) + ', length:'+ JSON.stringify(this.state.length) +', released:' + JSON.stringify(this.state.released) 
            + genresQuery + ', cover:' + JSON.stringify(this.state.cover) + artistsQuery + tracksQuery + ') {_id}}';
            var request = post();
            request._this = this;
            request.onload = function () {
                if (request.response.data.albumAdd) {
                    request._this.props.router.push('/dialog/2');
                }
            }
            request.send(JSON.stringify({query: query}));
        }
    }

    handleNext(){
        const stepIndex = this.state.stepIndex;
        if (stepIndex < 2) {
        this.setState({stepIndex: stepIndex + 1});
        }
        if (stepIndex === 2) {
            this.handleSubmit();
        }
    };

    getStepContent(stepIndex) {
        switch (stepIndex) {
        case 0:
            return (<StepOne onChange={this.handleChange} 
                        title={this.state.title} 
                        cover={this.state.cover} 
                        released={this.state.released} 
                        length={this.state.length} 
                        artists={this.state.artists} 
                        genres={this.state.genres}/>);
        case 1:
            return (<StepTwo onChange={this.handleChange} 
                        tracks={this.state.tracks}/>);
        case 2:
            return (<StepThree title={this.state.title} 
                        cover={this.state.cover} 
                        released={this.state.released} 
                        length={this.state.length} 
                        artists={this.state.artists} 
                        genres={this.state.genres} 
                        tracks={this.state.tracks}/>);
        default:
            return 'Ooops, napisz do nas bo coś poszło nie tak!';
        }
    }

     handleClose(){
        this.setState({open: !this.state.open});
    };

    render(){
        const actions = [
            <RaisedButton
                label="Ok"
                primary={true}
                onTouchTap={this.handleClose}/>
        ];
        return (
        <div className='pure-g'> 
            <div className="pure-u-1-12">&nbsp;</div>
            <div className='pure-u-20-24 text-center'>
                <Dialog
                        title='Nie udało się zapisać :('
                        actions={actions}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleClose}>
                        {this.state.error}
                    </Dialog>
                <Card>
                    <CardTitle title='Dodawanie albumu'/>
                    <CardText>
                         <Stepper linear={false} activeStep={this.state.stepIndex}>
                            <Step>
                                <StepButton onClick={() => this.setState({stepIndex: 0})}>
                                Tworzenie albumu...
                                </StepButton>
                            </Step>
                            <Step>
                                <StepButton onClick={() => this.setState({stepIndex: 1})}>
                                Dodawanie utworów...
                                </StepButton>
                            </Step>
                            <Step>
                                <StepButton onClick={() => this.setState({stepIndex: 2})}>
                                Podsumowanie
                                </StepButton>
                            </Step>
                        </Stepper>
                        {this.getStepContent(this.state.stepIndex)}
                    </CardText>
                    <CardActions>
                        <RaisedButton 
                            label={this.state.stepIndex === 2 ? 'Dodaj album' : 'Dalej'} 
                            labelPosition="before"
                            onTouchTap={this.handleNext} 
                            primary={true} 
                            icon={this.state.stepIndex === 2 ? '' : <ArrowForward/>}/>
                    </CardActions>
                </Card>
            </div> 
        </div>);
}
}