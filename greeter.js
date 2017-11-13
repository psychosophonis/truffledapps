/* Tutorial files for adding the simplest possible hello world front end to a dapp thats displays 
the message of the greeter contract.*/

/* - First lets load all of our dependencies. The first import is a style sheet (this has nothing to do with contract interactions and can be left out)
 - Secondly we load our web3 library which allows us to interact with eth via javascript
 - The truffle-contract library makes it easy for us to create a javascript instance of our greeter contract by importing
 the ABI (Application Binary Interface) and the contract Address and handling the parsing of those details.
 - The greeter_artifacts import directs us to the json file that holds the ABI and Contract address used to create a contract instance
 with which we can interact. 
 
 */

import "../stylesheets/app.css";
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract';

/* you may need to change the address below to reflect the name and location of your contract.json file  ('../../build/contracts/greeter.json';)
*/

import greeter_artifacts from '../../build/contracts/greeter.json';


/* make a variable called _greeter_  (this could be called anything) that holds an instance of the contract 
using the ABI (application binary interface) and the Contract adress we imported as _greeter_artifacts_ above.  

The contract function is part of the truffle-contract library we imported at the top*/ 

var greeter = contract(greeter_artifacts);

/* The next block of code tests to see if we have a web3 provider set up already. 

If we don't it sets up a locally hosted instance of web3 (this is apprently not a good thing security wise and you should never serve a production dApp this way.)
I have also commented out a line that we would drop in in place of this localhost version in order to use the infuria web hosted node of ethereum.
You shoud drop in your own infuria account number here. I've edited mine so it doesn't work
)
*/

 if (typeof web3 !== 'undefined') {
            window.web3 = new Web3(web3.currentProvider);
        } else {
		
	window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
           // window.web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/YLZyKiQKOMWSxEZMnR"));  
		
        }

/* set our contract instance greeter to use the current web3 provider (found above) (we instantiated this above in line 30) */

greeter.setProvider(web3.currentProvider);

/* In this example we don't need to use our eth/geth accounts because a 'call' to simply return a value from the blockchain 
doesn't cost us any gas - That said we can use these lines to ensure web3 is working and speaking to our local ethereum node. 

In order to do this in the background we simply write a returned value (the address of the default geth account) to the javascript console log.
If everything is working you should be able to see this value returned in the javascript console that is one of the development tools 
included with your web browser 
*/

web3.eth.defaultAccount = web3.eth.accounts[0];
console.log(web3.eth.defaultAccount);

/* This is the important bit. 
/* first we check to see if our javascript contrcat instance corresponds to an actual deployed contract. */

 greeter.deployed().then(function(contractInstance) {
	 
	 /* If the contract is deployed then we can call the function that returns our greeting 
	 - using a call function allows us to poll the blockchain without writing a transaction to the blockchain
	 and without (therefore) spending gas */
	 
	/* Because this function simply returns a single value (a text string) we need only assign that
	value to the variable 'result' which we can then use elsewhere in our function */ 
	 
       return contractInstance.greet.call();
   }).then(function(result){

	/*  Here i log the returned value assigned to the variable 'result' to the console as a way of checking the javascript output */ 
	/* I can (and do) use these console.log() commands to test what is happening at particular places in my script.*/
	 
    	console.log(result); 
	
	/* The final lines of our code replace the values between our html <span id = greeting_text></span> tags in our html with the
	value stored in our result variable. */
	
    	var div = document.getElementById("greeting_text");
    	div.innerHTML = result;

    

   });

// M8
