import * as React from 'react';
import { RankingElement } from './RankingElement';
import {post} from '../../script/graphqlHTTP';

export class Ranking extends React.Component {
    constructor(props) {
        super(props);
        this.state =
        {
            albums: []
        }
    }
    
    componentDidMount() {
        var query = "{rankedAlbums (limit:10) {_id, title, averageRate}}";
        var request = post();
        request._this = this;
        request.onload = function () {
            request._this.setState({albums: request.response.data.rankedAlbums})
        }
        request.send(JSON.stringify({query: query}));
    }
    
    render() {
        return <table className="pure-table">
            <thead>
                <tr>
                    <th>Miejsce</th>
                    <th>Tytuł</th>
                    <th>Ocena</th>
                </tr>
            </thead>
            <tbody>
              {this.state.albums.map(album =>
                    <RankingElement key={album._id} album={album} />)}
            </tbody>
        </table>;
    }
}