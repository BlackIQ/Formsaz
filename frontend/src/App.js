import {
    ThemeProvider,
    createTheme,
    CssBaseline,
    colors as Colors,
    Container,
} from "@mui/material";

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Navbar from "./components/navbar";

import HomePage from "./pages/home_page";
import FormPage from "./pages/form_page";
import ShowPage from "./pages/show_page";

function App() {
    const theme = createTheme({
        palette: {
            primary: {
                main: Colors.indigo[900],
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Navbar />
                <Container
                    sx={{
                        py: 2
                    }}
                >
                    <Switch>
                        <Route path="/" exact><HomePage /></Route>
                        <Route path="/form/:form_id" exact><FormPage /></Route>
                        <Route path="/show/:form_id" exact><ShowPage /></Route>
                    </Switch>
                </Container>
            </Router>
        </ThemeProvider>
    );
}

export default App;