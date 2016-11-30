import * as React from 'react';
import { RankingElement } from './RankingElement';
import * as $ from 'jquery';

export class Ranking extends React.Component {
    render() {
        // var xhr = new XMLHttpRequest();
        // xhr.responseType = 'jsonp';
        // xhr.open("POST", "http://localhost:4000/graphql");
        // xhr.setRequestHeader("Content-Type", "application/json");
        // xhr.setRequestHeader("Accept", "application/json");
        // xhr.onload = function () {

        // }
        // xhr.send(JSON.stringify({ query: "{albums {title}}" }));

        $.ajax({ // ajax call starts
            crossDomain: true,
            type: "POST",
            url: 'http://localhost:4000/graphql', // JQuery loads areas
            data: { query: "{albums {title}}" },
            dataType: 'jsonp', // Choosing a JSON datatype
            async: false,
            success: function (data) // Variable data contains the data we get from serverside
            {
                this.props.albums = data;
            }
        });

        return <table className="table table-hover">
            <thead>
                <tr>
                    <th>Miejsce</th>
                    <th>Tytuł</th>
                    <th>Ocena</th>
                </tr>
            </thead>
            <tbody>
                {this.props.albums.map(album =>
                    <RankingElement album={album} />)}
            </tbody>
        </table>;
    }
}