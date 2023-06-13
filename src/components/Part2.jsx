import React, { useEffect, useState } from "react";
import { parseEther } from "viem";
import { useAccount } from "wagmi";
import { useSendTransaction, usePrepareSendTransaction } from "wagmi";

const Part2 = () => {
  const [address, setAddress] = useState("");
  const [connector, setConnector] = useState({});
  const [txhash, setTxhash] = useState("");

  
  const data1 = useAccount({
    onConnect({ address, connector, isReconnected }) {
      setAddress(address);
      console.log(connector);
      setConnector(connector);
    },
    onDisconnect() {
      setAddress("");
      console.log("Disconnected.");
      setConnector({});
    },
  });

  const { config } = usePrepareSendTransaction({
    to: "0xe6d2212bAe4497902d8679294ccE974d8db8E53C",
    value: parseEther("0.01"),
  });

  const { data, isLoading, isSuccess, sendTransaction } =
    useSendTransaction(config);

  useEffect(() => {
    setTxhash(data?.hash);
  }, [data, isLoading, isSuccess]);

  return (
    <div>
      <span>Address: {address}</span> <br />
      <span>Connected through: {connector?.name}</span><br />
      <button
        onClick={async () => {
          sendTransaction?.();
        }}
      >
        Send Txn
      </button><br />
      <span>Txn hash: {txhash}</span>
    </div>
  );
};

export default Part2;
