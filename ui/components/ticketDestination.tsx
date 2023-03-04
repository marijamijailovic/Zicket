import Image from "next/image";
import { useState } from "react";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { useConnect, useDisconnect } from "wagmi";
import styles from "../styles/Home.module.css";
import paymentStyles from "../styles/paymentStyles.module.css";
import Loading from "./loading";

export default function TicketDestination() {
  const [statusPayment, setStatusPayment] = useState(false);
  const [address, setAddress] = useState("");
  const [showAddressField, setShowAddressField] = useState(false);
  const { address: connectedAddress, isConnected } = useAccount()
  const { connect, connectors, error, pendingConnector } = useConnect()
  const { disconnect } = useDisconnect();

  const handleOptionChange = (e: any) => {
    const value = e.target.value;
    if(value === "differentAddress") {
      setShowAddressField(true);
      console.log(value);
    } else {
      setShowAddressField(false);
    }
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const { config } = usePrepareContractWrite({
  //   address: '0x559cd23fe107eCcDE7B9aE93d3B7A1ea79717F50',
  //   abi: ,
  //   functionName: 'setGreet',
  //   args: ["Marija"]
  // })
  const { data: setGreetData, isLoading: loadingGreet, isSuccess, write } = useContractWrite(config);

  // console.log("DATA: ", setGreetData);

  const onClickConfirm = () => {
    console.log("Clicked");
    console.log(address);
    //TODO Backend check
    setStatusPayment(true);
  };

  if(loadingGreet) {
    return <Loading />
  }

  if (isSuccess) {
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
            {isConnected ? 
              <>
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
                        value={connectedAddress}
                        className={paymentStyles.input}
                      />
                      }
                    </div>
                  </div>
                </div>
                <div className={paymentStyles.buttonWrapper}>
                  <div>
                    <button
                      disabled={!write}
                      className={styles.button}
                      onClick={() => write?.()}
                    >
                      {"Confirm transaction >"}
                    </button>
                  </div>
                  {/* {isLoading && <div>Check Wallet</div>}
                  {!isError && <div>Transaction get: {JSON.stringify(data)}</div>} */}

                  {loadingGreet && <div>Check Wallet</div>}
                  {isSuccess && <div>Transaction get: {JSON.stringify(setGreetData)}</div>}
                </div>
            </> : 
            <>
              <div className={paymentStyles.buttonWrapper}>
                <button
                  className={styles.button}
                  onClick={() => connect({connector: connectors[0]})}
                >
                  Connect with wallet
                </button>
                </div>
          </>
          }
          </div>
        </div>
      </main>
    </div>
  );
}
