import {useState, useEffect} from "react";
import {useHistory, useParams} from "react-router-dom";

import {
    Box,
    Grid,
    Typography,
    Divider,
    CircularProgress,
} from "@mui/material";

import Axios from "axios";
import ShowFieldItem from "../components/show_field";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

const FormPage = () => {
    const history = useHistory();
    const {form_id} = useParams();

    const [form, setForm] = useState('');
    const [fields, setFields] = useState('');

    const deleteField = (field_id) => {
        Axios.delete(`${baseUrl}/api/field/delete/${field_id}`)
            .then((result) => history.go(0))
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        Axios.get(`${baseUrl}/api/form/get/${form_id}`)
            .then((result) => {
                setForm(result.data.form);
                setFields(result.data.fields);
            })
            .catch((error) => console.log(error));
    }, [form_id]);


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
                            <Grid key={field._id} md={4} sm={6} xs={6} item>
                                <ShowFieldItem field={field} FieldDelete={() => deleteField(field._id)} />
                            </Grid>
                        ))
                }
            </Grid>
        </Box>
    );
}

export default FormPage;