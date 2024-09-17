import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'; 
import Web3 from 'web3';
import nftContract from './nftContract';
import './app.css'; 

function App() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [mintAmount, setMintAmount] = useState(1); 
  const [isConnected, setIsConnected] = useState(false); // New state for connection status

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        const accounts = await web3Instance.eth.requestAccounts();
        setAccounts(accounts);

        const instance = nftContract(web3Instance);
        setContract(instance);

        setIsConnected(true); // Set connection status to true after successful connection

      } catch (error) {
        console.error(error);
      }
    } else {
      console.error('Web3 not found');
    }
  };

  const promptForMintAmount = () => {
    const userAmount = prompt("Enter the number of NFTs you want to mint:", mintAmount);
    const parsedAmount = parseInt(userAmount, 10);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert("Invalid number of NFTs. Please enter a positive integer.");
    } else {
      setMintAmount(parsedAmount);
    }
  }; 

  const mint = async () => {
    try {
      const costPerNFT = Web3.utils.toWei('0.05', 'wei');
      const totalCost = Web3.utils.toWei((costPerNFT * mintAmount).toString(), 'ether');

      await contract.methods.mint(accounts[0], mintAmount).send({ from: accounts[0], value: totalCost });
      alert('Minting successful!');
    } catch (error) {
      console.error("Minting failed!", error);
    }
  };

  return (
    <div className="first-one">
      <h1>Minting Machine App</h1>
      {isConnected ? ( // Show this section if the wallet is connected
        <div className="page-container">
          <div className="container">
            <div className="wallet-status">
              <p className="text">Your Wallet is connected</p>
              <FontAwesomeIcon icon={faCircleCheck} style={{ color: '#63E6BE' }} />
            </div>
            <button onClick={promptForMintAmount} className="prompt-button">Set Mint Amount</button>
            <button onClick={mint} className="mint-button">Mint {mintAmount} NFT(s)</button>
          </div>
        </div>
      ) : ( // Show this section if the wallet is not connected
        <div className="connect-button-container">
          <button onClick={connectWallet} className="connect-button">Connect Wallet</button>
        </div>
      )}
    </div>
  );
}

export default App;
