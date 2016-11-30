import * as React from 'react';

export class RankingElement extends React.Component{ 
    render() {
        return <tr>
            <th>this.props.album.place</th>
            <th>this.props.album.title</th>
            <th>this.props.album.grade</th>
        </tr>;
    }
}
