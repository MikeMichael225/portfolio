
function toggleNav() {
    var x = document.querySelector(".nav");
    if (x.className === "nav") {
        x.className += " responsive";
    } else {
        x.className = "nav";
    }
}