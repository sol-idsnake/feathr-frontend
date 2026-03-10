# Star Wars App

## Available Scripts

In the project directory, you can run:

- `yarn build`
- `yarn lint`
- `yarn dev` (http://localhost:3000)
- `yarn test`

To get the app up and running, simply yarn to install dependencies, then use dev or build

## Tech Stack

- React with TypeScript
- Mantine — component library for UI and responsive layout
- TanStack React Query — fetching, caching, and loading/error state management
- React Router — client-side routing
- Axios — HTTP client with Vite dev proxy for CORS handling
- Jest + React Testing Library — minimal unit and component testing

## Features

- Route navigation between three main entity types
- Detail view for the main three entity types, showing related data
- Search/filter by name within each list view
- Light/dark mode toggle
- Suspense + ErrorBoundary on all data-fetched views
- Avoid redundant fetches by seeding detail views from list cache

## Approach

- Find a common denominator between entity types to make the app DRY and scalable
- Queries are cached for SWAPI's static data.
- Avoid complicated state for entities and their detail views

## Challenges

- Building the data model for an entity detail view due to multiple required fetches

## AI in My Workflow":

- **Claude**
- **Examples of how AI helped you**: Claude searched and summarized documentation, which helped speed up optimization and development of improvements (e.g. useSuspenseQuery). It also assisted with analyzing code paths for debugging, refining and improving typing, and writing tests.
- **Where you pushed back, and why**: Over-engineering solutions and introducing one-off implementations instead of adapting or unifying existing methods. AI often prefers new connections between components rather than extending the project’s existing structure, leading to unnecessary many-to-many relationships and architectural drift.
- **How AI shaped approach or speed**: Acceleration of learning and decision making. A decision becomes technically informed much faster due to research, docs, and context
