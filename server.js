var Tx = require('ethereumjs-tx');
var Web3 = require('web3')
var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8546/'))

// set token source, destination and amount
var myAddress = "0x4822f62742F6F3C74E6CbD3809EF034e3151A59e"
var toAddress = "0x921EBB742AC0C05Acb339B0EDb8Fa679fAc55194"
var amount = web3.utils.toHex(1e10)

// get transaction count, later will used as nonce
var count = 0
web3.eth.getTransactionCount(myAddress).then(function(v){console.log(v); count = v})

// set your private key here, we'll sign the transaction below
var privateKey = new Buffer('1b2e38e2443d43aae5b5c586e542c141637b9792c31b852496a6a7adce1834f6', 'hex')

// Get abi array here https://etherscan.io/address/0x86fa049857e0209aa7d9e616f7eb3b3b78ecfdb0#code
var abiArray = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"INITIAL_SUPPLY","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}];

var contractAddress = '0x32dd0112da4031c10e934c42431b81b26f95b82e'
var contract = new web3.eth.Contract(abiArray, contractAddress, {from: myAddress})

var rawTransaction = {"from":myAddress, "gasPrice":web3.utils.toHex(2 * 1e9),"gasLimit":web3.utils.toHex(210000),"to":contractAddress,"value":"0x0","data":contract.methods.transfer(toAddress, amount).encodeABI(),"nonce":web3.utils.toHex(count)}
var transaction = new Tx(rawTransaction)
transaction.sign(privateKey)

web3.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'))

// check the balance
contract.methods.balanceOf(myAddress).call().then(function(balance){console.log(balance)})
