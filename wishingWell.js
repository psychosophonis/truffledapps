import "../stylesheets/app.css";

// import dependencies
// Web3 is the library that allows us to interact with the contract
// truffle-contract extends the eth contract command to provide a means for easily instantiating contracts


import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract';

// import the json file that has recorded the contract address and ABI (application binary interface).

import wishingWell_artifacts from '../../build/contracts/BouncingWishingWell.json';

// instantiate an instance of the contract called well using the artifacts loaded above.

var well = contract(wishingWell_artifacts);
 
// check to see if an instance of web3 is already running - if not load the local version.

 if (typeof web3 !== 'undefined') {
            window.web3 = new Web3(web3.currentProvider);
        } else {
            window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        }

// I just save this address so I can grab it easily later if needed.

var contractAddress = '0xEA3F4243Ea9D4181598B8F54bf300AA105840888';

//use the web3 provider for the well instance.

well.setProvider(web3.currentProvider);

// there are a bunch of commands for which allow us to interact with both out local eth accounts and the local node.
// this one sets the default account and the prints it to the console as a proff that web3 is working well.

web3.eth.defaultAccount = web3.eth.accounts[0];
console.log("web3 is working... Default Account: " + window.web3.eth.defaultAccount);

// when the html document is loaded do this stuff...
// I am basically putting my default account address in the address field of my html form
// and getting and displaying the balance of that account.


$(document).ready(function() {

    // assign the default account address to the 'walletAdd ID' span in the html file
    document.getElementById('walletAdd').value =  web3.eth.defaultAccount;
 
    console.log("Document Readyish"); // this is just here so I see in my console my code got to this point.
 
    // now I'm being a bit silly... but I am assigning the variable I took out of my html form and writing it back to the same place.
   var defaultAddress = document.getElementById('walletAdd').value;

    web3.eth.getBalance(web3.eth.defaultAccount, function(err, res) {
 		var resEth = web3.fromWei(res);
        document.getElementById("balance").innerText = ""+resEth;
    });

    //below is a failed attempt at returning an event log.... still trying to make this work..
    // LogRoundOver is the name of the event.
        var contractInstance = well.at(contractAddress);
        var exampleEvent = contractInstance.LogRoundOver();
            exampleEvent.watch(function(err, result) {
              if (err) {
                console.log(err)
                return;
              }
              console.log(result.args._value)
              })
    // its not returning anything at all : (


})

// below I'm using a form button in my html to trigger a javascript function.
// the function grabs the values form the form and assigns them to local variables.
// it the uses those variables to unlock the default account.

// begining of the unlock function

window.unlock = function(){

      var defaultAddress = document.getElementById('walletAdd').value;
      var pass = document.getElementById('pswd').value;
      web3.personal.unlockAccount(defaultAddress,pass, 1500);

}

//end of the unlock function

// below I'm doing the same as above but this time I'm calling the function that triggers a transaction.
// I'm writing a new value to the block chain here so its going to cost gas and we should see the transaction tick
// over in our block list in the geth console when we trigger the event.

// beginnning of the deposit function

window.deposit = function() {

// check to see if  well deployed make a javascript instance of it called wellInstance ??


well.deployed().then(function(wellInstance){

  // grab the values we need from the html form
  //the default address is the 'from_' address of the transaction.
  // the amount is the 0.06 we wrote to the deposit field earlier.

  var defaultAddress = document.getElementById('walletAdd').value;
  var amount = document.getElementById('amnt').value;

// make a deposit  by calling the deposit function and sending it the values we assigned/fetched above.

       return wellInstance.deposit({from: defaultAddress, value: web3.toWei(amount, "ether"), gas:'3000000'});
       
     
     }).then(function(){


// we should be able to trigger a return here once we receive a receipt form the contract
// but all I have managed to return is the transaction hash.
         
      

    });

}

//end of the deposit function.
// below I get some meta-values from the blockchain based on the Javascript API.
// I use a filter to trigger these events form every new block... and event log should be used instead.
// It should look a lot like this actually ... but I can get a log to return.... tis works for now.

// watch for a new pending block

 web3.eth.filter('pending').watch(function(){

// grab all its data as 'result'

  web3.eth.getBlock('pending', function(error, result){
 

  //get the block number..
  var blockNumber = result.number;

  //put it on the html page..
  document.getElementById('latestBlock').innerHTML = result.number;
  //put its time stamp on the page (the time the last block was mined)
  document.getElementById('latestBlockTimestamp').innerHTML = Date(result.timeStamp);
  
  // in the section below I make a call the contract instance
  //and use it to return the total amount deposited to the well

  var contractInstance = well.at(contractAddress);
  contractInstance.amountDep.call().then(function(result){
      var amountDep_ = web3.fromWei(result.toString(10), 'ether');
  //console.log(amountDep_);
  document.getElementById('amountDeposited').innerText = "We have thrown "+ amountDep_ + " Ether into the Wishing Well";

    })



 })
})


// more failed event listens below...

// var contractInstance = well.at(contractAddress);
//  var exampleEvent = contractInstance.LogRoundOver();
//  exampleEvent.watch(function(err, result) {
//   if (err) {
//     console.log(err)
//     return;
//   }
//   console.log(result.args._value)
//   // check that result.args._from is web3.eth.coinbase then
//   // display result.args._value in the UI and call    
//   // exampleEvent.stopWatching()
// })

   
       

 






