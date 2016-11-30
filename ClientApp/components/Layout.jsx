import * as React from 'react';
import { NavMenu } from './NavMenu';

// export LayoutProps {
//     body: React.ReactElement<any>;
// }

export class Layout extends React.Component{
    render() {
        return <div className='container'>
        <NavMenu/>
            <div className='row'>
                <div className='col-sm-12'>
                    {this.props.body}
                </div>
            </div>
        </div>;
    }
}