# Stock App

A modern stock tracking web application built with Next.js, TypeScript, and MongoDB.

## Features

- User authentication (sign in/up)
- Search and view stock details
- Add/remove stocks to personal watchlist
- Real-time stock data via TradingView widget
- Daily email updates for favorite stock rates using Nodemailer
- Responsive UI with custom components

## Project Structure

```
src/
     app/                # Next.js app directory (routing, layouts, pages)
     components/         # Reusable UI and form components
     database/           # Mongoose setup and models
     hooks/              # Custom React hooks
     lib/                # Utilities, constants, actions, integrations
     middleware/         # Middleware logic
     types/              # TypeScript global types
```

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Set up environment variables**

   - Create a `.env.local` file with your MongoDB URI, email credentials, and any API keys.

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000) in your browser** — This is the Stock App development server.
5. **Open [http://localhost:8288](http://localhost:8288) in your browser** — This is the Inngest event server.

## Scripts

- `npm run dev` — Start development server
- `npx inngest-cli@latest dev` - Start inngest server
- `npm run build` — Build for production
- `npm start` — Start production server

## Tech Stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB & Mongoose](https://mongoosejs.com/)
- [TradingView Widget](https://www.tradingview.com/widget/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Nodemailer](https://nodemailer.com/) — Email notifications for favorite stocks

## Additional Tools

- [Auth.js](https://authjs.dev/) — Secure authentication solution
- [Inngest](https://www.inngest.com/) — Background jobs and event-driven workflows
