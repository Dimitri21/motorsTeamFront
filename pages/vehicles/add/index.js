import { Container, Grid, Card } from "@material-ui/core";
import { useRouter } from "next/router";
import AddVehicleForm from "../../../components/vehicle/add/AddVehicleForm";
import styles from "./addVehicle.module.scss";

export default function AddVehicle() {
  return (
		<main className={`main`}>
			<Container className={styles.main}>
				<Grid container direction="column" justify="center" alignItems="center" spacing={3}>
					<Card className={styles.card}>
						<h1>Ajouter un véhicule</h1>
						<AddVehicleForm />
					</Card>
				</Grid>
			</Container>
		</main>
  );
}
