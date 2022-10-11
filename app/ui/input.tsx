import React from "react";

const Input = React.forwardRef<
  HTMLInputElement,
  JSX.IntrinsicElements["input"]
>(({ type = "text", className, ...props }, ref) => (
  <div className="mt-1 sm:col-span-2 sm:mt-0">
    <input
      ref={ref}
      type={type}
      className="w-full rounded border border-gray-500 px-2 py-1 text-lg text-black"
      {...props}
    />
  </div>
));

export default Input;
