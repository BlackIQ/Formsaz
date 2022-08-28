import {
    Typography,
    Card,
    CardHeader,
    CardContent,
    IconButton,
    Avatar,
    Box,
} from "@mui/material";

import {
    Delete,
} from "@mui/icons-material";

const ShowFieldItem = (props) => {
    const {field, FieldDelete} = props;
    
    return (
        <Box>
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
                        <IconButton onClick={FieldDelete}>
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
        </Box>
    );
}

export default ShowFieldItem;