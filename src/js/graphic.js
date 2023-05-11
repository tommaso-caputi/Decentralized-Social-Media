var open = true;
var open1 = true;

//showing the accountbox and closing it clicking on the account button

function showAccountBox() {
    var accountbox = document.getElementById("accountbox");
    var container = document.getElementById("container");

    if (open == true) {
        closeBoxPost();
        accountbox.style.display = "block";
        container.classList.add("blur");
    } else {
        accountbox.style.display = "none";
        container.classList.remove("blur");
        open = true;
    }

}

//close the accountbox clicking the x button

function closeBox() {
    var accountbox = document.getElementById("accountbox");
    accountbox.style.display = "none";
    var container = document.getElementById("container");
    container.classList.remove("blur");
}

//close the accountbox clicking outside the accountbox

window.addEventListener('mouseup', function (event) {
    var box = document.getElementById('accountbox');
    var container = document.getElementById("container");

    if (event.target == (container)) {
        box.style.display = 'none';
        container.classList.remove("blur");
        open = true;
    }
});


//showing the createPost and closing it clicking on the account button

function showCreateBox() {
    var createPost = document.getElementById("createPost");
    var container = document.getElementById("container");

    if (open1 == true) {
        closeBox();
        createPost.style.display = "block";
        container.classList.add("blur");
    } else {
        createPost.style.display = "none";
        container.classList.remove("blur");
        open1 = true;
    }

}

//close the createPost clicking the x button

function closeBoxPost() {
    var createPost = document.getElementById("createPost");
    createPost.style.display = "none";
    var container = document.getElementById("container");
    container.classList.remove("blur");
}

//close the createPost clicking outside the createPost

window.addEventListener('mouseup', function (event) {
    var createPost = document.getElementById('createPost');
    var container = document.getElementById("container");

    if (event.target == (container)) {
        createPost.style.display = 'none';
        container.classList.remove("blur");
        open1 = true;
    }
});

//show and hide the password during the signup process 

function showPassRegister() {
    var passwordInput = document.getElementById('registerPassword');
    var viewBtnImg = document.querySelector('.viewBtnImg');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        viewBtnImg.src = 'assets/icons/hide.png';
        viewBtnImg.alt = 'nascondi password';
    } else {
        passwordInput.type = 'password';
        viewBtnImg.src = 'assets/icons/view.png';
        viewBtnImg.alt = 'mostra password';
    }
}

//show and hide the password during the login process 

function showPassLogin() {
    var passwordInput = document.getElementById('registerPasswordLogin');
    var viewBtnImg = document.getElementById('viewBtnLogin');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        viewBtnImg.src = 'assets/icons/hide.png';
        viewBtnImg.alt = 'nascondi password';
    } else {
        passwordInput.type = 'password';
        viewBtnImg.src = 'assets/icons/view.png';
        viewBtnImg.alt = 'mostra password';
    }
}