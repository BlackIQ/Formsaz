import {useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import {useHistory, useParams} from "react-router-dom";

import {
    Box,
    Grid,
    Typography,
    Divider,
    Button,
    CircularProgress,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    Paper,
} from "@mui/material";

import Axios from "axios";
import CreateField from "../components/field_creator";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

const ShowPage = () => {
    const history = useHistory();
    const {form_id} = useParams();

    // eslint-disable-next-line
    const {register, handleSubmit, watch, formState: {errors}} = useForm();

    const submit = (data) => {
        const sendData = {
            data,
            form_id,
        };

        const dev = true;

        Axios.post(`${baseUrl}/api/data/insert`, sendData)
            .then((result) => dev ? console.log(result.data) : history.go(0))
            .catch((error) => console.log(error));
    }

    // eslint-disable-next-line
    const [form, setForm] = useState('');
    const [fields, setFields] = useState('');

    const [dataMongo, setDataMongo] = useState('');

    useEffect(() => {
        Axios.get(`${baseUrl}/api/form/get/${form_id}`)
            .then((result) => {
                const { form, fields } = result.data;

                setForm(form);
                setFields(fields);
            })
            .catch((error) => console.log(error));

        Axios.post(`${baseUrl}/api/data/init`, { form_id })
            .then((result) => {
                console.log(result.data);
            })
            .catch((error) => console.log(error));

        Axios.get(`${baseUrl}/api/data/read/${form_id}`)
            .then((result) => {
                setDataMongo(result.data);
            })
            .catch((error) => console.log(error));
    }, [form_id]);

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
                        <Grid key={field._id} md={3} xs={6} sm={6} item>
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
            {
                dataMongo !== ''
                ?
                <TableContainer component={Paper} variant="outlined" sx={{ borderColor: "primary.main" }}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>Row</TableCell>
                                {
                                    fields.map((field) => (
                                        <TableCell key={field._id} sx={{ fontWeight: "bold", color: "primary.main" }}>{ field.view }</TableCell>
                                    ))
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                dataMongo.map((data, index) => (
                                    <TableRow
                                        key={data._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {index + 1}
                                        </TableCell>
                                        {
                                            fields.map((field) => (
                                                <TableCell key={field._id}>{data[field.name]}</TableCell>
                                            ))
                                        }
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
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
        </Box>
    );
}

export default ShowPage;