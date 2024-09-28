import Web3 from 'web3';
import mintContract from './contracts/raha.json'; // Import the JSON file of your contract

const nftContract = web3 => {
    return new web3.eth.Contract(
        mintContract,  
        "0x07966752b3b4716DaC0f7D28Fef5C87213baC2B5"
    )
}


export default nftContract