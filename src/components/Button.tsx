interface ButtonProps {
  text: string;
  onClick: () => void;
  key?: string | number;
  loading?: boolean;
}

export const PrimaryButton = ({ onClick, text, key, loading }: ButtonProps) => {
  return (
    <button
      className={`bg-[#1b60e9] mx-[10px] p-[10px] w-[300px] rounded-[8px] text-[#fff] flex justify-center`}
      key={key}
      onClick={onClick}
      disabled={loading}
    >
      {loading ? (
        <div className="border-4 border-white border-t-[#000] rounded-full w-5 h-5 animate-spin"></div>
      ) : (
        text
      )}
    </button>
  );
};
