import * as React from 'react';
import cookie from 'react-cookie';
import {NavAppBar} from './navigation/NavAppBar';
import {RaisedButton, Dialog} from 'material-ui';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
var injectTapEventPlugin = require("react-tap-event-plugin");

const Styles = () => getMuiTheme(darkBaseTheme);
injectTapEventPlugin();

export class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
            dialogTitle: '',
            dialogText: '',
            logged: cookie.load('userId') ? true : false
        };
        this.handleClose = this.handleClose.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        var dialog = nextProps.params.dialog;
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
                    title = 'Dodałeś news!';
                    text = 'Dziękujemy! Tylko wspólnymi siłami możemy stworzyć coś wspaniałego. :)';
                    break;
                case '4':
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
        else{
            this.setState({
                logged: cookie.load('userId') ? true : false
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
                primary={true}
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