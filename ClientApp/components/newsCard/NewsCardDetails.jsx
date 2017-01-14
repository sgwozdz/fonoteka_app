import React, {Component} from 'react';
import {Card, CardActions, CardTitle, CardText, CardMedia, CardHeader} from 'material-ui/Card';
import {TextField, RaisedButton} from 'material-ui';
import ThumbUpIcon from 'material-ui/svg-icons/action/thumb-up';
import ThumbDownIcon from 'material-ui/svg-icons/action/thumb-down';
import {post} from '../../script/graphqlHTTP';
import cookie from 'react-cookie';

export class NewsCardDetails extends Component {
    constructor(props) {
        super(props);
        
        this.state={
            post:{
                _id: '',
                title: '',
                author: '',
                picture: '',
                createDate: '',
                body: '',
                likes: [],
                comments: []
            },
            comment: '',
            logged: cookie.load('userId') ? true : false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleAddComment = this.handleAddComment.bind(this);
    }
    
    componentDidMount() {
        var query = '{posts (id:'+ JSON.stringify(this.props.params.id)+'){_id, title, author {_id, username}, picture, createDate, body, likes, comments {_id, author{_id, username}, parent_id, body, createDate}}}';
        var request = post();
        request._this = this;
        request.onload = function () {
            request._this.setState({post: request.response.data.posts[0]})
        }
        request.send(JSON.stringify({query: query}));
    }

    handleChange(event, value) {
        if (event.target) {
            this.setState({
                [event.target.name]: value
            })
        }
    }

    handleAddComment(parent_id, event){
        var commentState = 'comment' + parent_id;
        var userId = cookie.load('userId');
        var query = 'mutation{commentAdd(post_id: '+ JSON.stringify(this.state.post._id) 
        +', body:'+ JSON.stringify(this.state[commentState]) +', author:'+ JSON.stringify(userId) 
        +', parent_id: '+ JSON.stringify(parent_id) +'){_id, author {_id, username}, parent_id, body, createDate}}';
        var request = post();
        request._this = this;
        request.onload = function () {
            var post = request._this.state.post;
            post.comments.push(request.response.data.commentAdd);
            request._this.setState({post: post});
        }

        request.send(JSON.stringify({query: query}));
        this.setState({
            [commentState]: ''
        });
    }

    render() {
        const marginTop={
            marginTop: '30px'
        }
        const commentStyle={
            marginLeft: '16px',
            width: '90%'
        }
        const paddingLeft = {
            paddingLeft: '32px !important'
        }
        return (
            <div className='pure-g'>
                <div className='pure-u-1'>
                    <Card>
                        <CardMedia
                            overlay={<CardTitle title={this.state.post.title} />}>
                        <img src={this.state.post.picture} height="500px"/>
                        </CardMedia>
                        <CardText >
                            {this.state.post.body}
                            Mówiono o nim w rodzimych serwisach informacyjnych, internauci podłapali temat i zaczęli tworzyć historię kraju, tagować się w San Esobar na zdjęciach z wakacji. Powstały kolejne sanescobariańskie konta na Twitterze i Facebooku: partii opozycyjnej, mediów, ministerstw. Powstała oficjalna waluta, zarys historyczny, mapa, dane ekonomiczne, stanowiska w sprawach politycznych. Kolejne firmy i kolejne fanpejdże zaczęły brać udział w zabawie, oferować promocje związane z krajem, żartować i wykorzystywać popularność San Escobar.
                            Bawiło mnie to, mimo krytyki wielu osób mówiących, że zamiast skupiać się na kryzysie w Sejmie internet skupia się na głupim przejęzyczeniu. San Escobar stał się wspaniałym sposobem na wyluzowanie, na pozbycie się stresu związanego z napiętą sytuacją polityczną.
                            Zawsze obserwowałam jak wiralowe żarty rosną, jak internet podłapuje temat i przeradza drobnostki w coś dużego. Nigdy jednak nie znalazłam się pośrednio w środku całej afery. Nagle zaczęli odzywać się do mnie znajomi, nawet ci niemal zapomniani, wysyłając linki do artykułów, w których pojawił się mój tweet, zaczęły spływać komentarze i żarty.
                            Absurdalność całej sytuacji potwierdzwiła to, co podejrzewam od dawna – media internetowe uwielbiają raportować rzeczy z internetu. Nie bez powodu Facebook ma narzędzia pozwalające dziennikarzom wyszukiwać nowe tematy. Zbiory obrazków stworzonych przez internautów podane jako artykuł, czy przepisywane materiały o tym, co dziś zdarzyło się w sieci, mają dobrą oglądalność. Są łatwe w skompilowaniu, dają też poczucie pośredniego uczestnictwa w wydarzeniu.
                        </CardText>
                    </Card>
                    <div className='pure-u-1-6'></div>
                    <div className='pure-u-16-24' style={marginTop}>
                    {this.state.post.comments.filter(x=> x.parent_id == null).map((comment, cIndex) => 
                        <Card key={cIndex}>
                            <CardHeader
                                title={comment.author ? comment.author.username || 'Anonimowy' : 'Anonimowy'}
                                subtitle={comment.body}
                                actAsExpander={true}
                                showExpandableButton={true}/>
                            {this.state.post.comments.filter(y=> y.parent_id == comment._id).map((innerComment, icIndex) => 
                                <CardHeader
                                    key={icIndex}
                                    style={paddingLeft}
                                    title={innerComment.author ? innerComment.author.username || 'Anonimowy' : 'Anonimowy'}
                                    subtitle={innerComment.body}
                                    expandable={true}>
                                </CardHeader>
                            )}
                            <CardText expandable={true}>
                                <TextField
                                    name={'comment' + comment._id}
                                    floatingLabelText="Odpowiedz na komentarz..."
                                    multiLine={true}
                                    rows={1}
                                    rowsMax={4}
                                    style={commentStyle}
                                    value={this.state['comment' + comment._id] || ''}
                                    onChange={this.handleChange}
                                    disabled={!this.state.logged}/>
                                <div className='text-center'>
                                    <RaisedButton 
                                        containerElement='label' 
                                        label='Dodaj komentarz' 
                                        primary={true} 
                                        onTouchTap={this.handleAddComment.bind(this, comment._id)}
                                        disabled={!this.state.logged}/>
                                </div>
                            </CardText>
                        </Card>
                    )}
                    <TextField
                        name='comment'
                        floatingLabelText="Napisz komentarz..."
                        multiLine={true}
                        rows={1}
                        rowsMax={4}
                        style={commentStyle}
                        value={this.state.comment}
                        onBlur={this.handleChange}
                        disabled={!this.state.logged}/>
                    <div className='text-center'>
                        <RaisedButton 
                            containerElement='label' 
                            label='Dodaj komentarz' 
                            primary={true}
                            onTouchTap={this.handleAddComment.bind(this, '')}
                            disabled={!this.state.logged}/>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}