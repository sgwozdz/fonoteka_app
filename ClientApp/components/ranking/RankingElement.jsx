import React, {Component} from 'react';
import {Link} from 'react-router';

export class RankingElement extends Component{ 
    render() {
        const linkStyle={
            color: 'black',
            textDecoration: 'none'
        }
        return <tr className={this.props.ranked%2 === 0 ? 'pure-table-odd table-odd-color-ranking' : ''}>
            <th style={{fontSize: '20px'}}>
                {this.props.ranked}
            </th>
            <th>
                <div style={{float:'left'}}>
                    <img src={this.props.album.cover} height='120px'/>
                </div>
                <div>
                    <Link to={'/album/details/' + this.props.album._id} style={linkStyle}>
                        <div style={{fontSize: '21px'}}>
                            {this.props.album.title}
                        </div>
                        <div style={{fontSize: 'large'}}>
                            {this.props.album.artists.map(x => x.name).join(', ')}
                        </div>
                    </Link>
                </div>
            </th>
            <th style={{fontSize: '20px'}}>
                {this.props.album.averageRate}
            </th>
        </tr>;
    }
}
