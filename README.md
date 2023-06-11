# Wallet connect example with wagmi

**`Give a 🌟 if it was helpful.`**

Go to this playlist and for code explanation
**[here](https://www.youtube.com/@webdevsolutions/playlists).**


### Getting started

- First clone the respository
```
git clone https://github.com/vikas-viki/wallet-connect-example
```

- Install packages
```
npm i
```

- Run the app

```
npm start
```

### How it works ?


**` Part 1 `**

In part 1 we just made wallet connect integration where user can connect their wallet with provider which they use.

``` javascript
import { Web3Button, Web3Modal } from "@web3modal/react";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { sepolia } from "wagmi/chains";

export default function Part1() {

  const chains = [sepolia];
  const projectId = "YOUR_PROJECT_ID_HERE";

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
```


**`Part2`**

In part 2, the code changes where we used hooks to get details of connected account and initiated a transaction and we moved the whole config to main `index.js` file.

``` javascript
// Part2.jsx
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
      setConnector(connector);
    },
    onDisconnect() {
      setAddress("");
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

```

``` javascript
// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createConfig, configureChains, WagmiConfig } from 'wagmi';
import { w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { sepolia } from "wagmi/chains";
import { publicProvider } from 'wagmi/providers/public'


const queryClient = new QueryClient();

const chains = [sepolia];
const projectId = "YOUR_PROJECT_ID_HERE";

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

```
``` javascript
// Part1.jsx
import { Web3Button, Web3Modal } from "@web3modal/react";
import { EthereumClient } from "@web3modal/ethereum";
import { sepolia } from "wagmi";
import { projectId, wagmiConfig } from "../index";

export default function Part1() {
  const chains = [sepolia];

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
```
