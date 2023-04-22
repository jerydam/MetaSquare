import Head from "next/head";
import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { goerli, mainnet, polygonMumbai } from "wagmi/chains";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import "../public/styles.css";

const { chains, provider } = configureChains(
  [goerli, mainnet, polygonMumbai],
  // https://eth-goerli.g.alchemy.com/v2/U4Q5B-2_p_WUMX2gBCL_ZYNpaRetbTgd
  [
    jsonRpcProvider({
      rpc: () => ({
        http: "https://polygon-mumbai.g.alchemy.com/v2/OnD5ir1kRjdZ2sZZAtBOK_-u6DF1Q2nd",
        WebSocket:
          "wss://polygon-mumbai.g.alchemy.com/v2/OnD5ir1kRjdZ2sZZAtBOK_-u6DF1Q2nd",
      }),
    }),
  ]
);
const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});
const MyApp = ({ Component, pageProps }) => (
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains} modalSize="compact">
      <>
        <Head>
          <title>MetaSquare</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/meta.png" />
          <link rel="preconnect" href="https://stijndv.com" />
          <link
            rel="stylesheet"
            href="https://stijndv.com/fonts/Eudoxus-Sans.css"
          />
        </Head>
        <Component {...pageProps} />
      </>
    </RainbowKitProvider>
  </WagmiConfig>
);

export default MyApp;
