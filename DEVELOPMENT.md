## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/core`: core game functionality
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo
- `@repo/tailwind-config`: a [Tailwind CSS](https://tailwindcss.com/) configuration shared by both `web` and `docs` applications
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

It additionally has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## Getting `pnpm`

To run anything inside the project, you'll need [`pnpm`](https://pnpm.io/).

```shell
npm install --global pnpm
```

## Commands

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```
