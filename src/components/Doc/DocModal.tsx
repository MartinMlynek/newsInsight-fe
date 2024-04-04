import {
	Box,
	Button,
	Modal,
	Stack,
	Typography,
	IconButton,
	Grid,
	Link
} from '@mui/material';
import { FC, memo, useCallback, useState } from 'react';
import { Doc } from '../../types/Doc';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import moment from 'moment';

interface Props {
	docs: Array<Doc>;
}

const style = {
	position: 'absolute' as const,
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	bgcolor: 'background.paper',
	border: '2px solid background.default',
	boxShadow: 24,
	width: '60%',
	p: 4
};

const DocModalBase: FC<Props> = ({ docs }) => {
	const [open, setOpen] = useState(false);
	const handleOpen = useCallback(() => setOpen(true), []);
	const handleClose = useCallback(() => setOpen(false), []);

	const [page, setPage] = useState(0);

	const maxPage = docs.length;
	const minPage = 0;
	const isFull = docs.length > 0;

	const doc = isFull && page < maxPage ? docs[page] : undefined;

	const date = moment(doc?.metadata.date ?? '');

	const handleNextPage = useCallback(() => {
		setPage(page => {
			if (page < maxPage - 1) {
				return page + 1;
			}
			return page;
		});
	}, [maxPage]);

	const handlePrevPage = useCallback(() => {
		setPage(page => {
			if (page > minPage) {
				return page - 1;
			}
			return page;
		});
	}, [minPage]);

	return (
		<Stack>
			{isFull ? <Button onClick={handleOpen}>Zdroj</Button> : null}
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Grid container alignItems="center" rowSpacing={2}>
						<Grid item xs={8} alignItems="center">
							{doc ? (
								<Link variant="h6" href={doc.metadata.link}>
									{doc.metadata.news !== ''
										? doc.metadata.news
										: 'Neznámý zdroj'}
								</Link>
							) : null}
							<Typography sx={{ ml: 1 }} variant="caption">
								{date.isValid() ? date.format('DD. MM. YYYY') : 'Neznámé datum'}
							</Typography>
						</Grid>
						<Grid item xs={4}>
							<Stack direction="row" justifyContent="end">
								<IconButton onClick={handlePrevPage}>
									<ArrowLeft sx={{ color: 'primary.main', fontSize: 32 }} />
								</IconButton>
								<IconButton onClick={handleNextPage}>
									<ArrowRight sx={{ color: 'primary.main', fontSize: 32 }} />
								</IconButton>
							</Stack>
						</Grid>
						<Grid
							item
							xs={12}
							sx={{
								height: '70vh',
								overflowY: 'scroll'
							}}
						>
							{doc?.page_content}
						</Grid>
					</Grid>
				</Box>
			</Modal>
		</Stack>
	);
};

export const DocModal = memo(DocModalBase);
