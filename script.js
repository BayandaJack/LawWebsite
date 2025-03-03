window.onload = function() {
    window.scrollTo(0, 0);
};

let button = document.getElementById(formButton);
button.onclick = function(){
    let username = document.getElementById("userName").value;
    let email = document.getElementById("userEmail").value;
    let issue = document.getElementById("legalproblem").value;
}

console.log(`My name is ${username} and my email is ${email}. My legal issue is here: ${issue}`);