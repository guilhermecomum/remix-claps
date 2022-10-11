import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "~/db.server";
import { getStepsFromRoute } from "~/domains/routes.server";
import { ClientOnly } from "~/ui/client-only";
import { Map } from "~/ui/Map.client";

export const loader: LoaderFunction = async ({ params }) => {
  const id = params.routeId;
  const data = await getStepsFromRoute(id);
  const { claves, paths } = data.data;
  return json({ claves, paths });
};

export default function Index() {
  const { claves, paths } = useLoaderData();

  return (
    <>
      <div className="w-4/12">
        <div className="overflow-y-scrol m-0 flex h-screen shrink-0 flex-col p-0">
          <div className="pt-20">
            {claves.map((clave) => (
              <div key={clave.id}>
                <h1>
                  {clave.name} <small>{clave.country}</small>
                </h1>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="h-full w-8/12">
        <div className="relative h-full h-full overflow-hidden">
          <ClientOnly fallback={<div id="skeleton" className="bg-red-300" />}>
            {() => <Map paths={paths} />}
          </ClientOnly>
        </div>
      </div>
    </>
  );
}
