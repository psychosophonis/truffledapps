import "../stylesheets/app.css";
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract';
import wishingWell_artifacts from '../../build/contracts/wishingWell.json';


var well = contract(wishingWell_artifacts);

// var abi = JSON.parse('[{"constant":false,"inputs":[],"name":"deposit","outputs":[{"name":"","type":"uint256"}],"payable":true,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"LogRoundOver","type":"event"}]');
// var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
 
 if (typeof web3 !== 'undefined') {
            window.web3 = new Web3(web3.currentProvider);
        } else {
            window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        }


// var wellInterface = web3.eth.contract(abi);
// var well = web3.eth.contract(abi).at('0x8ae88e50ec2d803f6d59ea15a8f9105be0da2ebc'); 

var contractAddress = '0x8ae88e50ec2d803f6d59ea15a8f9105be0da2ebc';

well.setProvider(web3.currentProvider);

web3.eth.defaultAccount = web3.eth.accounts[0];
console.log(window.web3.eth.defaultAccount);

$(document).ready(function() {

 document.getElementById('walletAdd').value =  web3.eth.defaultAccount;
 console.log("Document Readyish");
 var defaultAddress = document.getElementById('walletAdd').value;

 web3.eth.getBalance(web3.eth.defaultAccount, function(err, res) {
 		var resEth = web3.fromWei(res);
        document.getElementById("balance").innerText = ""+resEth;
    });


})



window.unlock = function(defaultAddress,pass){

  var defaultAddress = document.getElementById('walletAdd').value;
  var pass = document.getElementById('pswd').value;
  // console.log(defaultAddress);
  // console.log(pass);
  web3.personal.unlockAccount(defaultAddress,pass, 1500);

}



window.deposit = function() {


well.deployed().then(function(wellInstance){

  var defaultAddress = document.getElementById('walletAdd').value;
  var amount = document.getElementById('amnt').value;

       return wellInstance.deposit({from: defaultAddress, value: web3.toWei(amount, "ether"), gas:'3000000'});
 
     
     }).then(function(amount){

  	  var amount = document.getElementById('amnt');
  	  console.log("amount deposited:" + amount);
      amount.innerHTML = "You threw " + amount + " Ether into the Wishing Well";

  	 })


}

 console.log('Check web3:' + web3.eth.defaultAccount);

 web3.eth.filter('pending').watch(function(){

  web3.eth.getBlock('pending', function(error, result){
 
  //console.log(result);
  //console.log(result.hash);
  var blockNumber = result.number;
  document.getElementById('latestBlock').innerHTML = result.number;
  document.getElementById('latestBlockTimestamp').innerHTML = Date(result.timeStamp);
  var contractString = JSON.stringify(web3.eth.getStorageAt(contractAddress))
  document.getElementById('contractString').innerText = contractString;
  //var storageObject = web3.eth.getStorageAt(contractAddress);
  // document.getElementById('amountDeposited').innerText = web3.toAscii(storageObject['0x']) + ' ' + web3.toAscii(storageObject['0x01']);

 })
})    
       

 






