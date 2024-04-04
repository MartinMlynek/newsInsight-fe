import { CircularProgress, Stack, Typography } from '@mui/material';
import { FC, RefObject, memo } from 'react';
import { MessageWithDocs } from '../../types/MessageWithDocs';
import { Message } from './Message';

interface Props {
	messageBoxRef: RefObject<HTMLDivElement>;
	messages: Array<MessageWithDocs>;
	loading: boolean;
	active: boolean;
}

const MessagesBase: FC<Props> = ({
	messageBoxRef,
	active,
	loading,
	messages
}) => {
	return (
		<Stack
			ref={messageBoxRef}
			flexShrink={1}
			flexGrow={1}
			spacing={1}
			gap={1}
			sx={{
				width: '100%',
				p: 1,
				overflow: 'scroll',
				backgroundColor: 'contentBackground.main',
				color: 'text.primary'
			}}
		>
			{active ? (
				messages.map((m, i) => {
					return (
						<Message
							key={i}
							by={m.message.author}
							message={m.message.content}
							docs={m.docs}
							error={m.message.error}
						/>
					);
				})
			) : (
				<Typography variant="h6">Žádné zprávy</Typography>
			)}
			{loading ? (
				<CircularProgress
					sx={{
						alignSelf: 'center'
					}}
					size={20}
				/>
			) : null}
		</Stack>
	);
};

export const Messages = memo(MessagesBase);
