var open = true;
var open1 = true;

//showing the accountbox and closing it clicking on the account button

function showAccountBox() {
    var accountbox = document.getElementById("accountbox");
    var container = document.getElementById("container");

    if (open == true) {
        accountbox.style.display = "block";
        container.classList.add("blur");
        open = false;
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
        createPost.style.display = "block";
        container.classList.add("blur");
        open1 = false;
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