import { useState } from "react";
import { WalletOptions } from "../WalletOptions";
import { useAccount } from "wagmi";
import { Account } from "../Account";
import { PrimaryButton } from "./Button";

const MainConnector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isConnected } = useAccount();

  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  if (isConnected) return <Account />;

  return (
    <div className={`w-full h-[100vh] flex justify-center items-center`}>
      <PrimaryButton text="Open Custom Connectors" onClick={toggleList} />
      {isOpen && <WalletOptions onClose={toggleList} />}
    </div>
  );
};

export default MainConnector;
