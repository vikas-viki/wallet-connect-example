import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createConfig, configureChains, WagmiConfig } from 'wagmi';
import { w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { sepolia } from "wagmi/chains";
import { publicProvider } from 'wagmi/providers/public'


const queryClient = new QueryClient();

const chains = [sepolia];
export const projectId = "753ca87e729b296cfedf813f7eef158b";

const { publicClient, webSocketPublicClient } = configureChains(chains, [
  w3mProvider({ projectId }),
  publicProvider()
]);

export const wagmiConfig = createConfig({
  publicClient,
  webSocketPublicClient,
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains })
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient} contextSharing={true}>
    <WagmiConfig config={wagmiConfig} >
      <App />
    </WagmiConfig>
  </QueryClientProvider>


);
