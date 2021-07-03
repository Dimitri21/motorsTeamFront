import Image from 'next/image';
import classes from '../styles/Home.module.scss';
import { Button, Grid } from '@material-ui/core';
import { Container } from '@material-ui/core';
import Lottie from 'react-lottie-player';

import lottieJson from '../components/Lottie/57643-cars.json';

export default function Home({ className }) {
	return (
		<main className={`main ${classes.home}`}>
			<Container>
				<Grid container direction="row" justify="center" alignItems="center" spacing={3}>
					<Grid item xs={12} sm={6}>
						<h1>Réseau privé de vente de véhicules entre professionnels</h1>
						<Button variant="contained" color="primary" size="large">
							Demandez votre adhésion
						</Button>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Grid container direction="row" justify="center" alignItems="center" spacing={3}>
							{/* <Image
                  src="/assets/img/Car_Monochromatic.png"
                  alt="Picture of the author"
                  width={500}
                  height={500}
                /> */}
							<Lottie loop animationData={lottieJson} play style={{ width: 550, height: 550 }} />
						</Grid>
					</Grid>
				</Grid>
			</Container>
		</main>
	);
}
