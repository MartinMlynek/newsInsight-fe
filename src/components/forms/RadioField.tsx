import {
	FormControl,
	FormControlLabelProps,
	FormHelperText,
	FormLabel,
	ToggleButton,
	ToggleButtonGroup,
	ToggleButtonGroupProps,
	ToggleButtonProps
} from '@mui/material';
import { memo } from 'react';
import {
	Control,
	Controller,
	FieldError,
	FieldValues,
	Path
} from 'react-hook-form';

type Item = {
	label: FormControlLabelProps['label'];
	value: ToggleButtonProps['value'];
};

type Props<T extends Item, U extends FieldValues> = {
	name: Path<U>;
	label: string;
	items: Array<T>;
	error?: FieldError;
	radioGroupProps?: ToggleButtonGroupProps;
	required?: boolean;
	control: Control<U>;
};

const RadioFieldBase = <T extends Item, U extends FieldValues>({
	name,
	control,
	items,
	error,
	label,
	required,
	radioGroupProps
}: Props<T, U>): JSX.Element => {
	return (
		<>
			<FormControl
				sx={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}
				required={required}
				error={error !== undefined}
			>
				<FormLabel id={`radios-${name}`}>{label}</FormLabel>
				<Controller
					render={({ field }) => (
						<ToggleButtonGroup
							color="primary"
							aria-labelledby={`radios-${name}`}
							exclusive
							{...field}
							{...radioGroupProps}
						>
							{items.map((item, i) => (
								<ToggleButton
									sx={{ fontSize: 12 }}
									key={`radio-${name}-${i}`}
									value={item.value}
								>
									{item.label}
								</ToggleButton>
							))}
						</ToggleButtonGroup>
					)}
					name={name}
					control={control}
				/>
				<FormHelperText>{error?.message}</FormHelperText>
			</FormControl>
		</>
	);
};

export const RadioField = memo(RadioFieldBase) as typeof RadioFieldBase;
