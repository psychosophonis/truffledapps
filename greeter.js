import "../stylesheets/app.css";
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract';
import greeter_artifacts from '../../build/contracts/greeter.json';


var greeter = contract(greeter_artifacts);

 if (typeof web3 !== 'undefined') {
            window.web3 = new Web3(web3.currentProvider);
        } else {
            window.web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/YLZyKiQKOMWSxEZMnRM8"));
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
