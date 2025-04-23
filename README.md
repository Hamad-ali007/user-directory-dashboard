
# User Directory Dashboard

A responsive User Directory Dashboard built with Next.js 13+ App Router, TypeScript, Tailwind CSS, and shadcn/ui components.

## Features

- Responsive design with table view on desktop and card view on mobile
- User data fetching with pagination
- Search and filter functionality
- CRUD operations (Add, Edit, Delete)
- Type safety with TypeScript and Zod validation
- Clean project structure with reusable components

## Tech Stack

- Next.js 13+ with App Router
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Zod for schema validation
- React Context API for state management

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/app`: Next.js 13+ App Router pages
- `/components`: Reusable UI components
  - `/components/ui`: shadcn/ui components
  - `/components/users`: User directory specific components
  - `/components/dashboard`: Dashboard components
  - `/components/search`: Search functionality components
- `/lib`: Utility functions and type definitions
- `/context`: React Context Providers

## Implementation Details

- **Responsive Design**: The application switches between table view (desktop) and card view (mobile) based on the viewport size.
- **Data Fetching**: Uses the Random User API to fetch user data with pagination support.
- **Type Safety**: All data is validated using Zod schemas.
- **State Management**: Uses React Context API for managing application state.
- **CRUD Operations**: Add, Edit, Delete functionality implemented with client-side state management.
