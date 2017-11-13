In this example/tutorial I will extend the 'greeter' example explored at the Polygon Door website (http://polygondoor.com.au/hello-world-on-ethereum-blockchain/) by adding a web (html/javascript) front end that will return the message we wrote to the blockchain via the greeter.sol contract.

I will assume you have followed that tutorial.

In the first tutorial we made a new directory for our project, opened that directory via the console/terminal and ran

> truffle init

this set up a bunch of folders for our truffle project.

In order to extend our project using Truffle's Dapp (distributed application) development fucntionality and build process we need to initialise the project using:

>truffle init webpack

This adds all the dependencies we require in order make use of Truffles web framework - allowing us to build a final Javascript file that includes a number of libraries that make it easier to interact with a deployed contract via a browser. It will also provide tools for easily testing and serving our files locally for testing.

If you have a deployed contract already you should intialise a new project (truffle init webpack) in a new directory and copy your contract, migration files, and build > contract > \*.jsonfiles into the new directory structure. 

Once you have run >truffle init webpack The new directory will include a number of directories that extend the simple 
_> truffle init_ directory structre.

These include an 'app' directory.

Open the _'app'_ directory and you will find an _index.html_ file and a _javascripts_ folder.
In the _javascripts_ folder you will find a file called _'apps.js'_

In the truffle environment these are the files (index.html and app.js) that we will develop and test with before we 'build' a project that bakes in all the required dependencies. When we....

> Truffle build 

...the project Truffle takes these files and uses them to build a deployable version of your dApp that includes all the necessary javascript dependecies - in files that are also named index.html and app.js but which reside in the 'build' directory.

Another important element in our directory structure are the \*.json files in our _build/contracts directory



