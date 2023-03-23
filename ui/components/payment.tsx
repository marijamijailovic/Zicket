import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Zicket.module.css";
import paymentStyles from "../styles/paymentStyles.module.css";
import WalletConnected from "./walletConnected";
import TicketDestination from "./ticketDestination";

export default function Payment() {
  const [paymentType, setPaymentType] = useState("");
  const [wallet, setWallet] = useState(false);
  const [proceed, setProceed] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const handleOptionChange = (e: any) => {
    const value = e.target.value;
    setPaymentType(value);
    setDisabled(false);
    console.log(value);
  };
  
  const handleOnClickPay = (e: any) => {
    setProceed(true);
    setDisabled(false);
  }

  useEffect(() => {
    if (paymentType === "crypto") { 
        setWallet(true);
    } else {
      setWallet(false);
    }
  }, [paymentType]);

  if(proceed) {
    return <TicketDestination />
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
                <div className={paymentStyles.buttonWrapper}>
                  <div>
                    <button
                      disabled={disabled}
                      className={styles.button}
                      onClick={(e) => handleOnClickPay(e)}
                    >
                      {"Confirm transaction of 0.01 Matic >"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
