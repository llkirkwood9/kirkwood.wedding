# Kirkwood Wedding Dashboard

## Requirements

- Visual Studio Code
    - https://code.visualstudio.com/
- Node JS
    - https://nodejs.org/en

## Required VS Code Extensions

- **Prettier**
    - Provides consistent formatting of code
    - Autheo: Prettier
    - Link: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

- **Better Comments**
    - Provides better comment highlighting
    - Author: Aaron Bond
    - Link: https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments

- **Todo Tree**
    - Provides TODO highlighting and visualizer
    - Author: Gruntfuggly
    - Link: https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree

- **ES7+ React/Redux/React-Native snippets**
    - Provides snippets for react + ts
    - Author: dsznajder
    - Link: https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets

- Material Icon Theme - Optional
    - Changes folder icons. Not required, just comsetic
    - Author: Philipp Kief
    - Link: https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme

## Opening the project

When opening the project, make sure you open the

### `dashboard.code-workspace`

file in Visual Studio Code.

## Running Project

Before running the project, you must run:

### `npm install`

This will install all required modules and dependencies.

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:5123](http://localhost:5123) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Debugging

Press `F5` after running the project to attach the debugger.

Chrome is set as the default browser and will automatically be launched.

## Secrets Management

- The `.env.local` file stores important IDs/API keys. This file is not comitted to the repo and for security purposes, should never be.