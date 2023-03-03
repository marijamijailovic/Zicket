import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import paymentStyles from "../styles/paymentStyles.module.css";
import { useAccount, useConnect, useContract, useContractWrite, useDisconnect } from "wagmi";
import WalletConnected from "./walletConnected";

export default function Payment() {
  const [paymentType, setPaymentType] = useState("");
  const [wallet, setWallet] = useState(false);
  const { address: connectedAddress, isConnected } = useAccount();
  const { connect, connectors, error, pendingConnector } = useConnect()
  const { disconnect } = useDisconnect();

  const handleOptionChange = (e: any) => {
    const value = e.target.value;
    setPaymentType(value);
    console.log(value);
  };

  useEffect(() => {
    if (paymentType === "crypto") { 
        setWallet(true);
    } else {
      setWallet(false);
    }
  }, [paymentType]);

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
          <div className={styles.mainContent}>
            <div className={paymentStyles.titleWrapper}>
              <p className={paymentStyles.title}>Verification successful!</p>
              <p className={paymentStyles.infoText}>
                Now you can buy your ticket
              </p>
            </div>
            <div className={paymentStyles.chooseOptionWrapper}>
              <p className={paymentStyles.chooseOption}>
                Choose payment option
              </p>
              <div className={paymentStyles.inputWrapper}>
                <div>
                  <label className={paymentStyles.label} htmlFor="crypto">
                    <input
                      type="radio"
                      id="crypto"
                      name="payment"
                      value="crypto"
                      onChange={(e) => handleOptionChange(e)}
                      className={paymentStyles.input}
                    />
                  Crypto
                  </label>
                  {wallet &&
                    <WalletConnected />
                  }  
                </div>
                <div>
                  <label className={paymentStyles.label} htmlFor="fiat">
                    <input
                      type="radio"
                      id="fiat"
                      name="payment"
                      value="fiat"
                      onChange={(e) => handleOptionChange(e)}
                      className={paymentStyles.input}
                    />
                    Fiat
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
