import { useState } from "react";

import { useHistory } from "react-router-dom";

import {
    AppBar,
    Toolbar,
    Container,
    Box,
    Typography,
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";

import Axios from "axios";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

const Navbar = () => {
    const history = useHistory();

    const [addFormDialogOpen, setAddFormDialogOpen] = useState(false);

    const [viewName, setViewName] = useState('');
    const [databaseName, setDatabaseName] = useState('');

    const createForm = () => {
        const sendData = {
            view: viewName,
            name: databaseName,
        };

        Axios.post(`${baseUrl}/api/form/create`, sendData)
            .then((result) => {
                const form_id = result.data.form._id;

                setViewName('');
                setDatabaseName('');
                setAddFormDialogOpen(false);

                history.push(`/form/${form_id}`);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <Box>
            <AppBar elevation={0}>
                <Container>
                    <Toolbar>
                        <Typography
                            variant="h5"
                            onClick={() => history.push('/')}
                            sx={{
                                flexGrow: 1,
                                cursor: "pointer",
                            }}
                        >
                            FormSaz
                        </Typography>
                        <Button
                            variant="text"
                            color="inherit"
                            onClick={() => setAddFormDialogOpen(true)}
                        >
                            Create a new form
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>
            <Toolbar />

            <Dialog
                open={addFormDialogOpen}
                onClose={() => setAddFormDialogOpen(false)}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle>
                    <Typography variant="h6" color="primary.main">Add new form</Typography>
                </DialogTitle>
                <DialogContent>
                    <TextField
                        variant="standard"
                        color="primary"
                        label="View name"
                        placeholder="Enter the name that is going to show in panel"
                        value={viewName}
                        onChange={(e) => setViewName(e.target.value)}
                        margin="dense"
                        fullWidth
                    />
                    <TextField
                        variant="standard"
                        color="primary"
                        label="Database name"
                        placeholder="Enter the name that the form is going to be save in DB"
                        value={databaseName}
                        onChange={(e) => setDatabaseName(e.target.value)}
                        margin="dense"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => createForm()}
                        disableElevation
                    >
                        Create form
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default Navbar;