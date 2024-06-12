# @makyo/components

## Requirements
Before you proceed, please make sure your machine has met the following requirements:

| Dependency  |   Version   |
| ----------  | :---------: |
| Node        | >= v14.17.6 |
| NPM         | >= v6.14.15 |

## Quick Start
### Installation

```bash
# clone repo into `makyo-component`
# install project dependencies
cd makyo-component && npm install
npx husky install
```

### Running app

```bash
npm start
```

This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

Then run Storybook for the playground:

### Running Storybook

Run inside another terminal:

```bash
npm run storybook
```

This loads the stories from `./stories`.

> NOTE: Stories should reference the components as if using the library.

### Testing

```bash
npm run build
# move to another project (eg: cd ../next-project)
npm install ../makyo-component # (directory of makyo-component)
```

### Jest

Jest tests are set up to run with `npm test`.

### Bundle analysis

Calculates the real cost of your library using [size-limit](https://github.com/ai/size-limit) with `npm run size` and visulize it with `npm run analyze`.

#### Setup Files

This is the folder structure we set up for you:

```txt
/src
  index.tsx       
/test
  blah.test.tsx   
/stories
  Thing.stories.tsx 
/.storybook
  main.js
  preview.js
.gitignore
package.json
README.md        
tsconfig.json
```

> DONT REPEAT YOURSELF - **HAPPY CODING**