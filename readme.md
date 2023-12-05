# Bruin Connect

## Software used

- NodeJS 21 with yarn
- NextJS 13 using the **app router**
- Supabase
- React
- Material UI and Emotion CSS

Other libraries can be viewed in the `package.json`.

## Configuration

Please ensure that you have `NodeJS > 21.0.0` installed (it might work with older versions).

This project uses the `yarn` package manager, which is *technically* incompatible with `NodeJS`'s default `npm`. Install `yarn` using `npm i --global yarn`.

To install project dependencies, ensure the current working directory is the root and use the command `yarn`.

This project requires some environment variables to work. Note that the Supabase key is a public key, so no worries about it being on the repo.

Paste these lines into a file named `.env` in the root of the project.

```ini
NEXT_PUBLIC_SUPABASE_URL=https://rfwcuudvpubixktmmbpu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmd2N1dWR2cHViaXhrdG1tYnB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgxMjMwNTgsImV4cCI6MjAxMzY5OTA1OH0.CWTRsuUpI62h-N-kGPI9x-M9gKx91FoSaQG4fUFiDYg
```

To start the app, use `yarn dev` and navigate to `localhost:3000` in your web browser.

## Credits

All images are either owned by the creators of this project or come from [Pixabay](https://pixabay.com/)
