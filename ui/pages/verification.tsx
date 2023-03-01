
import { useEffect, useState } from "react";
import styles from '@/styles/Home.module.css'
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
      address: "0x41AA5f08620f26fF6b83361aCf198b2C8c18b653",
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
      address: "0x41AA5f08620f26fF6b83361aCf198b2C8c18b653",
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
      address: `0x${process.env.REACT_APP_CONTRACT_ADDRESS}`,
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

  if(showPayment) {
    return <Payment />
  }

  return (
    <div>
      <main className={styles.main}>
        {isScaned && <Loading />}
        <div>
          <div>
            <Image
              src="/logoWithoutBlueBackground.svg"
              alt="Zicket Logo"
              width={25}
              height={34}
            />
          </div>
          <div>
          <p>
            Scan QR code with Zicket ID Wallet
          </p>
          <p>to prove you are eligable to purchase ticket</p>
          </div>
          <div>
            <QRCode
              level="Q"
              style={{ width: 256 }}
              value={JSON.stringify(qrProofOfPurchasingTicket)}
            />
          </div>
          <div>
            <p>and generate proof</p>
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
