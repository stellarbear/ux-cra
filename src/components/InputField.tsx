import React from "react";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import { BaseTextFieldProps } from "@material-ui/core/TextField";

interface IInputFieldProps extends BaseTextFieldProps {
	rtl?: boolean;
	maxWidth?: number
	adornment?: JSX.Element | null;
	onChangeEvent: ((value: string) => void);
}

const InputField = ({
	rtl = false,
	disabled = false,
	adornment = null,
	maxWidth = 140,
	onChangeEvent,
	...rest
}: IInputFieldProps): JSX.Element => {

	const onInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		const { value } = event.target;
		onChangeEvent(value);
	}

	return (
		<TextField
			{...rest}
			tabIndex={-1}
            style={{ width: (64 + (rest.value as string).length * 8), maxWidth }}
			type="text"
			variant="standard"
			autoComplete="off"
			onChange={onInputChange}
			InputProps={{
				inputProps: { tabIndex: -1 },
				endAdornment: adornment == null
					? null
					: (<InputAdornment position={rtl ? "start" : "end"}>
						{adornment}
					</InputAdornment>),
			}}
		/>
	);
}

export default InputField;