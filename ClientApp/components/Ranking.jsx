import * as React from 'react';
import { RankingElement } from './RankingElement';
import * as $ from 'jquery';
import * as axios from 'axios';

export class Ranking extends React.Component {
    constructor(props) {
        super(props);
        this.state =
        {
            albums: []
        }
    }
    
    componentDidMount() {
    $.post("http://localhost:4000/graphql", {query: "{albums {title}}"}, function(response) {
        this.setState({albums: response.data.albums})
         }.bind(this), "json");
    }
    
    render() {
        return <table className="table table-hover">
            <thead>
                <tr>
                    <th>Miejsce</th>
                    <th>Tytuł</th>
                    <th>Ocena</th>
                </tr>
            </thead>
            <tbody>
              {this.state.albums.map(album =>
                    <RankingElement album={album} />)}
            </tbody>
        </table>;
    }
}