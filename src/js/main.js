
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
            window.signer = provider.getSigner();
        } catch (error) {
            console.log({ error });
            alert('Wallet non connesso, é necessario ricaricare la pagina!')
        }
    }
    //connect to smart contract
    const abi = '[ { "inputs": [ { "internalType": "uint256", "name": "n", "type": "uint256" } ], "name": "addLike", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "_nickname", "type": "string" }, { "internalType": "string", "name": "_bio", "type": "string" }, { "internalType": "string", "name": "_imgIpfs", "type": "string" }, { "internalType": "string", "name": "_name", "type": "string" }, { "internalType": "string", "name": "_surname", "type": "string" } ], "name": "createAccount", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "description", "type": "string" }, { "internalType": "string", "name": "_imgIpfs", "type": "string" } ], "name": "createPost", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "_nickname", "type": "string" }, { "internalType": "uint256", "name": "_creationDate", "type": "uint256" }, { "internalType": "string", "name": "_bio", "type": "string" }, { "internalType": "string", "name": "_imgIpfs", "type": "string" }, { "internalType": "string", "name": "_name", "type": "string" }, { "internalType": "string", "name": "_surname", "type": "string" } ], "name": "updateAccount", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "accounts", "outputs": [ { "internalType": "string", "name": "nickname", "type": "string" }, { "internalType": "uint256", "name": "creationDate", "type": "uint256" }, { "internalType": "string", "name": "bio", "type": "string" }, { "internalType": "string", "name": "imgIpfs", "type": "string" }, { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "surname", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_address", "type": "address" } ], "name": "getAccount", "outputs": [ { "components": [ { "internalType": "string", "name": "nickname", "type": "string" }, { "internalType": "uint256", "name": "creationDate", "type": "uint256" }, { "internalType": "string", "name": "bio", "type": "string" }, { "internalType": "string", "name": "imgIpfs", "type": "string" }, { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "surname", "type": "string" } ], "internalType": "struct DSMContract.account", "name": "", "type": "tuple" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getAllAccountPosts", "outputs": [ { "components": [ { "internalType": "string", "name": "description", "type": "string" }, { "internalType": "string", "name": "_imgIpfs", "type": "string" }, { "internalType": "address[]", "name": "likes", "type": "address[]" }, { "internalType": "uint256", "name": "creationDate", "type": "uint256" }, { "internalType": "address", "name": "creator", "type": "address" } ], "internalType": "struct DSMContract.post[]", "name": "", "type": "tuple[]" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "n", "type": "uint256" } ], "name": "getLastNPosts", "outputs": [ { "components": [ { "internalType": "string", "name": "description", "type": "string" }, { "internalType": "string", "name": "_imgIpfs", "type": "string" }, { "internalType": "address[]", "name": "likes", "type": "address[]" }, { "internalType": "uint256", "name": "creationDate", "type": "uint256" }, { "internalType": "address", "name": "creator", "type": "address" } ], "internalType": "struct DSMContract.post[]", "name": "", "type": "tuple[]" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getPostsNumber", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "posts", "outputs": [ { "internalType": "string", "name": "description", "type": "string" }, { "internalType": "string", "name": "_imgIpfs", "type": "string" }, { "internalType": "uint256", "name": "creationDate", "type": "uint256" }, { "internalType": "address", "name": "creator", "type": "address" } ], "stateMutability": "view", "type": "function" } ]';
    const contractAddress = "0x3AA8619E4E2d3329E82d491499dCF8D176dc4F8f";
    window.contract = new ethers.Contract(contractAddress, abi, signer);

    //controllo registrazione
    account_data = await contract.getAccount(accounts[0]);
    console.log(account_data)
    if (account_data[0] == '') {
        console.log('account non esistente');
    } else {
        document.getElementById('welcome').style.display = 'none';
    }


    //set account data
    if (account_data[0] != '') {
        document.getElementById('account-name').innerHTML = account_data[0];
        document.getElementById('nickname').setAttribute('placeholder', account_data[0])
        document.getElementById('name').setAttribute('placeholder', account_data[4])
        document.getElementById('surname').setAttribute('placeholder', account_data[5])
        document.getElementById('bio').setAttribute('placeholder', account_data[2])
        if (account_data[3] != '.' && account_data[3] != '') {
            document.getElementById('account-img1').setAttribute('src', account_data[3])
            document.getElementById('account-img2').setAttribute('src', account_data[3])
        } else {
            document.getElementById('account-img1').setAttribute('src', 'assets/icons/user.png')
            document.getElementById('account-img2').setAttribute('src', 'assets/icons/user.png')
        }
    }

    //show posts
    const n_posts = await contract.getPostsNumber();
    const posts = await contract.getLastNPosts(Number(n_posts._hex));

    for (let i = 0; i < posts.length; i++) {
        var post_creator = await contract.getAccount(posts[i].creator);
        const post_html = document.createElement('div');
        post_html.className = 'post';
        //post header 
        const post_header = document.createElement('div');
        post_header.className = 'postHeader';
        if (post_creator[3] != '.') { post_header.innerHTML += '<span class="postAccountImg"><img src="' + post_creator[3] + '" alt="account icon" class="iconPost"></span>' } else { post_header.innerHTML += '<span class="postAccountImg"><img src="assets/icons/user.png" alt="account icon" class="iconPost"></span>' }
        post_header.innerHTML += '<span class="postAccountName">' + post_creator[0] + '</span>';
        post_html.appendChild(post_header);
        //post image
        if (posts[i]._imgIpfs != '.') {
            post_html.innerHTML += '<div class="postImages"><img src="' + posts[i]._imgIpfs + '" alt="Immagine post" class="img"></div>';
            //post interaction 
            const post_interaction = document.createElement('div');
            post_interaction.className = 'postInteractions';
            post_interaction.innerHTML += '<span class="postL   ike"><img src="assets/icons/likeEmp.png" alt="like icon" class="iconPost"></span>';
            post_interaction.innerHTML += '<span class="postLikeNumber">' + Number(posts[i].likes._hex) + '</span>';
            post_interaction.innerHTML += '<span class="postShare"><img src="assets/icons/share.png" alt="share icon" class="iconPost"></span>';
            post_html.appendChild(post_interaction);
            //post description 
            post_html.innerHTML += '<div class="postDescription">' + posts[i].description + '</div>';
        } else {
            //post description 
            post_html.innerHTML += '<div class="postDescription">' + posts[i].description + '</div>';
            //post interaction 
            const post_interaction = document.createElement('div');
            post_interaction.className = 'postInteractions';
            post_interaction.innerHTML += '<span class="postLike" onclick="addLike(' + i + ')"><img src="assets/icons/likeEmp.png" alt="like icon" class="iconPost"></span>';
            post_interaction.innerHTML += '<span class="postLikeNumber">' + posts[i].likes.length + '</span>';
            post_interaction.innerHTML += '<span class="postShare"><img src="assets/icons/share.png" alt="share icon" class="iconPost"></span>';
            post_html.appendChild(post_interaction);
        }
        //post create date
        post_html.innerHTML += '<div class="postInfo"><span>' + decodeDate(posts[i].creationDate) + '</span></div>';
        //add post to list
        document.getElementById('container').appendChild(post_html);
    }

};

const addLike = async (n) => {
    await window.contract.addLike(n)
}

const updateAccountORRegistation = async () => {
    account_data = await contract.getAccount(accounts[0]);
    if (account_data[0] == '') {
        //registrazione
        console.log(await window.contract.createAccount(
            document.getElementById('nickname').value,
            document.getElementById('bio').value,
            '.',
            document.getElementById('name').value,
            document.getElementById('surname').value
        ))
        alert('Successfully registrated')
    } else {
        //update
        console.log('update')
        alert('update deactivated')
    }
}

function decodeDate(n) {
    let temp = new Date(n * 1000);
    return temp.toLocaleDateString();
}