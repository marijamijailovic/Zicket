import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { polygon, polygonMumbai } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { configureChains, createClient, WagmiConfig } from 'wagmi'

const { chains, provider } = configureChains(
  [polygon, polygonMumbai],
  [alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_MUMBAI_KEY || "" }), publicProvider()],
)

const client = createClient({
  autoConnect: true,
  connectors: [
    new InjectedConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
  ],
  provider,
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <Component {...pageProps} />
    </WagmiConfig>
  )
}
