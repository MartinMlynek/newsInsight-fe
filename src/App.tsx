import './App.css';
import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme';
import { ChatBox } from './components/Chat';
function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />

			<Container
				maxWidth="lg"
				component="main"
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					gap: 2
				}}
			>
				<ChatBox />
			</Container>
		</ThemeProvider>
	);
}

export default App;
