import {json, LoaderFunctionArgs} from "@remix-run/node";
import {Form, useLoaderData} from "@remix-run/react";
import {getNote, updateNote} from "./db/db";
import invariant from "tiny-invariant";

export const loader = async ({params}: LoaderFunctionArgs) => {
	invariant(params.notesId, "Missing notesId param");
	const noteId = Number(params.notesId);
	if (isNaN(noteId)) {
		throw new Error("Invalid notesId param - it must be a number");
	}
	const note = await getNote(noteId);
	if (!note) {
		throw new Response("Note not found", {status: 404});
	}
	const viewedAt = {viewedAt: new Date().toISOString()};
	await updateNote(noteId, viewedAt);

	return json({note});
};

function Note() {
	const {note} = useLoaderData<typeof loader>();

	return (
		<div id="note">
			<div>
				<h1>{note.title ? <>{note.title}</> : <i>No Name</i>} </h1>
				{note.viewedAt ? <sub>{note.viewedAt}</sub> : null}
				{note.content ? <pre>{note.content}</pre> : null}

				<div>
					<Form action="edit">
						<button type="submit">Edit</button>
					</Form>

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
				</div>
			</div>
		</div>
	);
}

export default Note;
