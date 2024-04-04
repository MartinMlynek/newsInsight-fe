import { FormControl, TextField, TextFieldProps } from '@mui/material';
import { KeyboardEvent, memo } from 'react';
import {
	Control,
	Controller,
	FieldError,
	FieldValues,
	Path
} from 'react-hook-form';

type Props<T extends FieldValues> = {
	label: string;
	name: Path<T>;
	error?: FieldError;
	control: Control<T>;
	required?: boolean;
	textFieldProps?: TextFieldProps;
	onKeyDown?: (event: KeyboardEvent<HTMLDivElement>) => void;
};

const TextAreaBase = <T extends FieldValues>({
	label,
	control,
	name,
	required,
	error,
	textFieldProps,
	onKeyDown
}: Props<T>) => {
	return (
		<FormControl
			fullWidth
			required={required}
			error={error !== undefined}
		>
			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<>
						<TextField
							{...field}
							helperText={error?.message}
							error={error !== undefined}
							label={label}
							required={required}
							multiline
							variant="outlined"
							onKeyDown={onKeyDown}
							{...textFieldProps}
						/>
					</>
				)}
			/>
		</FormControl>
	);
};

export const TextArea = memo(TextAreaBase) as typeof TextAreaBase;
