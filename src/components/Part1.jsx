import { Web3Button, Web3Modal } from "@web3modal/react";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider
} from "@web3modal/ethereum";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { sepolia } from "wagmi/chains";

export default function Part1() {
  const chains = [sepolia];
  const projectId = "753ca87e729b296cfedf813f7eef158b";

  const { publicClient } = configureChains(chains, [
    w3mProvider({ projectId }),
  ]);

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, version: 1, chains }),
    publicClient,
  });

  const ethereumClient = new EthereumClient(wagmiConfig, chains);

  
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <Web3Button />
      </WagmiConfig>

      <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
        defaultChain={sepolia}
      />
    </>
  );
}
