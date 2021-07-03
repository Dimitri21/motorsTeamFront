import { CssBaseline, ThemeProvider } from '@material-ui/core';
import Head from 'next/head';
import Header from '../components/Layout/Header/Header';
import Footer from '../components/Layout/Footer/Footer';
import '../styles/globals.scss';

import { createMuiTheme } from '@material-ui/core/styles';
import { red, green } from '@material-ui/core/colors';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: red[900],
		},
		secondary: {
			main: green[500],
		},
	},
});

function MyApp({ Component, pageProps }) {
	
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Head>
				<title>MotorsTeam</title>
				<meta name="description" content="Réseau privé de vente de véhicules entre professionnel" />
			</Head>

			<Header />
				<Component {...pageProps} />
			<Footer />
		</ThemeProvider>
	);
}

export default MyApp;
