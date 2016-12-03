import * as React from 'react';

export class RankingElement extends React.Component{ 
    render() {
        return <tr>
            <th>1</th>
            <th>{this.props.album.title}</th>
            <th>1.2</th>
        </tr>;
    }
}
