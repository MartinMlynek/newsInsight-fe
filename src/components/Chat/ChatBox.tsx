import { Card, Divider, Grid, Typography } from '@mui/material';
import { FC, memo, useCallback, useState } from 'react';
import { Chat } from './Chat';
import { Message } from '../../types/Message';
import { ChatFormValues, defaultChatFormValues } from './form/chat-form-values';
import { sendQuestion } from '../../api/Api';
import { MessageWithDocs } from '../../types/MessageWithDocs';
import { useForm } from 'react-hook-form';
import { RadioField } from '../forms/RadioField';

const toggleButtonItems = [
	{ label: 'den', value: 'd' },
	{ label: 'týden', value: 'w' },
	{ label: 'měsíc', value: 'm' },
	{ label: 'rok', value: 'y' },
	{ label: 'bez', value: 'none' }
];

const ChatBoxBase: FC = () => {
	const [messages, setMessages] = useState<Array<MessageWithDocs>>([]);

	const { control, handleSubmit, resetField } = useForm<ChatFormValues>({
		defaultValues: defaultChatFormValues
	});

	const clearMessages = useCallback(() => {
		setMessages([]);
	}, []);

	const [loading, setLoading] = useState(false);

	const sendMessage = useCallback(
		async (data: ChatFormValues) => {
			if (loading) return;
			const message: Message = { author: 'Human', content: data.question };
			setMessages(messages => [...messages, { message }]);
			setLoading(true);
			const response = await sendQuestion(data);
			if (response.status == 'SUCCESS') {
				setMessages(messages => [...messages, response.data]);
			} else {
				const errorMessage: Message = {
					author: 'AI',
					error: true,
					content: response.errorMessage
				};
				setMessages(messages => [...messages, { message: errorMessage }]);
			}
			setLoading(false);
		},
		[loading]
	);

	return (
		<Card
			sx={{
				width: '100%',
				borderColor: 'black',
				color: 'primary.main',
				backgroundColor: 'contentBackground.main'
			}}
		>
			<Grid container rowGap={2}>
				<Grid item xs={12}>
					<Typography sx={{ mt: 1 }} variant="h4" fontWeight="bold">
						NewsInsight
					</Typography>
				</Grid>
				<Grid item xs={12} justifyContent="center">
					<RadioField
						control={control}
						label="Rozsah zpráv:"
						name="time"
						items={toggleButtonItems}
					/>
				</Grid>
				<Grid
					item
					xs={12}
					sx={{
						height: '70vh',
						overflow: 'hidden',
						display: 'flex',
						flexDirection: 'column'
					}}
				>
					<Divider
						sx={{ borderBottomWidth: 4, borderColor: 'background.default' }}
					/>
					<Chat
						control={control}
						messages={messages}
						active={messages.length > 0}
						loading={loading}
						sendMessage={sendMessage}
						handleSubmit={handleSubmit}
						resetField={resetField}
						clearMessages={clearMessages}
					/>
				</Grid>
			</Grid>
		</Card>
	);
};

export const ChatBox = memo(ChatBoxBase);
