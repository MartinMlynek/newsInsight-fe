import { PaletteColorOptions, createTheme } from '@mui/material/styles';

export const theme = createTheme({
	shape: {
		borderRadius: 15
	},
	palette: {
		mode: 'light',
		primary: {
			main: '#3D3B8E',
			dark: '#8c0048',
			light: '#c5c4dd'
		},
		secondary: {
			main: '#3D3B8E',
			dark: '#1b2522'
		},
		red: {
			main: '#C14953',
			light: '#da9298'
		},
		background: {
			default: '#dedede'
		},
		contentBackground: {
			main: '#FFFFFF',
			dark: '#000000'
		}
	}
});

declare module '@mui/material/styles' {
	interface Palette {
		red: PaletteColorOptions;
		contentBackground: PaletteColorOptions;
	}
	interface PaletteOptions {
		red: PaletteColorOptions;
		contentBackground: PaletteColorOptions;
	}
}
