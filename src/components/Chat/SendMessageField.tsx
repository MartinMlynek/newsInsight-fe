import { IconButton, Stack } from '@mui/material';
import { FC, FormEventHandler, KeyboardEvent, memo } from 'react';
import { TextArea } from '../forms/TextArea';
import { ChatFormValues } from './form/chat-form-values';
import { Control } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

interface Props {
	control: Control<ChatFormValues>;
	loading: boolean;
	handleOnKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
	clearMessages: () => void;
	handleSubmit: FormEventHandler<HTMLFormElement>;
}

const SendMessageFieldBase: FC<Props> = ({
	control,
	loading,
	handleOnKeyDown,
	clearMessages,
	handleSubmit
}) => {
	return (
		<Stack
			onSubmit={handleSubmit}
			component="form"
			sx={{
				borderTop: 4,
				p: 2,
				width: '100%',
				flexShrink: 1,
				borderColor: 'background.default'
			}}
			direction="row"
			alignItems="center"
			gap={2}
		>
			<IconButton onClick={clearMessages}>
				<DeleteIcon sx={{ color: 'primary.main' }} />
			</IconButton>
			<TextArea
				control={control}
				label=""
				name="question"
				onKeyDown={handleOnKeyDown}
				textFieldProps={{
					placeholder: 'Vložte otázku...',
					minRows: 1,
					maxRows: 3,
					disabled: loading
				}}
			/>
			<IconButton type="submit">
				<SendIcon sx={{ color: 'primary.main' }} />
			</IconButton>
		</Stack>
	);
};

export const SendMessageField = memo(SendMessageFieldBase);
