var open = true;

//showing the accountbox and closing it clicking on the account button

function showAccountBox() {

    if (open == true) {
        var accountbox = document.getElementById("accountbox");
        var container = document.getElementById("container");
        accountbox.style.display = "block";
        container.classList.add("blur");
        open = false;
    } else {
        var accountbox = document.getElementById("accountbox");
        var container = document.getElementById("container");
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

//close the accountbox clicking outside of the accountbox

window.addEventListener('mouseup',function(event){
    var box = document.getElementById('accountbox');
    var container = document.getElementById("container");

    if(event.target == (container)){
        box.style.display = 'none';
        container.classList.remove("blur");
        open = true;
    }
});  