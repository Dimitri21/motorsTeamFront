import { Container, Grid, Card } from "@material-ui/core";
import { useRouter } from "next/router";
import CheckoutPage from "../../components/CheckoutPage/CheckoutPage";
import styles from "./Checkout.module.scss";

export default function AddVehicle() {
  return (
		<main className={`main`}>
			<Container className={styles.main}>
				<Grid container direction="column" justify="center" alignItems="center" spacing={3}>
					<Card className={styles.card}>
						<h1>Ajouter un véhicule</h1>
						<CheckoutPage />
					</Card>
				</Grid>
			</Container>
		</main>
  );
}
