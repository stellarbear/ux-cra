import React from "react";
import { TextField, InputAdornment, IconButton, makeStyles, Theme, createStyles } from "@material-ui/core";
import { BaseTextFieldProps } from "@material-ui/core/TextField";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        field: {
            transition: "width 0.25s",
            textAlign: "center",
            maxWidth: 128,
            minWidth: 96,
        },
    })
);


interface INumberFieldProps extends BaseTextFieldProps {
    rtl?: boolean;
    value: number | null;
    adornment?: JSX.Element | null;
    onChangeEvent: ((value: number | null) => void);
}

const NumberField = ({
    value,
    rtl = false,
    disabled = false,
    adornment = null,
    onChangeEvent,
    ...rest
}: INumberFieldProps): JSX.Element => {
    const classes = useStyles();

    const onNumberChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        onChangeEvent(value == "" ? null : parseFloat(value));
    }

    const onKeyDown = ({ keyCode, preventDefault }: React.KeyboardEvent<HTMLDivElement>) => {
        const E = 69;
        const EQUAL = 187;
        const DASH = 189;
        if ([E, EQUAL, DASH].includes(keyCode)) {
            preventDefault();
        }
    }

    const overrideValue = value == null ? "" : `${value}`;
    return (
        <TextField
            {...rest}
            type="number"
            variant="filled"
            autoComplete="off"
            disabled={disabled}
            value={overrideValue}
            className={classes.field}
            style={{ width: (64 + overrideValue.length * 8), }}
            onKeyDown={onKeyDown}
            onChange={onNumberChange}

            inputProps={{
                style: {
                    padding: 10
                }
            }}
        />
    );
}

export default NumberField;