import Image from "next/image";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useAccount, useContract, useContractRead, useContractWrite, usePrepareContractWrite } from "wagmi";
import { useConnect, useDisconnect } from "wagmi";
import Loading from "./loading";
import styles from "@/styles/Home.module.css";
import paymentStyles from "@/styles/paymentStyles.module.css";
import ZicketABI from "../abi/zicket.abi.json";
import MerkleTreeABI from "../abi/merkleTree.abi.json";
import CredentialVerifierABI from "../abi/credentialVerifier.abi.json";
import { merkleTreeRoot } from "@/utils/merkletree";

export default function TicketDestination() {
  const [statusPayment, setStatusPayment] = useState();
  const [showAddressField, setShowAddressField] = useState(false);
  const { address: connectedAddress, isConnected } = useAccount()
  const [address, setAddress] = useState("");
  const [usersHashPK, setUsersHashPK] = useState([""]);
  const [merkleRoot, setMerkleRoot] = useState("");
  const { connect, connectors, pendingConnector } = useConnect()
  const { disconnect } = useDisconnect();

  const contractAddr = "0x13E3a97607c820d44f51931C0550D9a432Ca22ED";

  const contractVerifier = useContract({
    address: '0x741f7648954bfa141450Bd69B86b6cE15E780077',//'5FbDB2315678afecb367f032d93F642f64180aa3',
    abi: CredentialVerifierABI,
  });

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

  const { config } = usePrepareContractWrite({
    address: contractAddr,
    abi: ZicketABI,
    functionName: 'purchaseTicket',
    args: [1, "0xBD4c9639CB942A1C01F5418492fCA0FCa9Aa1DD9"],
    overrides: {
      value: ethers.utils.parseEther('0.01'),
      gasLimit: ethers.BigNumber.from('360000')
    },
    onError(error: any) {
      console.log("Error ", error);
    }
  })
  const { data, isLoading, isIdle, isError, isSuccess, write }  = useContractWrite(config);

  const { config: configmerkleTree } = usePrepareContractWrite({
    address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    abi: MerkleTreeABI,
    functionName: 'setRoot',
    args: [merkleRoot],
    onError(error: any) {
      console.log("Error ", error);
    }
  })
  const { data: dataMerkleTree, isLoading: isLoadingMerkle, isError: isErrorMerkle, isSuccess: isSuccessMerkle, write: writeMerkle }  = useContractWrite(configmerkleTree);

  // const { data: dataRead} = useContractRead({
  //   address: "0x559cd23fe107eCcDE7B9aE93d3B7A1ea79717F50",//"0x741f7648954bfa141450Bd69B86b6cE15E780077",
  //   abi: WagmiABI,//CredentialVerifierABI,
  //   functionName: 'getGreet'
  // })


  useEffect(()=>{
    const getData = async (data: any) => {
      let receipt = await data.wait();
      console.log("RECEIPT OF TICKET PURCHASE : ", receipt); 
      setStatusPayment(receipt.status);
    }
    data && getData(data);
  }, [data]);

  useEffect(() => {
    let hashes: string[] = [];
    if(contractVerifier) {
      const userData = contractVerifier.didToHashedPrivateKey;
      userData && userData.map((index: number, item: string)=>{
        hashes.push(item[1]);
      });
    }
    setUsersHashPK(hashes);
  }, [contractVerifier]);

  
  if(isLoading) {
    return <Loading />
  }

  if (isSuccess && !isIdle && statusPayment === 1) {
    const root = merkleTreeRoot(usersHashPK);
    console.log(root);
    setMerkleRoot(root);
    writeMerkle?.();
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
                {statusPayment === 0 &&
                  <div className={paymentStyles.inputWrapper}>
                    <p className={paymentStyles.errorText}>There was error on executing transaction!</p>
                  </div>
                }
          </div>
        </div>
      </main>
    </div>
  );
}
