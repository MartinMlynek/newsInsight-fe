import { Stack } from '@mui/material';
import { FC, KeyboardEvent, memo, useCallback, useEffect, useRef } from 'react';
import {
	Control,
	UseFormHandleSubmit,
	UseFormResetField
} from 'react-hook-form';
import { ChatFormValues } from './form/chat-form-values';
import { MessageWithDocs } from '../../types/MessageWithDocs';
import { SendMessageField } from './SendMessageField';
import { Messages } from './Messages';
interface Props {
	control: Control<ChatFormValues>;
	messages: Array<MessageWithDocs>;
	active: boolean;
	loading: boolean;
	sendMessage: (data: ChatFormValues) => void;
	resetField: UseFormResetField<ChatFormValues>;
	handleSubmit: UseFormHandleSubmit<ChatFormValues>;
	clearMessages: () => void;
}

const ChatBase: FC<Props> = ({
	control,
	handleSubmit,
	resetField,
	messages,
	active,
	loading,
	sendMessage,
	clearMessages
}) => {
	const messageBoxRef = useRef<HTMLDivElement>(null);

	const scrollToBottom = useCallback(() => {
		if (messageBoxRef) {
			messageBoxRef.current?.scrollTo(0, messageBoxRef.current?.scrollHeight);
		}
	}, [messageBoxRef]);

	const handleSendMessage = useCallback(
		(data: ChatFormValues) => {
			sendMessage(data);
			resetField('question');
		},
		[resetField, sendMessage]
	);

	const handleOnKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		if (
			messageBoxRef.current &&
			!(
				Math.abs(
					messageBoxRef.current.scrollHeight -
						messageBoxRef.current.scrollTop -
						messageBoxRef.current.clientHeight
				) < 1
			)
		) {
			scrollToBottom();
		}
		if (event.key === 'Enter') {
			event.preventDefault();
			handleSubmit(handleSendMessage)();
		}
	};

	useEffect(() => {
		scrollToBottom();
	}, [scrollToBottom, messages, messageBoxRef]);

	return (
		<Stack
			sx={{
				flexShrink: 1,
				overflow: 'hidden',
				height: '100%',
				backgroundColor: 'contentBackground.main',
				borderColor: 'background.default'
			}}
		>
			<Messages
				active={active}
				loading={loading}
				messageBoxRef={messageBoxRef}
				messages={messages}
			/>
			<SendMessageField
				loading={loading}
				control={control}
				clearMessages={clearMessages}
				handleOnKeyDown={handleOnKeyDown}
				handleSubmit={handleSubmit(handleSendMessage)}
			/>
		</Stack>
	);
};

export const Chat = memo(ChatBase);
