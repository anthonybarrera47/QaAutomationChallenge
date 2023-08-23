# App Setup

1. Fork and clone the repository.
2. At the root directory of the repo, install dependencies by running `yarn` (if needed, [install yarn first](https://yarnpkg.com/getting-started))
3. Run the app by running `yarn start`
4. Create a docker image `docker build -t my-react-app`.
5. Run the docker `docker run -it --rm my-react-app`.

You can add more scripts (or change existing ones) in the [`package.json`](./package.json) file.
