import {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";

import {
    Box,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    CircularProgress,
    IconButton,
} from "@mui/material";

import {
    Folder,
    FileOpen,
    Delete,
    Edit,
} from "@mui/icons-material";

import Axios from "axios";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

const HomePage = () => {
    const history = useHistory();

    const [forms, setForms] = useState('');

    const deleteForm = (form_id) => {
        Axios.delete(`${baseUrl}/api/form/delete/${form_id}`)
            .then((result) => history.push("/"))
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        Axios.get(`${baseUrl}/api/form/all`)
            .then((result) => setForms(result.data))
            .catch((error) => console.log(error));
    }, []);

    return (
        <Box>
            {
                forms !== ''
                    ?
                    <List>
                        {
                            forms.map((form) => (
                                <ListItem
                                    key={form}
                                    secondaryAction={
                                        <Box>
                                            <IconButton onClick={() => deleteForm(form._id)}>
                                                <Delete color="error" />
                                            </IconButton>
                                            &nbsp;
                                            <IconButton onClick={() => history.push(`/show/${form._id}`)}>
                                                <FileOpen color="info" />
                                            </IconButton>
                                            &nbsp;
                                            <IconButton onClick={() => history.push(`/form/${form._id}`)}>
                                                <Edit color="warning" />
                                            </IconButton>
                                        </Box>
                                    }
                                    
                                >
                                    <ListItemIcon>
                                        <Folder color="primary" fontSize="large" />
                                    </ListItemIcon>
                                    <ListItemText primary={form.view} />
                                </ListItem>
                            ))
                        }
                    </List>
                    :
                    <Box
                        sx={{
                            m: 5,
                            textAlign: "center",
                        }}
                    >
                        <CircularProgress/>
                    </Box>
            }
        </Box>
    );
}

export default HomePage;