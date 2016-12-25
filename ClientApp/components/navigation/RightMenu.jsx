import React, {Component} from 'react';
import { MoreIconMenu } from './MoreIconMenu';
import { AccountIconMenu } from './AccountIconMenu';
import { SearchBox } from './SearchBox';

export class RightMenu extends Component {
    render() {
        return (
            <div>
                <SearchBox/>
                <AccountIconMenu/>
                <MoreIconMenu/>
            </div>
        );
    }
}