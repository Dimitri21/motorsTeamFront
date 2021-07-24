import { Grid, Button, Container, AppBar, Toolbar } from "@material-ui/core";
import styles from "./Header.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import AuthContext from "../../../store/auth-context";

export default function Header(params) {
  const router = useRouter();
  const auth = useContext(AuthContext);

  const loginButtonClickHandler = () => {
    router.push("/login");
  };

  const logoutButtonClickHandler = () => {
    auth.logout();
    router.push('/')
  };

  
  return (
    <AppBar position="fixed" className={styles.header}>
      <Toolbar>
        <div className={styles.logo}>
          <Link href="/">MotorsTeam</Link>
        </div>

        <div className={styles.navLink}>
          {auth.isLoggedIn && (
            <div>
              <Link href="/vehicles/add">Ajouter un véhicule</Link>
              <Link href="/vehicles/search">Rechercher</Link>
              <Link href="/register">S'inscrire</Link>
            </div>
          )}

          {auth.isLoggedIn || (
            <Button
              variant="contained"
              color="primary"
              onClick={loginButtonClickHandler}
            >
              Connexion
            </Button>
          )}

          {auth.isLoggedIn && (
            <Button
              variant="contained"
              color="primary"
              onClick={logoutButtonClickHandler}
            >
              Déconnexion
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}
