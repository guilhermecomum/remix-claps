export default function Label({ ...props }: JSX.IntrinsicElements["label"]) {
  return <label className="block text-sm font-medium text-white" {...props} />;
}
