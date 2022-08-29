import {useState} from "react";

import {
    ThemeProvider,
    createTheme,
    CssBaseline,
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

const lc = localStorage;

function App() {
    const [mode, setMode] = useState(lc.getItem("theme"));

    const changeTheme = () => {
        lc.setItem("theme", mode === "light" ? "dark" : "light");
        setMode(mode === "light" ? "dark" : "light");
    }

    const theme = createTheme({
        palette: {
            mode,
            background: {
                default: mode === "dark" ? "#121212" : "#ffffff",
            },
            primary: {
                main: mode === "dark" ? "#bb86fc" : "#6200ee",
            },
            secondary: {
                main: mode === "dark" ? "#03dac6" : "#03dac6",
            }
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Navbar mode={mode} changeMode={changeTheme} />
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