import os from "node:os";
import { json, type LinksFunction } from "@remix-run/node";
import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import stylesheet from "~/tailwind.css?url";
import fontStyleSheet from "~/styles/font.css?url";
import faviconAssetUrl from "~/assets/favicon.svg";

import "~/styles/global.css";

export const links: LinksFunction = () => [
  { rel: "icon", type: "image/svg+xml", href: faviconAssetUrl },
  { rel: "stylesheet", href: stylesheet },
  { rel: "stylesheet", href: fontStyleSheet },
];

export async function loader() {
  return json({ username: os.userInfo().username });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>();

  return (
    <html lang="en" className="h-full overflow-x-hidden">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <div
          id="content"
          className="flex h-full flex-col justify-between bg-background text-foreground"
        >
          <header className="container mx-auto py-6">
            <nav className="flex justify-between">
              <Link to="/">
                <div className="font-light">epic</div>
                <div className="font-bold">notes</div>
              </Link>
            </nav>
          </header>

          <div className="flex-1 container">{children}</div>

          <div className="container mx-auto flex justify-between">
            <Link to="/">
              <div className="font-light">epic</div>
              <div className="font-bold">notes</div>
            </Link>
            <p>Built with ♥️ by {data.username}</p>
          </div>
        </div>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
