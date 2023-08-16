## Project 

### Functionality

1. Displays the next 10 days on the left, with the respective available meeting slots for booking on the right
2. Parses the date ranges and time windows per user's specific timezone

## To-Do

1. Implement `date-fns` to work with one format of Date objects and transforming them per need instead of having multiple different versions and strings floating around
2. Separate hooks out of components for separation of concerns
3. Error handling in a more graceful manner, and bubbling the error up the stack where necessary instead of catching right where it occurs
4. Memoize the time slots so that we're not recomputing them for the same date range

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
