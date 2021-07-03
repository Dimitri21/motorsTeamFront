import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	render() {
		return (
			<Html lang="fr">
				<Head>
					<link rel="icon" type="image/png" href="/images/favicon.png"></link>
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
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
