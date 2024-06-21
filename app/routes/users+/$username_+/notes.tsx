import {
  Link,
  NavLink,
  Outlet,
  useLoaderData,
  useParams,
} from '@remix-run/react';
import { cn, invariantResponse } from '~/utils/misc';
import { db } from '~/utils/db.server';
import { json, type LoaderFunctionArgs } from '@remix-run/node';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { username } = params;

  invariantResponse(typeof username === 'string');

  const owner = db.user.findFirst({
    where: {
      username: { equals: username },
    },
  });

  invariantResponse(owner !== null);

  const notes = db.note.findMany({
    where: {
      owner: {
        username: { equals: username },
      },
    },
  });

  return json({
    owner: { name: owner.name, username: owner.username },
    notes: notes.map((note) => ({ id: note.id, title: note.title })),
  });
};

export default function NotesRoute() {
  const { owner, notes } = useLoaderData<typeof loader>();
  const navLinkDefaultClassName =
    'line-clamp-2 block rounded-l-full py-2 pl-8 pr-6 text-base lg:text-xl';

  return (
    <div className="flex h-full px-0 pb-12 md:px-8">
      <div className="grid w-full grid-cols-4 bg-muted pl-2 md:container md:mx-2 md:rounded-3xl md:pr-0">
        <div className="relative col-span-1">
          <div className="absolute inset-0 flex flex-col">
            <Link to=".." relative="path" className="pb-4 pl-8 pr-4 pt-12">
              <h1 className="text-base font-bold md:text-lg lg:text-left lg:text-2xl">
                {owner.name ?? owner.username}'s Notes
              </h1>
            </Link>
            <ul className="overflow-y-auto overflow-x-hidden pb-12">
              {notes.map((note) => (
                <li key={note.id}>
                  <NavLink
                    to={note.id}
                    className={({ isActive }) =>
                      cn(navLinkDefaultClassName, isActive && 'bg-accent')
                    }
                  >
                    {note.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="relative col-span-3 bg-accent md:rounded-r-3xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
