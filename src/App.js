import React, { useState, useEffect } from 'react';
import './App.css';
import { ethers } from 'ethers';

function App() {


  

  useEffect(() => {
    const fetchContract = async()=> {
      const provider = new ethers.providers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
    }
    updateBalance();
    fetchContract();
  }, []);


  const contractAddress = '0x8640691aB51E3FBfA4343c9Dd9dA7A7565D959b5';
  const contractABI = [
    [
      {
        "inputs": [],
        "name": "deposit",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "Deposited",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "Withdrawn",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "balances",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "user",
            "type": "address"
          }
        ],
        "name": "getBalance",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getTotalDeposits",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "totalDeposits",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ]
  ];

  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');

  const updateBalance = async () => {
    const contract = new ethers.Contract(contractAddress, contractABI, provider);
    const provider = new ethers.providers.BrowserProvider(window.ethereum);
    const userAddress = window.ethereum.selectedAddress;
    const userBalance = await contract.getBalance(userAddress);
    setBalance(userBalance.toNumber());
  };



  const deposit = async () => {
    const contract = new ethers.Contract(contractAddress, contractABI, provider);
    const provider = new ethers.providers.BrowserProvider(window.ethereum);
    const tx = await contract.deposit({ value: ethers.utils.parseEther(amount) });
    await tx.wait();
    updateBalance();
  };

  const withdraw = async () => {
    const provider = new ethers.providers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, contractABI, provider);
    const tx = await contract.withdraw(ethers.utils.parseEther(amount));
    await tx.wait();
    updateBalance();
  };

  return (
    <div className="App">
      <h1>SimpleLending React App</h1>
      <p>Your Balance: {balance} ETH</p>
      <input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={deposit}>Deposit</button>
      <button onClick={withdraw}>Withdraw</button>
    </div>
  );
}

export default App;
