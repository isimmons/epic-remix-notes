import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { db } from '~/utils/db.server';
import { invariantResponse } from '~/utils/misc';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { username } = params;

  invariantResponse(typeof username === 'string');

  const user = db.user.findFirst({
    where: {
      username: { equals: username },
    },
  });

  invariantResponse(user !== null, 'User Not Found', { status: 404 });

  return json({
    user: {
      username: user.username,
      email: user.email,
      name: user.name,
    },
  });
};

export default function UserProfileRoute() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div className="mt-36">
      <h1 className="text-h1">{user.name ?? user.username}</h1>
      <Link to="notes">Notes</Link>
    </div>
  );
}
