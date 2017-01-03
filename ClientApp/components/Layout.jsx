import * as React from 'react';
import cookie from 'react-cookie';
import {NavAppBar} from './navigation/NavAppBar';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
const Styles = () => getMuiTheme(darkBaseTheme);

export class Layout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            logged: cookie.load('userId')
                ? true
                : false
        };
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={Styles()}>
                <div>
                    <NavAppBar logged={this.state.logged}/>
                    <main id="page-wrap" className='container'>
                        {this.props.body}
                    </main>
                </div>
            </MuiThemeProvider>
        )
    }
}