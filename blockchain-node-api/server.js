const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes");
const Web3 = require("web3");
const mongodb = require("mongodb").MongoClient;
const contract = require("@truffle/contract");
const artifacts = require("./build/contracts/Contacts.json");
const CONTACT_ABI = require("./config");
const CONTACT_ADDRESS = require("./config");

app.use(cors());
app.use(express.json());

// check for Web3.js and make it interact with blockchain network by providing a localhost address.
if (typeof web3 !== "undefined") {
  var web3 = new Web3(web3.currentProvider);
} else {
  var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
}

// Although no database is used here, it is good to have this prepared for future use. Inside the callback function of the mongodb.connect() function, I’m connecting with Cluster0 and getting accounts from the Ethereum blockchain network.
mongodb.connect(
  "mongodb://127.0.0.1:27017/blockchain-node-api",
  {
    useUnifiedTopology: true,
  },
  async (err, client) => {
    // const db = client.db("Cluster0");
    const accounts = await web3.eth.getAccounts();
    console.log(accounts, 'duud')

    // web3 Contract function to connect with the smart contract
    const contactList = new web3.eth.Contract(
      CONTACT_ABI.CONTACT_ABI,
      CONTACT_ADDRESS.CONTACT_ADDRESS
    );

     console.log(contactList, "duud");
    // routes(app, db, accounts, contactList);
    routes(app, accounts, contactList);
    
    app.listen(process.env.PORT || 5000, () => {
      console.log("listening on port " + (process.env.PORT || 5000));
    });
  }
);
