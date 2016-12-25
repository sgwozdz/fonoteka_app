import * as React from 'react';
import {NavAppBar} from './navigation/NavAppBar';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
const Styles = () => getMuiTheme(darkBaseTheme);

export class Layout extends React.Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={Styles()}>
                <div>
                    <NavAppBar/>
                    <main id="page-wrap" className='container'>
                        <div className='row'>
                            <div className='col-sm-12'>
                                {this.props.body}
                            </div>
                        </div>
                    </main>
                </div>
            </MuiThemeProvider>
        )
    }
}