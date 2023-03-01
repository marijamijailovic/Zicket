import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Loader() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div>
          <div className={styles.logoWarpper}>
            <Image
              className={styles.logo}
              src="/logoWithoutBlueBackground.svg"
              alt="Zicket Logo"
              width={25}
              height={34}
            />
          </div>
          <div>
          <div>
            <Image
              src="/loader.svg"
              alt="Zicket Loader"
              width={174}
              height={238}
            />
            <Image
              src="/loaderState2.svg"
              alt="Zicket Loader"
              width={174}
              height={238}
            />
          </div>
          </div>
        </div>
      </main>
    </div>
  );
}
