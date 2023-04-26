
window.onload = async () => {

    //inizializzazione di cose per la grafica
    var accountbox = document.getElementById("accountbox");
    accountbox.style.display = "none";
    //--------------------------------------------


    //cose dello smart contract

    //connect to metamask
    if (typeof window?.ethereum !== "undefined") {
        try {
            accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            signer = provider.getSigner();
        } catch (error) {
            console.log({ error });
            alert('Wallet non connesso, é necessario ricaricare la pagina!')
        }
    }
    //connect to smart contract
    const abi = '[ { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "accounts", "outputs": [ { "internalType": "string", "name": "nickname", "type": "string" }, { "internalType": "uint256", "name": "creationDate", "type": "uint256" }, { "internalType": "string", "name": "bio", "type": "string" }, { "internalType": "string", "name": "imgIpfs", "type": "string" }, { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "surname", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "_nickname", "type": "string" }, { "internalType": "uint256", "name": "_creationDate", "type": "uint256" }, { "internalType": "string", "name": "_bio", "type": "string" }, { "internalType": "string", "name": "_imgIpfs", "type": "string" }, { "internalType": "string", "name": "_name", "type": "string" }, { "internalType": "string", "name": "_surname", "type": "string" } ], "name": "createAccount", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_address", "type": "address" } ], "name": "getAccount", "outputs": [ { "components": [ { "internalType": "string", "name": "nickname", "type": "string" }, { "internalType": "uint256", "name": "creationDate", "type": "uint256" }, { "internalType": "string", "name": "bio", "type": "string" }, { "internalType": "string", "name": "imgIpfs", "type": "string" }, { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "surname", "type": "string" } ], "internalType": "struct DSMContract.account", "name": "", "type": "tuple" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "posts", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" } ]';
    const contractAddress = "0xECFDf9a4ec00D95b5a07996049371B708B3F4eA0";
    const contract = new ethers.Contract(contractAddress, abi, signer);


    //set account data
    account_data = await contract.getAccount(accounts[0]);
    console.log(account_data);
    document.getElementById('account-name').innerHTML = account_data[0];
    document.getElementById('nickname').setAttribute('placeholder', account_data[0])
    document.getElementById('name').setAttribute('placeholder', account_data[4])
    document.getElementById('surname').setAttribute('placeholder', account_data[5])
    if (account_data[3]!=''){
        document.getElementById('account-img1').setAttribute('src', account_data[3])
        document.getElementById('account-img2').setAttribute('src', account_data[3])
    }
    
};