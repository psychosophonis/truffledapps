## Deploying and Interacting with a none-too smart contract.

This repo includes files for building truffle example projects/tutorials (much of which we are still discovering and working through.)

The first tutorial is an extension of our 'Greeter' hello world examples linked on our web page.
The second set of files is for a more complex project puts a web frontend on a gambling contract BouncingWishingWell.sol.

The tutorial details below the numbered steps adds more explanation but leaves out many steps already performed in our first tutorial.... if you skip a step you will not succeed. You must have changed or copied across index.html, app.js, truffle.js, greeter.sol, 2_deploy_contracts.js, unlocked your account, and truffle migrate your contract to the rinkeby network for any of this to work.

The numbered steps try to repeat _all_ necessary steps to migrate and interact with the greeter project.
If I have left anyhting out let me know.

1. Run and sync a local geth node on the rinkeby network;

geth --networkid=4 --datadir=$HOME/.rinkeby --cache=1024 --bootnodes=enode://a24ac7c5484ef4ed0c5eb2d36620ba4e4aa13b8c84684e1b4aab0cebea2ae45cb4d375b77eab56516d34bfbd3c1a833fc51296ff084b770b94fb9028c4d25ccf@52.169.42.101:30303 --rpc --rpcapi db,eth,net,web3,personal --rpcport 8545 --rpcaddr 127.0.0.1 --rpccorsdomain "*"

2. Make a new directory for your truffle project - call it greeter. (if you already have a greeter folder you can call it something else)
3. Navigate to that folder in a command line editor.
4. With truffle installed type > truffle init webpack. (you may need to install nodejs and truffle before proceeding) (see more detail below)
5. This should create a truffle project structure with many new directories and files created inside you greeter directory.
6. Open this link [greeter.js](greeter.js) and copy the RAW code (click RAW, then select all, then copy).
7. Paste the contents of this file into the file app.js that you have just created and which resides in the app>javascripts> folder of your new truffle project directory.
8. Open this link [greeter.html](greeter.html) and copy the RAW code (click RAW, then select all, then copy).
9. Paste the contents of this file into the file index.html that you have just created and which resides in the app> folder of your new truffle project directory.
10. Run the command 'truffle console' 
11. At the new console prompt type web3.eth.accounts[0] and copy the wallet address that the command returns. If no number is returned create a new account by typing web3.personal.newAccount('verystrongpassword') (replacing the password with your own)
12. Open this link [truffle.js](truffle.js) and paste the contents into the truffle.js file that is in the root of your truffle project. Change the 'account from' address to the number of the address you just created and save the file.
13. Open this link [greeter.sol](greeter.sol) and copy and paste the contents into a new file. Save the file as greeter.sol to the contracts folder of your truffle project.
14. Open this link [2_deploy_contracts.js](2_deploy_contracts.js) and paste the contents into the file 2_deploy_contracts.js that resides in the >migrations folder of your truffle project.
15. Change the message that you will write to the contract to something of your own. Save the file.
16. In the truffle console (type the command > truffle console) unlock your default account by typing;
personal.unlockAccount("0x10afa70143dc4f099f729815683727b0f926745", "veryStrongPassword") replacing the account address with you own default address that you copied earlier and your own password.
17. The truffle console should read 'true' if the account is unlocked succesfully.
18. Go back to the root of your truffle project within the command line editor. Type > truffle compile.
19. If you recieve no error try > truffle migrate  (you may need to use truffle migrate --reset of youve tried before)
20. The command line shoud tell you it is 'Saving successful migration to network...' if all has gone well.
21. Run the command > npm run dev , which will start a local web server on your computer.
22. If your javascript compiles ok and has no errors the console will tell you that the file has compiled succesfully and will give ypu the address of a localhost server.
23. Look for a URL that says localhost:/8080 (or seomthing like it) - copy and paste it into a browser to run your dApp.
24. The browser should return the message you wrote to the blockchain.
25. Open the app.js file and the index.html file. 
26. You may now edit these freely.... try adding some more information from the blockchain by exploring these commands: https://github.com/ethereum/wiki/wiki/JavaScript-API


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

In this tutorial we will build the simplest possible interaction between our browser and blockchain. We will do this by baking all the steps required to interact with the contract into a javascript file and use a html file to display the result. 
This simple example wont do much - it will return the message we wrote to the blockchain via the greeter.sol contract as a proff of concept/hello world. 

### Initalising Truffle and Webpack

In the first tutorial we made a new directory for our project, opened that directory via the console/terminal and ran

> >truffle init

this set up a bunch of folders for our truffle project.

In order to extend our project using Truffle's Dapp (distributed application) development fucntionality and build process we need to initialise the project using:

> _>truffle init webpack_

if this command is reject you have a newer verison of truffle and should try;

> truffle unbox webpack

instead.

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

from the directory and truffle will build and serve a test project at a local address (localhost://8080 or something similar that it will report in the console). You can then open your project at this address. 

If your app.js files compiles correctly (it has no errors) the _npm run dev_ process running in the console will let you know - if not it will give you errors that can direct you to the problem. The other place to look for errors and test for problems is using the javascript colnsole in you browser's development tools.

### Building and deploying.

When we are happy that our tested dApp works using the _>npm run dev_ testing environment we can run;

> _> npm run build_

and Truffle will package all the dependencies with our dApp code in the index.html and app.js file saved/updated in the build directory of our Truffle project. These files can be copied out and served from any web server that has access to an ethereum node. 

## Tutorial Files.

I have added four files to this repository with the important files (_greeter.html_ and _greeter.js_ heavily commented so that you can follow along with the code in situ. Load the code from these files (copy and replace the original code contents) into the _index.html_ and _app.js_ files that reside in your projects _app_  directory. Reading through them is a good way to process and explore the tutorial/example.

- [greeter.html](greeter.html) (this will become your index.html file)
- [greetr.js](greeter.js) (this will become your app.js file)
- [greeter.sol](greeter.sol)
- [greeter.json](greeter.json)

Copy the code from greeter.html and greeter.js into your index.html and app.js files directly, replacing the contact that is there and developing from there. If your greeter.sol contract looks like mine not much should need changing in order for your greeter 'dApp' to work.


