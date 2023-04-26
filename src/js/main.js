
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
    const abi = '[ { "inputs": [ { "internalType": "string", "name": "_nickname", "type": "string" }, { "internalType": "uint256", "name": "_creationDate", "type": "uint256" }, { "internalType": "string", "name": "_bio", "type": "string" }, { "internalType": "string", "name": "_imgIpfs", "type": "string" }, { "internalType": "string", "name": "_name", "type": "string" }, { "internalType": "string", "name": "_surname", "type": "string" } ], "name": "createAccount", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "description", "type": "string" }, { "internalType": "string", "name": "_imgIpfs", "type": "string" } ], "name": "createPost", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "_nickname", "type": "string" }, { "internalType": "uint256", "name": "_creationDate", "type": "uint256" }, { "internalType": "string", "name": "_bio", "type": "string" }, { "internalType": "string", "name": "_imgIpfs", "type": "string" }, { "internalType": "string", "name": "_name", "type": "string" }, { "internalType": "string", "name": "_surname", "type": "string" } ], "name": "updateAccount", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "accounts", "outputs": [ { "internalType": "string", "name": "nickname", "type": "string" }, { "internalType": "uint256", "name": "creationDate", "type": "uint256" }, { "internalType": "string", "name": "bio", "type": "string" }, { "internalType": "string", "name": "imgIpfs", "type": "string" }, { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "surname", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_address", "type": "address" } ], "name": "getAccount", "outputs": [ { "components": [ { "internalType": "string", "name": "nickname", "type": "string" }, { "internalType": "uint256", "name": "creationDate", "type": "uint256" }, { "internalType": "string", "name": "bio", "type": "string" }, { "internalType": "string", "name": "imgIpfs", "type": "string" }, { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "surname", "type": "string" } ], "internalType": "struct DSMContract.account", "name": "", "type": "tuple" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getAllAccountPosts", "outputs": [ { "components": [ { "internalType": "string", "name": "description", "type": "string" }, { "internalType": "string", "name": "_imgIpfs", "type": "string" }, { "internalType": "uint256", "name": "likes", "type": "uint256" }, { "internalType": "address", "name": "creator", "type": "address" } ], "internalType": "struct DSMContract.post[]", "name": "", "type": "tuple[]" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "n", "type": "uint256" } ], "name": "getLastNPosts", "outputs": [ { "components": [ { "internalType": "string", "name": "description", "type": "string" }, { "internalType": "string", "name": "_imgIpfs", "type": "string" }, { "internalType": "uint256", "name": "likes", "type": "uint256" }, { "internalType": "address", "name": "creator", "type": "address" } ], "internalType": "struct DSMContract.post[]", "name": "", "type": "tuple[]" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getPostsNumber", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "posts", "outputs": [ { "internalType": "string", "name": "description", "type": "string" }, { "internalType": "string", "name": "_imgIpfs", "type": "string" }, { "internalType": "uint256", "name": "likes", "type": "uint256" }, { "internalType": "address", "name": "creator", "type": "address" } ], "stateMutability": "view", "type": "function" } ]';
    const contractAddress = "0x77370f6AA873e5014bD33F5a732d4B79C711e5C2";
    const contract = new ethers.Contract(contractAddress, abi, signer);

    //set account data
    account_data = await contract.getAccount(accounts[0]);
    document.getElementById('account-name').innerHTML = account_data[0];
    document.getElementById('nickname').setAttribute('placeholder', account_data[0])
    document.getElementById('name').setAttribute('placeholder', account_data[4])
    document.getElementById('surname').setAttribute('placeholder', account_data[5])
    document.getElementById('bio').setAttribute('placeholder', account_data[2])
    if (account_data[3] != '.') {
        document.getElementById('account-img1').setAttribute('src', account_data[3])
        document.getElementById('account-img2').setAttribute('src', account_data[3])
    }

    //show posts
    const n_posts = await contract.getPostsNumber();
    const posts = await contract.getLastNPosts(Number(n_posts._hex));
    console.log(posts);

    for (let i = 0; i < posts.length; i++) {
        var post_creator = await contract.getAccount(posts[i].creator);
        if (post_creator[3] != '.') {
            //creator with image
            if (posts[i]._imgIpfs == '.') {
                //post without image ip
                var post_html = '<div class="post"> <div class="postHeader"> <span class="postAccountImg"> <img src="' + post_creator[3] + '" alt="account icon" class="iconPost"> </span> <span class="postAccountName"> ' + post_creator[0] + ' </span> </div> <div class="postInteractions"> <span class="postLike"> <img src="assets/icons/likeEmp.png" alt="like icon" class="iconPost"> </span> <span class="postLikeNumber"> ' + Number(posts[i].likes._hex) + ' </span> <span class="postShare"> <img src="assets/icons/share.png" alt="share icon" class="iconPost"> </span> </div> <div class="postDescription"> ' + posts[i].description + ' </div> <div class="postInfo"> <span> 01-01-2023</span> </div> </div>';
            } else {
                //post with image
                var post_html = '<div class="post"> <div class="postHeader"> <span class="postAccountImg"> <img src="' + post_creator[3] + '" alt="account icon" class="iconPost"> </span> <span class="postAccountName"> ' + posts[i].creator + ' </span> </div><div class="postImages"> <img src="' + posts[i]._imgIpfs + '" alt="Immagine post" class="img"> </div> <div class="postInteractions"> <span class="postLike"> <img src="assets/icons/likeEmp.png" alt="like icon" class="iconPost"> </span> <span class="postLikeNumber"> ' + Number(posts[i].likes._hex) + ' </span> <span class="postShare"> <img src="assets/icons/share.png" alt="share icon" class="iconPost"> </span> </div> <div class="postDescription"> ' + posts[i].description + ' </div> <div class="postInfo"> <span> 01-01-2023</span> </div> </div>';
            }
        } else {
            //creator withot image
            if (posts[i]._imgIpfs == '.') {
                //post without image ip
                var post_html = '<div class="post"> <div class="postHeader"> <span class="postAccountImg"> <img src="assets/icons/user.png" alt="account icon" class="iconPost"> </span> <span class="postAccountName"> ' + post_creator[0] + ' </span> </div> <div class="postInteractions"> <span class="postLike"> <img src="assets/icons/likeEmp.png" alt="like icon" class="iconPost"> </span> <span class="postLikeNumber"> ' + Number(posts[i].likes._hex) + ' </span> <span class="postShare"> <img src="assets/icons/share.png" alt="share icon" class="iconPost"> </span> </div> <div class="postDescription"> ' + posts[i].description + ' </div> <div class="postInfo"> <span> 01-01-2023</span> </div> </div>';
            } else {
                //post with image
                var post_html = '<div class="post"> <div class="postHeader"> <span class="postAccountImg"> <img src="assets/icons/user.png" alt="account icon" class="iconPost"> </span> <span class="postAccountName"> ' + posts[i].creator + ' </span> </div><div class="postImages"> <img src="' + posts[i]._imgIpfs + '" alt="Immagine post" class="img"> </div> <div class="postInteractions"> <span class="postLike"> <img src="assets/icons/likeEmp.png" alt="like icon" class="iconPost"> </span> <span class="postLikeNumber"> ' + Number(posts[i].likes._hex) + ' </span> <span class="postShare"> <img src="assets/icons/share.png" alt="share icon" class="iconPost"> </span> </div> <div class="postDescription"> ' + posts[i].description + ' </div> <div class="postInfo"> <span> 01-01-2023</span> </div> </div>';
            }
        }
        document.getElementById('container').innerHTML += post_html;
    }

};
