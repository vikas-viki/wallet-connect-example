import { Web3Button, Web3Modal } from "@web3modal/react";
import { EthereumClient } from "@web3modal/ethereum";
import { sepolia } from "wagmi";
import { wagmiConfig } from "../index";

export default function Part1() {
  const chains = [sepolia];
  const projectId = "753ca87e729b296cfedf813f7eef158b";

  const ethereumClient = new EthereumClient(wagmiConfig, chains);

  return (
    <>
      <Web3Button />

      <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
        defaultChain={sepolia}
      />
    </>
  );
}
