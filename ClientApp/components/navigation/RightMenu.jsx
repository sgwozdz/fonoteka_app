import React, {Component} from 'react';
import { MoreIconMenu } from './MoreIconMenu';
import { AccountIconMenu } from './AccountIconMenu';
import { LoggedMenu } from './LoggedMenu';
import { SearchBox } from './SearchBox';

export class RightMenu extends Component {
    render() {
        return (
            <div>
                <SearchBox/>
                {this.props.logged
                    ? <LoggedMenu/>
                    : <AccountIconMenu/>
                }
                <MoreIconMenu/>
            </div>
        );
    }
}