import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Epic Notes" },
    { name: "description", content: "Welcome to Epic Notes!" },
  ];
};

export default function Index() {
  return <p className="p-8 text-xl">Hello World</p>;
}
