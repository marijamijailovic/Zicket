import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Zicket.module.css'
import Link from 'next/link'
import QRCode from 'react-qr-code'

export default function Prerequest() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.description}>
          <Image
            className={styles.logo}
            src="/blue_logo_new.svg"
            alt="Zicket Logo"
            width={118}
            height={118}
            priority
          />
          <div className={styles.contentInfo}>
            <p className={styles.infoText}>
              In order to insure that you have all to start with the process of buying ticket, <br /> 
              first scan the bellow QR code with your Android phone to download the Zicket ID Wallet 
            </p>
            <p className={styles.noteText}>
              You need to allow installing apps from the unknown source
            </p>
            <QRCode
              level="Q"
              style={{ width: 256 }}
              value="https://gateway.pinata.cloud/ipfs/QmZV8wVm9XWWSfFUbHsswyZJwkBi5qfwbQrLX16KPXy1iY/"
            />
          </div>
          <div>
            <Link href="/verification">
              <button className={styles.button}>
                Let{"'"}s start your verification
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
