import { Box, Stack, Typography } from '@mui/material';
import { FC, memo, useMemo } from 'react';
import { DocModal } from '../Doc/DocModal';
import { Doc } from '../../types/Doc';

type Props = {
	message: string;
	by: 'AI' | 'Human';
	docs?: Array<Doc>;
	error?: boolean;
};

const MessageBase: FC<Props> = ({ message, by, docs, error }) => {
	const isAiMessage = useMemo(() => by === 'AI', [by]);

	return (
		<Stack
			flexDirection="row"
			alignItems="center"
			justifyContent="center"
			gap={1}
			sx={{
				width: '100%',
				borderBottom: 2,
				borderBottomColor: 'background.default'
			}}
		>
			<Box
				sx={{
					position: 'relative',
					overflow: 'visible',
					textAlign: 'left',
					display: 'flex',
					flexDirection: 'column',
					p: 1,
					px: 2,
					alignItems: 'center',
					width: '100%'
				}}
			>
				<Typography
					sx={{
						wordBreak: 'break-word',
						mb: 0.5,
						color: 'primary.main',
						alignSelf: 'start'
					}}
					variant="body2"
					fontWeight="bold"
					component="p"
				>
					{by}
				</Typography>
				<Typography
					sx={{
						wordBreak: 'break-word',
						alignSelf: 'start',
						fontsize: 14,
						color: error ? 'red.main' : 'text.primary'
					}}
					variant="body1"
					component="p"
				>
					{message}
				</Typography>
				{isAiMessage && docs ? <DocModal docs={docs} /> : null}
			</Box>
		</Stack>
	);
};

export const Message = memo(MessageBase);
