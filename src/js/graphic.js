var i = 0;

window.onload = async () => {
    var accountbox = document.getElementById("accountbox");
    accountbox.style.display = "none";
};

function showAccountBox() {

    if(i==0){
        var accountbox = document.getElementById("accountbox");
        var container = document.getElementById("container");
        accountbox.style.display = "block";
        container.classList.add("blur"); 
        i = 1; 
    }else{
        var accountbox = document.getElementById("accountbox");
        var container = document.getElementById("container");
        accountbox.style.display = "none";
        container.classList.remove("blur");
        i = 0; 
    }
  }
  