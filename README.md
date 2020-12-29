This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

It is meant to serve as a basic example for accessing Withings API data for wearables

## Getting Started

### Add your client and customer keys to a new .gitignored file:

```bash
touch pages/api/constants.hidden.ts
```

Format should be:

```typescript
export const CLIENT_ID = "abcd1234567890";
export const CUSTOMER_SECRET = "1234567890abcdefg";
```

First, run the development server:

```bash
yarn && yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
