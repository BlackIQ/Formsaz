import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Box,
    Typography,
} from "@mui/material";

const CreateField = (props) => {
    const {field, register, errors} = props;

    switch (field.type) {
        case "number":
            return (
                <Box>
                    <TextField
                        variant="outlined"
                        label={field.view}
                        placeholder={field.default}
                        {...register(field.name)}
                        error={ errors[field.name] && true }
                        type="number"
                        fullWidth
                    />
                    {
                        errors[field.name]
                        &&
                        <Typography color="error" variant="body1" sx={{ mt: 1 }}>
                            { errors[field.name].error }
                        </Typography>
                    }
                </Box>
            );
        case "boolean":
            return (
                <Box>
                    <FormControl fullWidth>
                        <InputLabel>{field.view}</InputLabel>
                        <Select
                            variant="outlined"
                            placeholder={field.default}
                            label={field.view}
                            {...register(field.name)}
                            error={ errors[field.name] && true }
                        >
                            <MenuItem value="">
                                Select a value
                            </MenuItem>
                            <MenuItem value="true">
                                True
                            </MenuItem>
                            <MenuItem value="false">
                                False
                            </MenuItem>
                        </Select>
                    </FormControl>
                    {
                        errors[field.name]
                        &&
                        <Typography color="error" variant="body1" sx={{ mt: 1 }}>
                            { errors[field.name].error }
                        </Typography>
                    }
                </Box>
            );
        default:
            return (
                <Box>
                    <TextField
                        variant="outlined"
                        label={field.view}
                        placeholder={field.default}
                        {...register(field.name)}
                        error={ errors[field.name] && true }
                        type="string"
                        fullWidth
                    />
                    {
                        errors[field.name]
                        &&
                        <Typography color="error" variant="body1" sx={{ mt: 1 }}>
                            { errors[field.name].error }
                        </Typography>
                    }
                </Box>
            );
    }
}

export default CreateField;