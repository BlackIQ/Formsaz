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

import Axios from "axios";

const ShowPage = () => {
    const history = useHistory();
    const {form_id} = useParams();

    const [form, setForm] = useState('');
    const [fields, setFields] = useState('');

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
            <Typography
                variant="h4"
                color="primary"
                gutterBottom
            >
                Insert data
            </Typography>
            <Grid
                spacing={3}
                container
            >
                {
                    fields !== ''
                    ?
                    fields.map((field) => (
                        <Grid
                            Key={field._id}
                            md={3}
                            xs={6}
                            sm={6}
                            item
                        >
                            <TextField
                                label={field.view}
                                placeholder={field.default}
                                fullWidth
                            />
                        </Grid>
                    ))
                    :
                    <Box
                        sx={{
                            textAlign: "center",
                            p: 5,
                        }}
                    >
                        <CircularProgress/>
                    </Box>
                }
            </Grid>
            <br />
            <Button
                variant="contained"
                color="primary"
                size="large"
                disableElevation
            >
                Insert
            </Button>
            <br/>
            <br/>
            <Divider sx={{borderColor: "primary.main"}}/>
            <br/>
            <Typography
                variant="h4"
                color="primary"
                gutterBottom
            >
                Show data
            </Typography>
        </Box>
    );
}

export default ShowPage;