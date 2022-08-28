import {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";

import {
    Box,
    List,
    ListItemButton,
    ListItemText,
    ListItemIcon, CircularProgress,
} from "@mui/material";

import {
    Folder,
} from "@mui/icons-material";

import Axios from "axios";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

const HomePage = () => {
    const history = useHistory();

    const [forms, setForms] = useState('');

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
                                <ListItemButton
                                    Key={form._id}
                                    onClick={() => history.push(`/form/${form._id}`)}
                                >
                                    <ListItemIcon>
                                        <Folder color="primary"/>
                                    </ListItemIcon>
                                    <ListItemText primary={form.view}/>
                                </ListItemButton>
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