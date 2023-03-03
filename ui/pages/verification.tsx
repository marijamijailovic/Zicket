
import { useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import verificationStyles from "@/styles/verificationStyles.module.css";
import QRCode from "react-qr-code";
import Image from "next/image";
import { useContractEvent } from "wagmi";
import CredentialVerifierABI from "../abi/credentialVerifier.abi.json";
import { qrProofOfPurchasingTicket } from "../utils/qrProofOfPurchasingTicket";
import Payment from "../components/payment";
import Loading from "@/components/loading";

export default function Verification() {
  const [verified, setVerified] = useState(false);
  const [isScaned, setIsScaned] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showError, setShowError] = useState(false);

  const contractAddr = "0x8ef117ebc10B6649aB3f9F2Db8b1d9EFC8be5E5B";
  
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
      abi: CredentialVerifierABI,
      eventName: 'Verified',
      listener(node, label, owner) {
        console.log("AAAAAA Verified");
        console.log(node, label, owner);
        setVerified(true);
        setIsScaned(true);
        //label not empty check, and then we can go to payment and label.transactionHash =0x213dd85f1d78ccda4431e508221087e1fa3012f880c6c8f07b9f4f2d2d3df940
      },
      chainId: 80001,
    },
  );

  useContractEvent(
    {
      address: contractAddr,
      abi: CredentialVerifierABI,
      eventName: 'SubmitedRequest',
      listener(node, label, owner) {
        console.log("AAAAAA SubmitedRequest");
        console.log(node, label, owner);
        setVerified(true);
        setIsScaned(true);
      },
      chainId: 80001,
    },
  );

  useContractEvent(
    {
      address: contractAddr,
      abi: CredentialVerifierABI,
      eventName: 'NotVerified',
      listener(node, label, owner) {
        console.log("AAAAAA Not Verified");
        console.log(node, label, owner);
        setVerified(false);
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
        {isScaned && <Loading />}
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
