import BaseButton from "./base-button";

export default function Button({ ...props }: JSX.IntrinsicElements["button"]) {
  return (
    <BaseButton
      className="bg-pink-600 text-white hover:bg-pink-700 focus:ring-pink-500 focus:ring-offset-white"
      {...props}
    />
  );
}
