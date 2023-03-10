
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import Image from "next/image";
import { useContractEvent } from "wagmi";
import { qrProofOfPurchasingTicket } from "../utils/qrProofOfPurchasingTicket";
import Payment from "../components/payment";
import styles from "@/styles/Home.module.css";
import verificationStyles from "@/styles/verificationStyles.module.css";
import ZicketABI from "../abi/zicket.abi.json";

export default function Verification() {
  const [verified, setVerified] = useState(false);
  const [isScaned, setIsScaned] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showError, setShowError] = useState(false);

  const contractAddr = "0x13E3a97607c820d44f51931C0550D9a432Ca22ED";
  
  useEffect(() => {
    if(isScaned) {
      if(verified) {
        setShowError(false);
        setShowPayment(true);
      } else {
        setShowError(true);
        setShowPayment(false);
      }
    } else {
      setShowError(false);
      setShowPayment(false);
    }
  },[isScaned, verified]);

  useContractEvent(
    {
      address: contractAddr,
      abi: ZicketABI,
      eventName: 'Verified',
      listener(node, label, owner) {
        console.log("Verified event emitted");
        console.log(node, label, owner);
        setVerified(true);
        setIsScaned(true);
      },
      chainId: 80001,
    },
  );
  
  if(true) {
    return <Payment />
  }

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
          <div className={verificationStyles.titleWrapper}>
            <p className={verificationStyles.title}>
              Scan QR code with Zicket ID Wallet
            </p>
            <p className={verificationStyles.infoText}>to prove you are eligable to purchase ticket</p>
          </div>
          <div className={verificationStyles.qrCode}>
            <QRCode
              level="Q"
              style={{ width: 256 }}
              value={JSON.stringify(qrProofOfPurchasingTicket)}
            />
          </div>
          <div className={verificationStyles.proof}>
            <p className={verificationStyles.infoText}>and generate proof</p>
          </div>
          {showError && 
            <div>
              <p>Verification failed</p>
            </div>
          }
        </div>
      </main>
    </div>
  );
}
