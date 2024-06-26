import {Link, useLoaderData} from "@remix-run/react";
import {json} from "@remix-run/node";
import {getAllNotes} from "~/routes/db/db";

export const loader = async () => {
    const notes = await getAllNotes();
    return json({notes});
};

export default function Index() {
    const { notes } = useLoaderData<typeof loader>();
    return (
        <div>
            <h1>Notes</h1>

            {notes.length == 0 ? (
                <div>
                    <p>No notes found.</p>
                </div>
            ) : (
                <ul id="notePreviewList">
                    {notes
                        .sort((a, b) =>
                            a.viewedAt && b.viewedAt ? (a.viewedAt > b.viewedAt ? -1 : 1) : 0,
                        )
                        .map((note) => (
                            <li key={note.id}>
                                <Link to={`notes/${note.id}`}>
                                    {note.title ? (
                                        <h3>
                                            {note.title.length > 25
                                                ? `${note.title.substring(0, 25)}...`
                                                : note.title}
                                        </h3>
                                    ) : (
                                        <i>No Name</i>
                                    )}{" "}
                                    {note.content ? (
                                        <p>
                                            {note.content.length > 100
                                                ? `${note.content.substring(0, 100)}...`
                                                : note.content}
                                        </p>
                                    ) : null}
                                </Link>
                            </li>
                        ))}
                </ul>
            )}
        </div>
    );
}
