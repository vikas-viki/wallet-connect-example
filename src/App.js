/* eslint-disable react-hooks/rules-of-hooks */
import { Web3Button, Web3Modal } from '@web3modal/react';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { configureChains, createConfig, useQueryClient, WagmiConfig } from 'wagmi';
import { arbitrum, mainnet, polygon } from 'wagmi/chains';
import { useAccount } from 'wagmi';
import { useSendTransaction } from 'wagmi'
import { parseEther } from 'viem';


//  Set query client by asking chatgpt

export default function App() {

  const chains = [arbitrum, mainnet, polygon]
  const projectId = '753ca87e729b296cfedf813f7eef158b';

  const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, version: 1, chains }),
    publicClient
  })

  const ethereumClient = new EthereumClient(wagmiConfig, chains)

  const { connector, address, isConnecting } = useAccount();

  const { data, isLoading, isSuccess, sendTransaction } = useSendTransaction({
    to: '0xEBA97E01DaF90479C55782EE9F58C11c5B892825',
    value: parseEther('0.01'),
  })

  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <Web3Button />
      </WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      <div style={{ fontSize: '20px' }}>
        {
          !isConnecting ? (
            <>
              <span>Address: {address}</span><br />
              <span>Connected through: {address && (connector?.name)}</span>
              <button onClick={sendTransaction}>Send 0.01 Matic</button>
            </>
          ) : (
            <span>Connect Wallet to see details</span>
          )
        }
      </div>
    </>
  )
}


