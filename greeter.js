// Tutorial files for adding a front end to display the greeter message.

/* First lets load all of our dependencies. The first import is a style sheet 
 - this has nothing to do with contract interactions and can be left out 
 
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


/* make a variable called greeter that holds an instance of the contract (this could be called anything) 
that holds a parsed contract Interface based on the ABI and the Contract adress
we imported as greeter _artifacts above.  

The contract function is part of the truffle-contract librayr we imported at the top*/ 

var greeter = contract(greeter_artifacts);

/* The next block of code tests to see if we have a web3 provider set up already. 
If we haven't it sets up a locally hosted instance of web3 (this is apprently not a good thing security wise and you should never serve a production dApp this way.)
I have also commented out a line that we would drop in instead of this local host version in order to use the infuria web hosted node of ethereum.
You shoud drop in your own infuria account number here. Ive edited mine so it doesn't work
)



*/

 if (typeof web3 !== 'undefined') {
            window.web3 = new Web3(web3.currentProvider);
        } else {
		
	window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
           // window.web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/YLZyKiQKOMWSxEZMnR"));  
		
        }

greeter.setProvider(web3.currentProvider);

web3.eth.defaultAccount = web3.eth.accounts[0];
console.log(web3.eth.defaultAccount);

 greeter.deployed().then(function(contractInstance) {
       return contractInstance.greet.call();
   }).then(function(result){

	
    	console.log(result); 
    	var div = document.getElementById("greeting_text");
    	div.innerHTML = result;
	

     //  $("#" + greeting_text).html(result.toString());

    

   });

// M8
