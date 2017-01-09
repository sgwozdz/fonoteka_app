import * as React from 'react';
import cookie from 'react-cookie';
import {NavAppBar} from './navigation/NavAppBar';
import {RaisedButton, Dialog} from 'material-ui';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const Styles = () => getMuiTheme(darkBaseTheme);

function getParameterByName(name, url) {
    if (!url) 
        url = window.location.href;

    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);

    if (!results) 
        return null;
    if (!results[2]) 
        return '';

    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
            dialogTitle: '',
            dialogText: '',
            logged: cookie.load('userId')
                ? true
                : false
        };
        this.handleClose = this.handleClose.bind(this);
    }
    componentDidMount(){
        var dialog = getParameterByName('dialog');
        window.history.pushState('', 'Start - Fonoteka', '/' );
        if (dialog) {
            var open = true;
            var title = '';
            var text = '';
            switch (dialog) {
                case '1':
                    title = 'Witamy! :)';
                    text = 'Twoje konto zostało utworzone. Zapraszamy do korzystania z serwisu.';
                    break;
                case '2':
                    title = 'Dodałeś album!';
                    text = 'Dziękujemy! Tylko wspólnymi siłami możemy stworzyć coś wspaniałego. :)';
                    break;
                case '3':
                    title = 'Cwaniaczku :)';
                    text = 'Korzystamy z super zabezpieczeń stworzonych przez najlepszych specjalistów, nie uda Ci się zhakować tej strony.';
                    break;
                default:
                    open = false;
                    break;
            }
            this.setState({
                dialogOpen: open,
                dialogTitle: title,
                dialogText: text
            })
        }
    }
   
    handleClose(){
        this.setState({dialogOpen: !this.state.dialogOpen});
    };

    render() {
         const actions = [
            <RaisedButton
                label="Ok"
                onTouchTap={this.handleClose}/>
        ];
        return (
            <MuiThemeProvider muiTheme={Styles()}>
                <div>
                    <Dialog
                        title={this.state.dialogTitle}
                        actions={actions}
                        modal={false}
                        open={this.state.dialogOpen}
                        onRequestClose={this.handleClose}>
                        {this.state.dialogText}
                    </Dialog>
                    <NavAppBar logged={this.state.logged}/>
                    <main id="page-wrap" className='container'>
                        {this.props.body}
                    </main>
                </div>
            </MuiThemeProvider>
        )
    }
}