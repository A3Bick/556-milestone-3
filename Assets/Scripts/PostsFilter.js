const response = await fetch("./Assets/Data/Data.json");

let data = await response.json();

let posts = data.Posts;

const search = document.getElementsByClassName("filterSearch")[0];

console.log("PostsFilter loaded");

search.addEventListener('input', function(event){
    const searchText = event.target.value;

    console.log(searchText);

    let validIds = [];
    for(let i = 0; i < posts.length; i++){
        if(posts[i].title.toLowerCase().includes(searchText.toLowerCase()) || posts[i].description.toLowerCase().includes(searchText.toLowerCase()) || posts[i].authorTitle.toLowerCase().includes(searchText.toLowerCase())){
            validIds.push(posts[i].id);
        }
    }

    console.log(validIds);

    const Activeposts = document.getElementsByClassName("postCard");
    const hrs = document.getElementsByTagName("hr");

    for(let i = 0; i < Activeposts.length; i++){
        console.log(Activeposts[i]);
        if(validIds.includes(Number(Activeposts[i].id))){
            console.log("Included");
            Activeposts[i].style.display = "";
            hrs[i].style.display = "";
        }
        else{
            console.log("Not Included");
            Activeposts[i].style.display = "none";
            hrs[i].style.display = "None";
        }
    }
});