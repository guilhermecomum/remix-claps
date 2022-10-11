import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import tailwindStylesheetUrl from "./styles/tailwind.css";

import leafletStyle from "leaflet/dist/leaflet.css";
import { prisma } from "./db.server";

//import { getUser } from "./session.server";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    { rel: "stylesheet", href: leafletStyle },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Cartografias | Ciberterreiro",
  viewport: "width=device-width,initial-scale=1",
});

export async function loader({ request }: LoaderArgs) {
  const routes = await prisma.route.findMany();
  return json({ routes });
}

export default function App() {
  const { routes } = useLoaderData();
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full bg-white text-black">
        <nav>
          <ul className="fixed m-0 flex border-b-2 border-gray-200 bg-white p-0">
            {routes.map((route) => (
              <li className="text-300 m-0 p-2.5 uppercase" key={route.id}>
                <NavLink to={`/rotas/${route.id}`}>{route.name}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <main className="flex h-full justify-around">
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </main>
      </body>
    </html>
  );
}
