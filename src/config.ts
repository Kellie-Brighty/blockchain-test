import { http, createConfig } from "wagmi";
import { baseSepolia, optimismSepolia } from "wagmi/chains";
import { injected, metaMask, safe, walletConnect } from "wagmi/connectors";
import { Project_ID } from "./project.config";

const projectId = Project_ID;

export const config = createConfig({
  chains: [baseSepolia, optimismSepolia],
  connectors: [injected(), walletConnect({ projectId }), metaMask(), safe()],
  transports: {
    [baseSepolia.id]: http(),
    [optimismSepolia.id]: http(),
  },
});
