export default function BaseButton({
  ...props
}: JSX.IntrinsicElements["button"]) {
  return (
    <button
      className="inline-flex items-center justify-center rounded-md border border-transparent px-6 py-6 text-base font-medium shadow-sm ring-2 ring-transparent ring-offset-2 ring-offset-transparent focus:outline-none disabled:bg-gray-400"
      {...props}
    />
  );
}
