import { Label } from '@radix-ui/react-label';
import {
  json,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from '@remix-run/node';
import { Form, redirect, useLoaderData } from '@remix-run/react';
import { floatingToolbarClassName } from '~/components/floating-toolbar';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { db } from '~/utils/db.server';
import { invariantResponse } from '~/utils/misc';

export async function loader({ params: { noteId } }: LoaderFunctionArgs) {
  invariantResponse(
    typeof noteId === 'string',
    'Invalid note id in request URL',
    { status: 400 },
  );

  const note = db.note.findFirst({
    where: {
      id: {
        equals: noteId,
      },
    },
  });

  invariantResponse(note, 'Note not found', { status: 404 });

  return json({
    note: { title: note.title, content: note.content },
  });
}

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const title = formData.get('title');
  const content = formData.get('content');

  // replace with real zod validation in a bit
  invariantResponse(typeof title === 'string', 'Note title must be a string.');
  invariantResponse(
    typeof content === 'string',
    'Note content must be a string.',
  );

  db.note.update({
    where: { id: { equals: params.noteId } },
    data: { title, content },
  });

  return redirect(`/users/${params.username}/notes/${params.noteId}`);
}

export default function NoteEdit() {
  const data = useLoaderData<typeof loader>();

  return (
    <Form
      method="POST"
      className="flex h-full flex-col gap-y-4 overflow-x-hidden px-10 pb-28 pt-12"
    >
      <div className="flex flex-col gap-1">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input name="title" id="title" defaultValue={data.note.title} />
        </div>
        <div>
          <Label htmlFor="content">Content</Label>
          <Textarea
            name="content"
            id="content"
            defaultValue={data.note.content}
            className='min-h-[400px]'
          />
        </div>
      </div>
      <div className={floatingToolbarClassName}>
        <Button variant="destructive" type="reset">
          Reset
        </Button>
        <Button type="submit">Submit</Button>
      </div>
    </Form>
  );
}
