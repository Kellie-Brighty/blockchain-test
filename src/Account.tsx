import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";
import { PrimaryButton } from "./components/Button";
import {
  type BaseError,
  useSendTransaction,
  useWaitForTransactionReceipt,
} from "wagmi";
import { parseEther } from "viem";
import { useSwitchChain } from "wagmi";
import { useEffect } from "react";
import { useEstimateGas } from "wagmi";

export function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });
  const {
    data: hash,
    error,
    isPending,
    sendTransaction,
  } = useSendTransaction();
  const { switchChain, chains } = useSwitchChain();
  const result = useEstimateGas();

  useEffect(() => {
    console.log("result:::", result);
  }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const to = formData.get("address") as `0x${string}`;
    const value = formData.get("value") as string;
    sendTransaction({ to, value: parseEther(value), gasPrice: BigInt(165422) });
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return (
    <div>
      <div className={`flex items-center`}>
        {chains.map((chain) => (
          <PrimaryButton
            key={chain.id}
            onClick={() => switchChain({ chainId: chain.id })}
            text={chain.name}
          />
        ))}
      </div>
      <form onSubmit={submit}>
        <input name="address" placeholder="0xA0Cf…251e" required />
        <input name="value" placeholder="0.05" required />
        <button disabled={isPending} type="submit">
          {isPending ? "Confirming..." : "Send"}
        </button>
        {hash && <div>Transaction Hash: {hash}</div>}
        {isConfirming && <div>Waiting for confirmation...</div>}
        {isConfirmed && <div>Transaction confirmed.</div>}
        {error && (
          <div>Error: {(error as BaseError).shortMessage || error.message}</div>
        )}
      </form>
      {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
      {address && <div>{ensName ? `${ensName} (${address})` : address}</div>}
      <PrimaryButton text="Disconnect" onClick={() => disconnect()} />
    </div>
  );
}
