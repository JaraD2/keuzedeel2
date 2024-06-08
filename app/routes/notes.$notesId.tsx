import type {LoaderFunctionArgs, ActionFunctionArgs} from "@remix-run/node";
import {json} from "@remix-run/node";
import {Form, Link, useLoaderData} from "@remix-run/react";
import invariant from "tiny-invariant";
import {getNote, updateNote} from "~/routes/db/db";

export const action = async ({params, request}: ActionFunctionArgs) => {
	const formData = await request.formData();
	const updates = Object.fromEntries(formData);
	await updateNote(Number(params.notesId), updates);
	return null;
};

export const loader = async ({params}: LoaderFunctionArgs) => {
	invariant(params.notesId, "Missing contactId param");
	const note = await getNote(Number(params.notesId));
	if (!note) {
		throw new Response("Not Found", {status: 404});
	}
	return json({note});
};


export default function EditNotes() {
	const {note: note} = useLoaderData<typeof loader>();

	return (
		<Form key={note.id} id="note-form" method="post">
			<div id="note-title-container">
				<input
					defaultValue={note.title}
					aria-label="title"
					name="title"
					type="text"
					placeholder="First"
				/>
				<button type="submit">Save</button>
				<Form
					action="destroy"
					method="post"
					onSubmit={(event) => {
						const response = confirm(
							"Please confirm you want to delete this record.",
						);
						if (!response) {
							event.preventDefault();
						}
					}}
				>
					<button type="submit">Delete</button>
				</Form>
				<button>
					<Link to={"../"}>Back</Link>
				</button>
			</div>
			<textarea defaultValue={note.content} name="content" rows={6}/>

		</Form>
	);
}