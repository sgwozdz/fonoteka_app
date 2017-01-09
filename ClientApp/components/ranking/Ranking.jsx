import * as React from 'react';
import { RankingElement } from './RankingElement';
import * as $ from 'jquery';

export class Ranking extends React.Component {
    constructor(props) {
        super(props);
        this.state =
        {
            albums: []
        }
    }
    
    componentDidMount() {
    $.post("http://localhost:4000/graphql", {query: "{rankedAlbums (limit:10) {_id, title, averageRate}}"}, function(response) {
        this.setState({albums: response.data.rankedAlbums})
         }.bind(this), "json");
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