import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {useForm} from "react-hook-form";

const CreateField = (props) => {
    const field = props.field;
    const register = props.register;

    return (
        field.type === "string"
            ?
            <TextField
                variant="outlined"
                label={field.view}
                placeholder={field.default}
                {...register(field.name)}
                type="string"
                fullWidth
            />
            :
            field.type === "number"
                ?
                <TextField
                    variant="outlined"
                    label={field.view}
                    placeholder={field.default}
                    {...register(field.name)}
                    type="number"
                    fullWidth
                />
                :
                field.type === "boolean"
                    ?
                    <FormControl fullWidth>
                        <InputLabel>{field.view}</InputLabel>
                        <Select
                            variant="outlined"
                            placeholder={field.default}
                            label={field.view}
                            {...register(field.name)}
                        >
                            <MenuItem value="true">
                                True
                            </MenuItem>
                            <MenuItem value="false">
                                False
                            </MenuItem>
                        </Select>
                    </FormControl>
                    :
                    <TextField
                        variant="outlined"
                        label={field.view}
                        placeholder={field.default}
                        {...register(field.name)}
                        type="string"
                        fullWidth
                    />
    )
        ;
}

export default CreateField;