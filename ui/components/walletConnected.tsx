import Image from "next/image";
import { use, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import styles from "../styles/Home.module.css";
import paymentStyles from "../styles/paymentStyles.module.css";
import TicketDestination from "./ticketDestination";

export default function WalletConnected() {
  const { address: connectedAddress, isConnected } = useAccount();
  const { connect, connectors, error, pendingConnector } = useConnect()
  const { disconnect } = useDisconnect();
  const [ticketDestinationAddress, setTicketDestinationAddress] = useState(false);
  
  const handleOnClickPaymentAddress = () => {
    console.log("Next");
    setTicketDestinationAddress(true);
  }

  if(ticketDestinationAddress) {
    return <TicketDestination />
  }

  return (
    !isConnected ?
      <div className={paymentStyles.inputWrapper}>
        <button
          className={paymentStyles.label}
          onClick={() => connect({connector: connectors[0]})}
          >
            <Image
            className={styles.logo}
            src="/metamask-icon.svg"
            alt="Metamask Logo"
            width={24}
            height={30}
            />
            Connect with MetaMask
        </button>
      </div> 
    :
      <div className={paymentStyles.inputWrapper}>
          <button
            className={styles.linkButton}
            onClick={() => handleOnClickPaymentAddress()}
          >
            <p className={paymentStyles.addres}>{connectedAddress}</p>
        </button>
      </div>       
  );
}
