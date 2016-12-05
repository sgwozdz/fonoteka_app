import * as React from 'react';
import {NavMenu} from './NavMenu';
import {Logo} from './Logo';

export class Layout extends React.Component {
    render() {
        return (
            <div>
                <NavMenu/>
                <main id="page-wrap" className='container'>
                    <Logo/>
                    <div className='row'>
                        <div className='col-sm-12'>
                            {this.props.body}
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}