# Ajedrez

_Ajedrez: Chess in Spanish_

## Starting the Project

---

### First Boot Up

```sh
# Compile the TypeScript codebase -- this needs to be done after any changes to the source files.
$ yarn build
```

### Starting the server

```sh
$ yarn start
```

## Testing & Type Checking

---

### Type Checking the Project

```sh
# Type check the project with `tsc` --noEmit to prevent compiled output
$ yarn tc
```

### Testing the Project

#### Unit Tests

```sh
# Run Full Unit Test Suite
$ yarn test
```

```sh
# Run Subset of Unit Test Suite (yarn test "MatchingString")
$ yarn test services/game
```

#### Integration Tests

```sh
# Run Full Integration Test Suite
$ yarn test:integration
```

```sh
# Run Subset of Integration Test Suite (yarn test:integration "MatchingString")
$ yarn test:integration "Game"
```

#### E2E Tests

```sh
# Run Full E2E Test Suite
$ yarn test:e2e
```

```sh
# Run Subset of E2E Test Suite (yarn test:e2e "MatchingString")
$ yarn test:e2e "Game"
```

#### CI/CD Testing

Utilize the same commands as above, but with the `--ci --silent` flags (you'll usually do this inside of a jenkins file or github actions workflow).

Documentation for [`--ci`](https://jestjs.io/docs/cli#--ci)<br>
Documentation for [`--silent`](https://jestjs.io/docs/cli#--silent)

```sh
$ yarn test:e2e --ci --silent
```
