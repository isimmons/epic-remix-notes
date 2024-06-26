import {
  json,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from '@remix-run/node';
import { Form, Link, redirect, useLoaderData } from '@remix-run/react';
import { floatingToolbarClassName } from '~/components/floating-toolbar';
import { Button } from '~/components/ui/button';
import { db } from '~/utils/db.server';
import { invariantResponse } from '~/utils/misc';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { noteId } = params;

  invariantResponse(typeof noteId === 'string');

  const note = db.note.findFirst({
    where: { id: { equals: noteId } },
  });

  invariantResponse(note !== null);

  return json({
    note: { id: note.id, title: note.title, content: note.content },
  });
};

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get('intent');

  invariantResponse(intent === 'delete', 'Invalid intent');

  db.note.delete({
    where: { id: { equals: params.noteId } },
  });

  return redirect(`/users/${params.username}/notes`);
}

export default function NoteId() {
  const { note } = useLoaderData<typeof loader>();

  return (
    <div className="absolute inset-0 flex flex-col px-10">
      <h2 className="mb-2 pt-12 text-h2 lg:mb-6">{note.title}</h2>
      <div className="overflow-y-auto px-3 pb-24">
        <p className="whitespace-break-spaces text-sm md:text-lg">
          {note.content}
        </p>
      </div>

      <div className={floatingToolbarClassName}>
        <Form method="POST">
          <Button
            type="submit"
            variant="destructive"
            name="intent"
            value="delete"
          >
            Delete
          </Button>
        </Form>
        <Button asChild>
          <Link to="edit">Edit</Link>
        </Button>
      </div>
    </div>
  );
}
