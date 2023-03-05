import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Loader() {
  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        <div>
          <div>
            <Image
              src="/loader.svg"
              alt="Zicket Loader"
              width={174}
              height={238}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
