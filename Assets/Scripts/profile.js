const xButtons = document.getElementsByClassName("remove");

for(let i = 0; i < xButtons.length; i++){
    xButtons[i].addEventListener("click", function(event){
        let target = event.target;
        //yes, 3 calls to the parent element are essential
        const card = target.parentElement.parentElement.parentElement;
        card.style.display = "none";
    });
}