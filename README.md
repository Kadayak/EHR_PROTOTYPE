# Client / Frontend

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).\
This project uses [Tailwind CSS](https://tailwindui.com/documentation).\
This project uses [React Router](https://reactrouter.com/en/main).

## Prefix

To get the project started, make sure you have _npm_ installed on your computer. Npm is a package manager, which downloads the necessary packages into this directory for the project to run.

After having downloaded npm (`npm -v` in the terminal should now give you your npm version), please run `npm install`in the directory. This command will run all the necessary packages, as provided in the package.json file.

Now, your directory should have a `node_modules` folder. You should not worry about it, or even really open it. node_modules essentially stores all the packages / code necessary for this project to run. Now, you can start your project!

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# Server / Backend

This backend is made with node.js, using express. It is written using typescript.

## Setting up

To start the server up, you have to have npm on your computer, then in the server directory, install the necessary packages using `npm install`.

Now, you can start the server in development mode using `npm run dev`, or in production mode using `npm start`.

If problems arise, or if setting up is difficult or unclear, let Kristófer know or add to this readme file.

## Tutorials used:

#### [Using typescript with Express](https://youtu.be/qy8PxD3alWw)

Includes:

- Setting up typescript with node (tsc, typescript, @types/node and @types/express)
- Npm scripts and packages for hot reloading (rimraf, concurrently)

### [Express with typescript and Prisma](https://www.youtube.com/watch?v=PM58NEMJgMw)

Includes:

- Typescript config (tsconfig.json)
