import { useParams } from '@remix-run/react';

export default function NoteId() {
  const params = useParams();

  return (
    <div className="container border-8 border-red-500 pt-12">
      <h2 className="text-h2">{params.noteId}</h2>
    </div>
  );
}
