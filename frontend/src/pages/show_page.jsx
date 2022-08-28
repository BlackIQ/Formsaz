import {useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import {useParams} from "react-router-dom";

import {
    Box,
    Grid,
    Typography,
    Divider,
    Button,
    CircularProgress,
} from "@mui/material";

import Axios from "axios";
import CreateField from "../components/field_creator";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

const ShowPage = () => {
    const {form_id} = useParams();

    const {register, handleSubmit, watch, formState: {errors}} = useForm();

    const submit = (data) => {
        const sendData = {
            data,
            form_id,
        };

        Axios.post(`${baseUrl}/api/test/insert`, sendData)
            .then((result) => {
                console.log(result.data);
            })
            .catch((error) => console.log(error));
    }

    const test = () => {
        const data = {
            form_id,
        };

        Axios.post(`${baseUrl}/api/test/test`, data)
            .then((result) => {
                console.log(result.data);
            })
            .catch((error) => console.log(error));
    }

    const read = () => {
        Axios.get(`${baseUrl}/api/test/read/${form_id}`)
            .then((result) => {
                // setDataMongo(result.data);
                console.log(result.data);
            })
            .catch((error) => console.log(error));
    }

    const [form, setForm] = useState('');
    const [fields, setFields] = useState('');

    const [dataMongo, setDataMongo] = useState('');

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
                            <Grid Key={field._id} md={3} xs={6} sm={6} item>
                                <CreateField field={field} register={register}/>
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
            <br/>
            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleSubmit(submit)}
                disableElevation
            >
                Insert
            </Button>
            &nbsp;
            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => test()}
                disableElevation
            >
                Test Exist ion
            </Button>
            &nbsp;
            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => read()}
                disableElevation
            >
                Test Read
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