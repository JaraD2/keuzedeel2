import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "@remix-run/react";
import Sidebar from "./components/sidebar";
import {LinksFunction, LoaderFunctionArgs, json, redirect} from "@remix-run/node";
import appStylesHref from "./app.css?url";
import {createEmptyNote, getAllNotes} from "./routes/db/db";


export const action = async () => {
	const note = await createEmptyNote();
	return redirect(`/notes/${note.id}/edit`);
};



export const links: LinksFunction = () => [
	{rel: "stylesheet", href: appStylesHref},
];
export const loader = async ({request}: LoaderFunctionArgs) => {
	const url = new URL(request.url);
	const q = url.searchParams.get("q");
	const notes = await getAllNotes(q);
	return json({notes, q});
};


export default function App() {
	return (
		<html lang="en">
		<head>
			<meta charSet="utf-8"/>
			<meta name="viewport" content="width=device-width, initial-scale=1"/>
			<Meta/>
			<Links/>
		</head>
		<body>
		<Sidebar/>
		<main>
			<Outlet/>
		</main>
		<ScrollRestoration/>
		<Scripts/>
		</body>
		</html>
	);
}
