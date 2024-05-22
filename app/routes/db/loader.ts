import { LoaderFunctionArgs, json } from "@remix-run/node";
import { getAllNotes } from "./db";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const notes = await getAllNotes(q);
  return json({ notes, q });
};
