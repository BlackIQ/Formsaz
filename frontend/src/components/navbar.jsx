import { useState } from "react";

import { useHistory, useLocation } from "react-router-dom";

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
    FormControlLabel,
    Checkbox,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
} from "@mui/material";

import Axios from "axios";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

const datatypes = [
    {
        title: "String",
        value: "string",
    },
    {
        title: "Number",
        value: "number",
    },
    {
        title: "Boolean",
        value: "boolean",
    }
];

const Navbar = () => {
    const history = useHistory();
    const location = useLocation();

    const splitedLocation = location.pathname.split('/');
    const form_id = splitedLocation.at(-1);

    const [addFormDialogOpen, setAddFormDialogOpen] = useState(false);
    const [fieldDialog, setFieldDialog] = useState(false);

    const [viewName, setViewName] = useState('');
    const [defValue, setDefValue] = useState('');
    const [datatype, setDatatype] = useState('string');
    const [isRequired, setIsRequired] = useState(false);
    const [isUnique, setIsUnique] = useState(false);

    const addField = () => {
        const sendData = {
            view: viewName.charAt(0).toLocaleUpperCase() + viewName.slice(1),
            name: viewName.toLowerCase() + '_item',
            type: datatype,
            required: isRequired,
            unique: isUnique,
            default: defValue,
            form: form_id,
        };

        Axios.post(`${baseUrl}/api/field/create`, sendData)
            .then((result) => history.go(0))
            .catch((error) => console.log(error));
    }

    const [formViewName, setFormViewName] = useState('');

    const createForm = () => {
        const sendData = {
            view: formViewName.charAt(0).toLocaleUpperCase() + formViewName.slice(1),
            name: formViewName.toLowerCase() + '_db',
        };

        Axios.post(`${baseUrl}/api/form/create`, sendData)
            .then((result) => history.push(`/form/${form_id}`))
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
                        {
                            splitedLocation.at(-2) === "form"
                            &&
                            <Button
                                variant="text"
                                color="inherit"
                                onClick={() => setFieldDialog(true)}
                            >
                                Add a new field
                            </Button>
                        }
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
                <DialogTitle sx={{ color: "primary.main" }}>
                    Create a new form
                </DialogTitle>
                <DialogContent>
                    <TextField
                        variant="standard"
                        color="primary"
                        label="Name"
                        placeholder="Enter the form name"
                        value={formViewName}
                        onChange={(e) => setFormViewName(e.target.value)}
                        margin="dense"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => createForm()}
                        disableElevation
                    >
                        Create form
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={fieldDialog}
                onClose={() => setFieldDialog(false)}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle sx={{ color: "primary.main" }}>
                    Add a new field
                </DialogTitle>
                <DialogContent>
                    <br/>
                    <FormControl fullWidth>
                        <InputLabel>Data Type</InputLabel>
                        <Select
                            variant="standard"
                            label="Data type"
                            value={datatype}
                            onChange={(e) => setDatatype(e.target.value)}
                        >
                            {
                                datatypes.map((datat) => (
                                    <MenuItem
                                        key={datat}
                                        value={datat.value}
                                    >
                                        {datat.title}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                    <TextField
                        variant="standard"
                        color="primary"
                        label="Field name"
                        placeholder="Enter the name that is going to call it"
                        value={viewName}
                        onChange={(e) => setViewName(e.target.value)}
                        margin="dense"
                        fullWidth
                    />
                    <TextField
                        variant="standard"
                        color="primary"
                        label="Default value"
                        placeholder="Enter the default value of the item"
                        value={defValue}
                        onChange={(e) => setDefValue(e.target.value)}
                        margin="dense"
                        fullWidth
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                value={isRequired}
                                onChange={() => setIsRequired(!isRequired)}
                            />
                        }
                        label="Required"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                value={isUnique}
                                onChange={() => setIsUnique(!isUnique)}
                            />
                        }
                        label="Unique"
                    />
                </DialogContent>
                <DialogActions sx={{p: 3}}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => addField()}
                        disableElevation
                    >
                        Create field
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default Navbar;