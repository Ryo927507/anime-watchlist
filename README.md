# AnimeWatchlist

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.14.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Firebase user directory

Anime collections remain named after the username. To allow a user with an empty anime list to log in, add a document to the Firestore `users` collection with the exact username as its document ID (for example, `users/Ry0nosk3`). The document can contain a field such as `active: true`.

Users whose anime collection already contains documents are also recognized without a directory entry. Add directory entries for users who need to remain valid even after their last anime document is deleted. Firestore Security Rules must allow the app to read the corresponding `users/{username}` document and anime collection.

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
