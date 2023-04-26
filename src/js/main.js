
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
    const abi = '';
    const contractAddress = "";
    const contract = new ethers.Contract(contractAddress, abi, signer);

    //set account data
    account_data = await contract.getAccount(accounts[0]);
    console.log(account_data);
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
            post_interaction.innerHTML += '<span class="postLike"><img src="assets/icons/likeEmp.png" alt="like icon" class="iconPost"></span>';
            post_interaction.innerHTML += '<span class="postLikeNumber">' + Number(posts[i].likes._hex) + '</span>';
            post_interaction.innerHTML += '<span class="postShare"><img src="assets/icons/share.png" alt="share icon" class="iconPost"></span>';
            post_html.appendChild(post_interaction);
        }
        //post create date
        post_html.innerHTML += '<div class="postInfo"><span>' + decodeDate(posts[i].creationDate) + '</span></div>';
        //add post to list
        document.getElementById('container').appendChild(post_html);
    }

};


function decodeDate(n) {
    let temp = new Date(n * 1000);
    return temp.toLocaleDateString();
}