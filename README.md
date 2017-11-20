This repo includes files for building truffle example projects/tutorials 
- much of which we are still discovering and working through.
The first tutorial is an extension of our 'Greeter' hello world examples linked on our web page.
The second set of files is for a more complex project puts a web frontend on a gambling contract BouncingWishingWell.sol.

1. Make a new directory for your truffle project - call it greeter.
2. Navigate to that folder in a command line editor.
3. With truffle installed type > truffle init webpack. (you may need to install nodejs and truffle before proceeding)
4. This should create a truffle project structure with many new directories and files created inside you greeter directory.
5. Open this link (greeter.js)[greeter.js]

web3.eth.accounts[0]



### Directory of files for each project:

#### Wishing Well;

- [wishingWellTutorial.md](wishingWellTutorial.md)
- [wishingWell.sol](wishingWell.sol)
- [wishingWell.js](wishingWell.js)
- [wishingWell.html](wishingWell.html)
- [wishingWell.json](wishingWell.json)

#### Greeter;

- [greeter.html](greeter.html) (this will become your index.html file)
- [greeter.js](greeter.js) (this will become your app.js file)
- [greeter.sol](greeter.sol)
- [greeter.json](greeter.json)

## Greeter with a Javascript/HTML front end.

In this example/tutorial I will extend the 'greeter' example explored at the Polygon Door website (http://polygondoor.com.au/hello-world-on-ethereum-blockchain/).

In this tutorial we will build the simplest possible interaction between our browser and blockchain. We will do this by baking all the steps requiree to interact with the contract into a javascript file and use a html file to display the result. 
This simple example wont do much - it will return the message we wrote to the blockchain via the greeter.sol contract as a proff of concept/hello world. 

### Initalising Truffle and Webpack

In the first tutorial we made a new directory for our project, opened that directory via the console/terminal and ran

> _>truffle init_

this set up a bunch of folders for our truffle project.

In order to extend our project using Truffle's Dapp (distributed application) development fucntionality and build process we need to initialise the project using:

> _>truffle init webpack_

This initialisation process adds all the dependencies we require in order make use of Truffles web framework - allowing us to build a final Javascript file that includes a number of libraries that make it easier to interact with a deployed contract via a browser. It will also provide tools for easily testing and serving our files locally for testing.

If you have deployed a contract already as per the original tutorial you should intialise a new project (truffle init webpack) in a new directory (mkdir) and copy your contract, migration files, and build > contract > \*.jsonfiles into the new directory structure. 

### The Truffle dApp directory structure.

Once you have run;

> _>truffle init webpack_ 

The new directory will include a number of directories that extend the simple , _> truffle init_ , directory structre.

These include an _app_ directory.

Open the _app_ directory and you will find an _index.html_ file and a _javascripts_ folder.

Inside the _javascripts_ folder you will find a file called _apps.js_

In the truffle environment these are the files (_index.html_ and _app.js_) that we will develop and test with before we 'build' a project that bakes in all the required dependencies. When we have finshed our development we will run....

> _>npm run build_ 

... and Truffle takes these files and uses them to build a web deployable version of your dApp that includes all the necessary javascript dependecies - in files that are also named _index.html_ and _app.js_ but which reside in the _build_ directory.

Another important element in our directory structure are the _\*.json_ files in our _build/contracts_ directory

These files include all the information that we struggled to wrangle in our first _greeter.sol_ contract tutorial. Truffle records your ABI and your contract Address in these files and makes it easier for us to import them - this avoids the whitespace and json parsing steps of our first tutorial. 

### The process of developing a javascript/html front end.

The process of developing a frontend with Truffle with which to interact with our Ethereum contracts involves editing the _index.html_ and _app.js_ files in the apps directory. 

Run the command;

> _> npm run dev_

from the directory and truffle will build and serve a test project at a local address (localhost://8080 or soemthing similar that it will report in the console). You can then open your project at this address. 

If your app.js files compiles the npm run dev process running in the console will let you know - if not it will give you errors that can direct you to the problem. The other place to look for errors and test for problems is using the javascript colnsole in you browser's development tools.

### Building and deploying.

When we are happy that our tested dApp works using the _>npm run dev_ testing environment we can run;

> _> npm run build_

and Truffle will package all the dependencies with our dApp code in the index.html and app.js file saved/updated in the build directory of our Truffle project. These files can be copied out and served from any web server that has access to an ethereum node. 

## Tutorial Files.

I have added four files to this repository with the important files (_greeter.html_ and _greeter.js_ heavily commented so that you can follow along with the code in situ. Loading the code from these files into the _index.html_ and _app.js_ files taht reside in your projects _app_  directory. Reading through them is a good way to process and explore the tutorial/example.

- [greeter.html](greeter.html) (this will become your index.html file)
- [greetr.js](greeter.js) (this will become your app.js file)
- [greeter.sol](greeter.sol)
- [greeter.json](greeter.json)

Copy the code from greeter.html and greeter.js into your index.html and app.js files directly, replacing the contact that is there and developing from there. If your greeter.sol contract looks like mine not much should need changing in order for your greeter 'dApp' to work.


