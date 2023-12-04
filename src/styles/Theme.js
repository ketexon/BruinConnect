import { createTheme, responsiveFontSizes } from "@mui/material/styles";

import { pink, red, lightGreen } from '@mui/material/colors';

export default responsiveFontSizes(createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: red[600]
		},
		secondary: {
			main: pink[300],
		},
		success: {
			main: lightGreen[500]
		}
	},
	typography: {
		h1: {
			fontSize: "3rem",
			fontWeight: "bold",
		},
		h2: {
			fontSize: "2.5rem",
			fontWeight: "bold",
		},
		h3: {
			fontSize: "2rem",
			fontWeight: "bold",
		},
		h4: {
			fontSize: "1.5rem",
			fontWeight: "bold",
		},
		h5: {
			fontSize: "1.25rem",
			fontWeight: "bold",
		},
		h6: {
			fontSize: "1.25rem",
			fontWeight: "normal",
		},
	}
}));