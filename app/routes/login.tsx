import { z } from "zod";
import { formAction } from "remix-forms";
import Form from "~/ui/form";
import type { LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { ActionFunction } from "@remix-run/server-runtime";
import { makeDomainFunction } from "domain-functions";

const schema = z.object({
  email: z.string().nonempty().email(),
  password: z.string().nonempty(),
});

/* export const action: ActionFunction = async ({ request }) =>
 *   formAction({
 *     request,
 *     schema,
 *   }); */

export async function loader({ request }: LoaderArgs) {
  /* const userId = await getUserId(request);
   * if (userId) return redirect("/"); */

  return json({});
}

export default () => <Form schema={schema} />;
