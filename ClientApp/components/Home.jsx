import React, {Component} from 'react';
import {NewsCard} from './card/NewsCard'
import cookie from 'react-cookie';

export class Home extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div>
                <div className='col-sm-4'>
                    <NewsCard title={'Now kombinezon IronMana jest gotowy MK-112'} author={'Tonny Stark'} text={'aloha'}/>
                </div>
                <div className='col-sm-4'>
                    <NewsCard title={'Now kom jest gotowy MK-112'} author={'Tonny Stark'} text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque Aliquam dui mauris,mattis quis lacus id, pellentesque lobortis odio.'}/>
                </div>
                <div className='col-sm-4'>
                    <NewsCard title={'Now kombinezon IronMana jest gotowy MK-112'} author={'Tonny Stark'} text={'aloha'}/>
                </div>
            </div>
        );
    }
}