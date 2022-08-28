import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";

import {
    Box,
    Grid,
    Typography,
    Card,
    CardHeader,
    CardContent,
    Divider,
    Button,
    IconButton,
    CircularProgress,
    Avatar,
} from "@mui/material";

import {
    Delete,
} from "@mui/icons-material";

import Axios from "axios";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

const FormPage = () => {
    const {form_id} = useParams();

    const [form, setForm] = useState('');
    const [fields, setFields] = useState('');

    const deleteField = (field_id) => {
        Axios.delete(`${baseUrl}/api/field/delete/${field_id}`)
            .then((result) => {
            })
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        Axios.get(`${baseUrl}/api/form/get/${form_id}`)
            .then((result) => {
                setForm(result.data.form);
                setFields(result.data.fields);
            })
            .catch((error) => console.log(error));
    }, []);


    return (
        <Box>
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
                            <Grid key={field} md={4} sm={6} xs={6} item>
                                <Card variant="outlined">
                                    <CardHeader
                                        title={field.view}
                                        subheader={field.name}
                                        avatar={
                                            <Avatar
                                                sx={{bgcolor: "primary.main"}}>{field.type[0].toUpperCase()}
                                            </Avatar>
                                        }
                                        action={
                                            <IconButton onClick={() => deleteField(field._id)}>
                                                <Delete color="error"/>
                                            </IconButton>
                                        }
                                        sx={{borderBottom: "solid 1px", borderBottomColor: "divider"}}
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
                                </Card>
                            </Grid>
                        ))
                }
            </Grid>
        </Box>
    );
}

export default FormPage;