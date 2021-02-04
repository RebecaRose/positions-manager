import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import routes from './routes';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#2d8e81',
        },
        secondary: {
            main: '#09504a',
        },
    }
});

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
        
        <Router>
            <Switch>
                {routes.map((route, i) => {
                    return <Route key={i} exact path={route.path} component={route.component} /> 
                })}
                <Route path={routes[0].path} component={routes[0].component} />
            </Switch>
        </Router>

    </MuiThemeProvider>
            
  );
}

export default App;
