import {useState, useEffect} from "react";
import {useParams, useHistory} from "react-router-dom";

import {
    Box,
    Grid,
    Typography,
    Toolbar,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Card,
    CardHeader,
    CardContent,
    Divider,
    Button,
    FormControlLabel,
    Checkbox,
    InputLabel,
    Menu,
    MenuItem,
    FormControl,
    Select,
    IconButton,
    CircularProgress,
    Avatar,
    DialogContentText,
    CardActions,
} from "@mui/material";

import {
    Close,
    Delete,
    Edit,
    MoreVert,
} from "@mui/icons-material";

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
    const history = useHistory();
    const {form_id} = useParams();

    const [fieldDialog, setFieldDialog] = useState(false);
    const [deleteFormDialogOpen, setDeleteFormDialogOpen] = useState(false);

    const [updatingField, setUpdatingField] = useState('');
    const [updatingID, setUpdatingID] = useState('');

    const [actionMenu, setActionMenu] = useState(true);

    const [viewName, setViewName] = useState('');
    const [databaseName, setDatabaseName] = useState('');
    const [defValue, setDefValue] = useState('');
    const [datatype, setDatatype] = useState('string');
    const [isRequired, setIsRequired] = useState(false);
    const [isUnique, setIsUnique] = useState(false);

    const [form, setForm] = useState('');
    const [fields, setFields] = useState('');

    const readyToUpdate = (field) => {
        setViewName(field.view);
        setDatabaseName(field.name);
        setDefValue(field.default);
        setDatatype(field.type);
        setIsRequired(field.required);
        setIsUnique(field.unique);

        setUpdatingID(field._id);
        setUpdatingField(true);
        setFieldDialog(true);
    }

    const closeFieldDialog = () => {
        setViewName('');
        setDatabaseName('');
        setDefValue('');
        setDatatype('string');
        setIsRequired(false);
        setIsUnique(false);

        setUpdatingField(false);
        setFieldDialog(false);
    }

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
                setViewName('');
                setDatabaseName('');
                setDefValue('');
                setDatatype('string');
                setIsRequired(false);
                setIsUnique(false);

                setFieldDialog(false);
            })
            .catch((error) => console.log(error));
    }

    const deleteForm = () => {
        Axios.delete(`http://localhost:8000/api/form/delete/${form_id}`)
            .then((result) => history.push("/"))
            .catch((error) => console.log(error));
    }

    const updateField = () => {
        const updateData = {
            field_id: updatingID,
            update_data: {
                view: viewName,
                name: databaseName,
                type: datatype,
                required: isRequired,
                unique: isUnique,
                default: defValue,
                form: form_id,
            },
        };

        Axios.put(`http://localhost:8000/api/field/update`, updateData)
            .then((result) => {
                setViewName('');
                setDatabaseName('');
                setDefValue('');
                setDatatype('string');
                setIsRequired(false);
                setIsUnique(false);

                setFieldDialog(false);
            })
            .catch((error) => console.log(error));
    }

    const deleteField = (field_id) => {
        Axios.delete(`http://localhost:8000/api/field/delete/${field_id}`)
            .then((result) => {
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
            <Box sx={{ display: 'flex' }}>
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
                    onClick={() => setFieldDialog(true)}
                    disableElevation
                >
                    Add a new field
                </Button>
                &nbsp;
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => setDeleteFormDialogOpen(true)}
                    disableElevation
                >
                    Delete form
                </Button>
            </Box>
            <br/>
            <Divider sx={{borderColor: "primary.main"}}/>
            <br/>
            <Grid
                spacing={3}
                container
            >
                {
                    fields === ''
                        ?
                        <Box
                            sx={{
                                textAlign: "center",
                                p: 5,
                            }}
                        >
                            <CircularProgress/>
                        </Box>
                        :
                        fields.map((field) => (
                            <Grid
                                Key={field}
                                md={4}
                                sm={6}
                                xs={6}
                                item
                            >
                                <Card
                                    variant="outlined"
                                >
                                    <CardHeader
                                        title={field.view}
                                        subheader={field.name}
                                        avatar={
                                            <Avatar
                                                sx={{bgcolor: "primary.main"}}>{field.type[0].toUpperCase()}</Avatar>
                                        }
                                        sx={{ borderBottom: "solid 1px", borderBottomColor: "divider" }}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom>
                                            {field.unique ? "✅" : "❌"}
                                            &nbsp;
                                            Unique
                                        </Typography>
                                        <Typography gutterBottom>
                                            {field.required ? "✅" : "❌"}
                                            &nbsp;
                                            Required
                                        </Typography>
                                    </CardContent>
                                    {
                                        actionMenu
                                        &&
                                        <CardActions sx={{ borderTop: "solid 1px", borderTopColor: "divider" }}>
                                            <IconButton onClick={() => deleteField(field._id)}>
                                                <Delete color="error"/>
                                            </IconButton>
                                            <IconButton onClick={() => readyToUpdate(field)}>
                                                <Edit color="info"/>
                                            </IconButton>
                                        </CardActions>
                                    }
                                </Card>
                            </Grid>
                        ))
                }
            </Grid>

            <Dialog
                open={fieldDialog}
                onClose={() => closeFieldDialog()}
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
                        onClick={() => updatingField ? updateField() : addField()}
                        disableElevation
                    >
                        { updatingField ? 'Update field' : 'Create field' }
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={deleteFormDialogOpen}
                onClose={() => setDeleteFormDialogOpen(false)}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle>
                    <Typography variant="h6" color="error.main">Sure to delete?</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>Are sure that you want to delete this form? There is no way to restore form
                        again.</DialogContentText>
                </DialogContent>
                <DialogActions sx={{p: 3}}>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => deleteForm()}
                        disableElevation
                    >
                        Delete form
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default FormPage;