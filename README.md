## Greeter with a Javascript/HTML front end.

In this example/tutorial I will extend the 'greeter' example explored at the Polygon Door website (http://polygondoor.com.au/hello-world-on-ethereum-blockchain/) by adding a web (html/javascript) front end that will return the message we wrote to the blockchain via the greeter.sol contract. I will assume you have followed that tutorial.

In this tutorial we will build the simplest possible interaction between our browser and blockchain. We will do this by baking all the steps require to interact with the contract into a javascript file and use a html file to display the result. 

All this example will do is print a message to the browser window using a call to a deployed contract.

### Initalising Truffle and Webpack

In the first tutorial we made a new directory for our project, opened that directory via the console/terminal and ran

> truffle init

this set up a bunch of folders for our truffle project.

In order to extend our project using Truffle's Dapp (distributed application) development fucntionality and build process we need to initialise the project using:

>truffle init webpack

This adds all the dependencies we require in order make use of Truffles web framework - allowing us to build a final Javascript file that includes a number of libraries that make it easier to interact with a deployed contract via a browser. It will also provide tools for easily testing and serving our files locally for testing.

If you have a deployed contract already you should intialise a new project (truffle init webpack) in a new directory and copy your contract, migration files, and build > contract > \*.jsonfiles into the new directory structure. 

### The Truffle dApp directory structure.

Once you have run >truffle init webpack The new directory will include a number of directories that extend the simple 
_> truffle init_ directory structre.


These include an 'app' directory.

Open the _'app'_ directory and you will find an _index.html_ file and a _javascripts_ folder.
In the _javascripts_ folder you will find a file called _'apps.js'_

In the truffle environment these are the files (index.html and app.js) that we will develop and test with before we 'build' a project that bakes in all the required dependencies. When we....

> Truffle build 

...the project Truffle takes these files and uses them to build a deployable version of your dApp that includes all the necessary javascript dependecies - in files that are also named index.html and app.js but which reside in the 'build' directory.

Another important element in our directory structure are the \*.json files in our _build/contracts directory

These files include all the information that we struggled to wrangle in our first 'greeter' contract tutorial. Truffle records your ABI and your contract Address in these files and makes it easier for us to import them - this avoids the whitespace and parseing steps of our first tutorial. 

### The process of developing a javascript/html front end.

The process of developing a frontend with which to interact with our contract involves editing the _index.html_ and _app.js_ files in the apps directory. 

We can then run the command;

_> npm run dev_ 

From the directory and truffle will build and serve a test project at a local address (localhost://8080 or soemthing similar that it will report in the console). You can then open your project at this address. 

If your app.js files compiles the npm run dev process running in the console will let you know - if not it will give you errors that can direct you to the problem. The other place to look for errors and test for problems is using the javascript colnsole in you browser's development tools. 

## Tutorial Files.

I have added four files to this repository with the important files heavily commented. Loading these files into your directory and reading through them is a good way to process with the tutorial/example.

greeter.html (this will become your index.html file)
greeter.js (this will become your app.js file)
greeter.sol
greeter.json

You can copy the code from greeter.html and greeter.js into your index.html and app.js files directly, replacing the contact that is there and developing from there. If your greeter.sol contrcat looks like mine not much should need changing.


