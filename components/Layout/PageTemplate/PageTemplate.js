import { CssBaseline, ThemeProvider } from '@material-ui/core';
import styles from './PageTemplate.module.scss';
import Head from 'next/head';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { theme } from './theme';

export default function PageTemplate({ children, className, metaDescription }) {
	return (
		<>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Head>
					<title>MotorsTeam</title>
					<meta name="description" content={metaDescription} />
					<link rel="icon" href="/favicon.ico" />
					<link rel="preconnect" href="https://fonts.gstatic.com" />

					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
					/>
					<link
						href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600&display=swap"
						rel="stylesheet"
					/>
				</Head>

				<Header />
				<main className={`${styles.main} ${className} `}>{children}</main>
				<Footer />
			</ThemeProvider>
		</>
	);
}
