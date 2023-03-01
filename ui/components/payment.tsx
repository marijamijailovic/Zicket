import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
//import paymentStyles from "../styles/paymentStyles.module.css";
import { useContract, useContractWrite } from "wagmi";

export default function Payment() {
  const [showWalletaddres, setShowWalletAddress] = useState(false);
  const [paymentType, setPaymentType] = useState("");

  const handleOptionChange = (e: any) => {
    const value = e.target.value;
    setPaymentType(value);
    console.log(value);
  };

  // useEffect(() => {
  //   if (paymentType === "crypto") {
  //     setShowWalletAddress(true);
  //   } else {
  //     setShowWalletAddress(false);
  //   }
  // }, [paymentType]);

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
            <div>
              <p>Verification successful!</p>
              <p >
                Now you can buy your ticket
              </p>
            </div>
            <div>
              <p>
                Choose payment option
              </p>
              <div>
                <div>
                <label htmlFor="crypto">
                  <input
                    type="radio"
                    id="crypto"
                    name="payment"
                    value="crypto"
                    onChange={(e) => handleOptionChange(e)}
                  />
                 Crypto</label>
                </div>
                <div>
                <label htmlFor="fiat">
                  <input
                    type="radio"
                    id="fiat"
                    name="payment"
                    value="fiat"
                    onChange={(e) => handleOptionChange(e)}
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
