import Image from "next/image";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { useConnect, useDisconnect } from "wagmi";
import Loading from "./loading";
import styles from "@/styles/Zicket.module.css";
import paymentStyles from "@/styles/paymentStyles.module.css";
import ZicketABI from "../abi/zicket.abi.json";

export default function TicketDestination() {
  const [statusPayment, setStatusPayment] = useState(false);
  const [showAddressField, setShowAddressField] = useState(false);
  const { address: connectedAddress, isConnected } = useAccount()
  const [address, setAddress] = useState("");
  const { connect, connectors, pendingConnector } = useConnect()
  const { disconnect } = useDisconnect();

  const contractAddr = "0x13E3a97607c820d44f51931C0550D9a432Ca22ED";

  const handleOptionChange = (e: any) => {
    const value = e.target.value;
    if(value === "differentAddress") {
      setShowAddressField(true);
      console.log(value);
    } else {
      setShowAddressField(false);
      setAddress(`${connectedAddress}`);
    }
  };

  const handleAddressChange = (e: any) => {
    const value = e.target.value;
    console.log(value);
    setAddress(value);
  };

  // const conractWrite = useContractWrite({
  //   mode: 'recklesslyUnprepared',
  //   address: contractAddr,
  //   abi: ZicketABI,
  //   functionName: 'addNewEvent',
  //   args: ["0x52034f66045Dd14fe2bb8209cCEd3A516e9a5170", ethers.utils.parseEther('0.01') , ethers.BigNumber.from("0"), "1709003002", "1709694202", "ETHDENVER", "BUIDL", "https://gateway.pinata.cloud/ipfs/QmPva7VzfWbh2UzpJdoBhKDcEGB7JqCCtKctTprhEPn58M"],
  // });

  const { config, error } = usePrepareContractWrite({
    address: contractAddr,
    abi: ZicketABI,
    functionName: 'purchaseTicket',
    args: [1, "0x8E5F1E57C8a3157e405Ee6eB965CdCf91811b60e"],
    overrides: {
      value: ethers.utils.parseEther('0.01'),
      gasLimit: ethers.BigNumber.from('360000')
    },
    onError(error: any) {
      console.log("Error ", error);
    }
  })
  const { data, isLoading, isIdle, isError, isSuccess, write }  = useContractWrite(config);
  
  if(isLoading) {
    return <Loading />
  }

  if (isSuccess && !isIdle) {
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
                <div className={paymentStyles.wayToWrapper}>
                  <p className={paymentStyles.titleTicket}>Your ticket is on it{"'"}s way to wallet</p>
                  <p className={paymentStyles.addres}>{address}</p>
                </div>
              <div className={paymentStyles.container}>
                <p className={paymentStyles.infoTxText}>
                  {data?.hash}
                </p>
                <Image
                  src="/zicket_sbt.svg"
                  alt="Zicket Ticket"
                  width={300}
                  height={400}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
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
                  <p className={paymentStyles.walletTitte}>Wallet</p>
                  <p className={paymentStyles.addres}>{connectedAddress}</p>
                  <p className={paymentStyles.walletTitte}>
                    connected successfully!
                  </p>
                </div>
                <div className={paymentStyles.walletOptionWrapper}>
                  <p className={paymentStyles.ticketChoose}>
                    Where do you want to recieve the ticket?
                  </p>
                  <div className={paymentStyles.inputWrapper}>
                    <div>
                      <label className={paymentStyles.label} htmlFor="crypto">
                        <input
                          type="radio"
                          id="sameAddress"
                          name="address"
                          value="sameAddress"
                          onChange={(e) => handleOptionChange(e)}
                          className={paymentStyles.input}
                        />
                        On the same address
                      </label>
                    </div>
                    <div>
                      <label className={paymentStyles.label} htmlFor="crypto">
                        <input
                          type="radio"
                          id="differentAddress"
                          name="address"
                          value="differentAddress"
                          onChange={(e) => handleOptionChange(e)}
                          className={paymentStyles.input}
                        />
                        On a differentAddress
                      </label>
                      {showAddressField && 
                        <input
                          type="text"
                          name="address"
                          value={address}
                          className={paymentStyles.inputWrapper}
                          onChange={(e) => handleAddressChange(e)}
                      />
                      }
                    </div>
                  </div>
                </div>
                <div className={paymentStyles.buttonWrapper}>
                  <div>
                    <button
                      className={styles.button}
                      disabled={!write} 
                      onClick={() => write?.()}
                    >
                      {"Confirm transaction of 0.01 Matic >"}
                    </button>
                  </div>
                  {error && <div>There was error while execution</div>}
                </div>
                {/* <div className={paymentStyles.buttonWrapper}>
                  <div>
                    <button
                      className={styles.button}
                      disabled={!conractWrite.write} 
                      onClick={() => conractWrite.write?.()}
                    >
                      {"Create event >"}
                    </button>
                  </div>
                </div> */}
                {isIdle && !isSuccess && data && data.hash &&
                  <div className={paymentStyles.inputWrapper}>
                    <p className={paymentStyles.errorText}>There was error on executing transaction ${data.hash}</p>
                  </div>
                }
          </div>
        </div>
      </main>
    </div>
  );
}
