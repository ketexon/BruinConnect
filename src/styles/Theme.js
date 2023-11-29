import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export default responsiveFontSizes(createTheme({
	palette: {
		mode: 'dark',
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