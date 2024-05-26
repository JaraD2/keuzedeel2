import {
  Form,
  NavLink,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import { redirect } from "@remix-run/node";
import { loader } from "../root";
import { createEmptyNote } from "~/routes/db/db";
import { useEffect } from "react";


export const action = async () => {
  const note = await createEmptyNote();
  return redirect(`/notes/${note.id}/edit`);
};


function Sidebar() {
  const { notes, q } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const submit = useSubmit();
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  useEffect(() => {
    const searchField = document.getElementById("q");
    if (searchField instanceof HTMLInputElement) {
      searchField.value = q || "";
    }
  }, [q]);

  return (
    <div id="sidebar">
      <div>
        <Form
          id="search-form"
          onChange={(event) => {
            const isFirstSearch = q === null;
            submit(event.currentTarget, {
              replace: !isFirstSearch,
            });
          }}
          role="search"
        >
          <input
            id="q"
            className={searching ? "loading" : ""}
            aria-label="Search notes"
            defaultValue={q || ""}
            placeholder="Search"
            type="search"
            name="q"
          />
          <div aria-hidden hidden={!searching} id="search-spinner" />
        </Form>
        <Form method="post" action="./">
          <button type="submit">New</button>
        </Form>
      </div>
      <nav>
        {notes.length ? (
          <ul>
            {notes
              .sort((a, b) =>
                a.viewedAt && b.viewedAt
                  ? a.viewedAt > b.viewedAt
                    ? -1
                    : 1
                  : 0,
              )
              .map((note) => (
                <li key={note.id}>
                  <NavLink
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                    to={`../notes/${note.id}`}
                  >
                    {note.title ? <>{note.title}</> : <i>No Name</i>}{" "}
                  </NavLink>
                </li>
              ))}
          </ul>
        ) : (
          <p>
            <i>No notes</i>
          </p>
        )}
      </nav>
    </div>
  );
}

export default Sidebar;
