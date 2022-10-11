import { Form as RemixForm, FormProps } from "remix-forms";
import { SomeZodObject } from "zod";
import Button from "./button";
import Field from "./field";
import Input from "./input";
import Label from "./label";

export default function Form<Schema extends SomeZodObject>(
  props: FormProps<Schema>
) {
  return (
    <RemixForm<Schema>
      className="space-y-6"
      fieldComponent={Field}
      inputComponent={Input}
      labelComponent={Label}
      buttonComponent={Button}
      {...props}
    />
  );
}
