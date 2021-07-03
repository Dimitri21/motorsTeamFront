import styles from "./Footer.module.scss";
import Link from "next/link";

export default function Footer(params) {
  return (
    <footer className={styles.footer}>
      <Link href="/mentions-legales">Mentions légales</Link>
      <Link href="/confidentialite">Politique de confidentialité</Link>
      <Link href="/cgv">Conditions générales de vente</Link>
    </footer>
  );
}
