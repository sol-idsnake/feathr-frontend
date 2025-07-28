# Star Wars App

## Available Scripts

In the project directory, you can run:

- `yarn build`
- `yarn lint`
- `yarn dev` (http://localhost:3000)
- `yarn test`

To get the app up and running, simply yarn to install dependencies, then use dev or build

## Added dependencies

- Axios - network requests (api.ts)
- @tanstack/react-query - data-fetching and caching library (queryClient.ts)
- react-router-dom - routing

## Features

- simple route navigation between people, starships, and planets
- detail view available for people, showing additional information about person starships and homeworlds
- hooks to handle various data

## Approach

- Find a common denominator between entity types to make the app dry, scalable, and performant
- Use cached queries (could be enhanced)
- Avoid complicated state by keeping data simple

## Challenges

- Formatting data in a person detail view due to multiple required fetches
- Pagination between .dev and .info api endpoints
- Keeping the app simple

## Future improvements

- Implement pagination
- Add detail routes for more entities
- Add Zustand stores to keep track of theming
- handle difference between endpoint route/label
