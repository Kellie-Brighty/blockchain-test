import { useEffect, useState } from "react";
import { useConnect } from "wagmi";
import { PrimaryButton } from "./components/Button";

interface WalletConnectModalProps {
  onClose: () => void;
}

export function WalletOptions({ onClose }: WalletConnectModalProps) {
  const { connectors, connect, isPending } = useConnect();
  const [selectedConnectorUid, setSelectedConnectorUid] = useState<
    string | null
  >(null);

  useEffect(() => {
    console.log("isPending:::", isPending);
  }, [isPending]);

  return (
    <div className={`fixed top-0 left-0 w-full h-[100vh]`}>
      <div
        className={`bg-[#00000079] w-full h-full flex justify-center items-center`}
      >
        <div
          className={`relative space-y-[20px] lg:space-y-0 lg:grid grid-cols-2 gap-[20px] text-[#fff] bg-[#000929] p-[30px] py-[60px] rounded-[20px]`}
        >
          <div
            onClick={onClose}
            className={`absolute top-[10px] right-[10px] bg-[#fff] rounded-full w-[40px] h-[40px] text-[#1b60e9] text-[30px] cursor-pointer flex justify-center items-center`}
          >
            <span>&times;</span>
          </div>
          {connectors.map((connector) => (
            <PrimaryButton
              onClick={() => {
                setSelectedConnectorUid(connector.uid);
                connect({ connector });
              }}
              text={`Connect ${connector.name}`}
              key={connector.uid}
              loading={isPending && connector.uid === selectedConnectorUid}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
