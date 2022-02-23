pragma solidity ^0.8.10;


///We created a smart contract using the contract keyword and named it Contacts
contract Contacts {
///we create a state public variable called count
  uint public count = 0; // state variable

///Next, we created a structure using the struct keyword and named it Contact
  struct Contact {
    uint id;
    string name;
    string phone;
  }


///we added one contact to the contract by calling the createContact function, which is declared at the end of this contract class.
///We declared createContact and passed name and phone as parameters
  constructor() public {
    createContact('Johnson Bris', '8989889');
  }

///We created map to add contacts in our contract.
  mapping(uint => Contact) public contacts;



  ///the state variable count is being update, which I use as an id in contacts map

  function createContact(string memory _name, string memory _phone) public {
    count++;
    contacts[count] = Contact(count, _name, _phone);
  }
}