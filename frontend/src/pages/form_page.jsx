import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";

import {
    Box,
    Typography,
    Toolbar,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Divider,
    Button,
    FormControlLabel,
    Checkbox,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
} from "@mui/material";

import Axios from "axios";

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

const FormPage = () => {
    const {form_id} = useParams();

    const [addFieldDialogOpen, setAddFieldDialogOpen] = useState(false);

    const [viewName, setViewName] = useState('');
    const [databaseName, setDatabaseName] = useState('');
    const [defValue, setDefValue] = useState('');
    const [datatype, setDatatype] = useState('string');
    const [isRequired, setIsRequired] = useState(false);
    const [isUnique, setIsUnique] = useState(false);

    const [form, setForm] = useState('');
    const [fields, setFields] = useState('');

    const addField = () => {
        const sendData = {
            view: viewName,
            name: databaseName,
            type: datatype,
            required: isRequired,
            unique: isUnique,
            default: defValue,
            form: form_id,
        };

        Axios.post("http://localhost:8000/api/field/create", sendData)
            .then((result) => {
                console.log(result.data);
            })
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        Axios.get(`http://localhost:8000/api/form/get/${form_id}`)
            .then((result) => {
                setForm(result.data.form);
                setFields(result.data.fields);
            })
            .catch((error) => console.log(error));
    }, [form]);

    return (
        <Box>
            <Toolbar>
                <Typography
                    variant="h4"
                    color="primary"
                    sx={{
                        flexGrow: 1,
                    }}
                    gutterBottom
                >
                    {form.view} ( {form.name} )
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setAddFieldDialogOpen(true)}
                    disableElevation
                >
                    Add a new field
                </Button>
            </Toolbar>
            <Divider sx={{borderColor: "primary.main"}}/>

            <Dialog
                open={addFieldDialogOpen}
                onClose={() => setAddFieldDialogOpen(false)}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle>
                    <Typography variant="h6" color="primary.main">Add new field</Typography>
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
                                        Key={datat}
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
                        label="Item name"
                        placeholder="Enter the name that is going to be stored in database"
                        value={databaseName}
                        onChange={(e) => setDatabaseName(e.target.value)}
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
                        color="primary"
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

export default FormPage;