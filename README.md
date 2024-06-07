# Epic Notes

This is my version of Epic Notes started from scratch with a clean install of Remix.

Following each lesson in the Epic Web Foundations Workshop, I will add only what is nessessary to make this real world app work. The reasoning is that there is a lot of stuff allready provided in the workshop to be able to focus on each topic. This is great but then it is my task as a learner to figure out how to implement each topic in a fresh application setup like I would in the real world.

## setup for the initial commit

1. [Create remix app](https://remix.run/docs/en/main/start/quickstart#installation)
2. [Install and config tailwind](https://tailwindcss.com/docs/guides/remix)
3. Move page content `<p>Hello World</p>` from workshop root.tsx to "routes/\_index.tsx".
   The new Remix app already has Outlet and Meta setup to work this way. The workshop will get to this later.
4. Change the title and description in "routes/\_index.tsx".
5. Copy the favicon ico and svg files from the workshop and follow instructions to add them
   in the links function.

From here, Just follow the lessons. Research each topic. Information is provided in detail in the lessons, the links in the lessons, and in the Remix docs. Make changes as nessessary.

New Remix apps use Vite instead of the classic Remix Bundler. This will mean that some things in the workshop are not needed any more or may need to be modified.

For example now you can just directly import the global.css file and not worry about using cssBundleHref. In fact cssBundleHref is not included in a new app and the docs for it will point you to the Remix/Vite docs.

A good way to figure out what is going on here when things are different or confusing is to refer to the [Migration Docs](https://remix.run/docs/en/main/guides/vite#migrating) for what changes.

## Notable Changes

- [Don't use cssBundleHref](https://remix.run/docs/en/main/guides/vite#remove-remix-runcss-bundle)
- [Add ?url to css imports](https://remix.run/docs/en/main/guides/vite#fix-up-css-imports-referenced-in-links)
- [Layout and children explained](https://remix.run/docs/en/main/file-conventions/root#layout-export)
