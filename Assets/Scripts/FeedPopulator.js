function createPostCard(postData) {
    // Create the main container elements
    const postCard = document.createElement('div');
    postCard.className = 'postCard';

    // Create and add the image
    const img = document.createElement('img');
    img.src = postData.authorPfp || '../Assets/Images/AlumProfileImage.png';
    postCard.appendChild(img);

    // Create the post card content div
    const postCardContent = document.createElement('div');
    postCardContent.className = 'postCardContent';

    // Create and add author name
    const postAuthor = document.createElement('div');
    postAuthor.className = 'postAuthor';
    postAuthor.textContent = postData.author || 'Richard Li';
    postCardContent.appendChild(postAuthor);

    // Create and add author title
    const postAuthorTitle = document.createElement('div');
    postAuthorTitle.className = 'postAuthorTitle';
    postAuthorTitle.textContent = postData.authorTitle || 'Software Developer at Amazon';
    postCardContent.appendChild(postAuthorTitle);

    // Create and add iframe
    const iframe = document.createElement('iframe');
    iframe.src = postData.videoUrl || 'https://www.youtube.com/embed/j1fc0FlCjyI';
    postCardContent.appendChild(iframe);

    // Create and add description
    const postDescription = document.createElement('p');
    postDescription.className = 'postDescription';
    postDescription.textContent = postData.description || 'This is a default post description.';
    postCardContent.appendChild(postDescription);

    // Add the content div to the main container
    postCard.appendChild(postCardContent);

    // Create and add follow button
    const postFollow = document.createElement('div');
    postFollow.className = 'postFollow';
    postFollow.textContent = 'Follow';
    postCard.appendChild(postFollow);

    // Create and add like button (empty for now)
    const postLike = document.createElement('div');
    postLike.className = 'postLike';
    postLike.innerHTML = `<svg class="heart" xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31" fill="none">
  <path d="M15.075 22.6C14.7 22.6 14.25 22.45 13.95 22.15C9.075 17.875 9 17.8 9 17.725L8.925 17.65C8.025 16.75 7.5 15.475 7.5 14.2V14.05C7.575 11.35 9.75 9.25 12.45 9.25C13.275 9.25 14.4 9.7 15.075 10.6C15.75 9.7 16.95 9.25 17.775 9.25C20.475 9.25 22.575 11.35 22.725 14.05V14.2C22.725 15.55 22.2 16.75 21.3 17.725L21.225 17.8C21.15 17.875 20.55 18.4 16.275 22.225C15.9 22.45 15.525 22.6 15.075 22.6ZM10.125 17.5C10.425 17.8 11.925 18.85 14.7 21.25C14.925 21.475 15.225 21.475 15.45 21.25C18.3 18.7 19.95 17.275 20.325 16.975L20.4 16.9C21.15 16.15 21.525 15.175 21.525 14.2V14.05C21.45 11.95 19.8 10.375 17.7 10.375C17.175 10.375 16.125 10.75 15.75 11.575C15.6 11.875 15.3 12.025 15 12.025C14.7 12.025 14.4 11.875 14.25 11.575C13.875 10.825 12.9 10.375 12.3 10.375C10.275 10.375 8.55 12.025 8.475 14.05V14.275C8.475 15.25 8.925 16.225 9.6 16.9L10.125 17.5Z" fill="#2020D2"/>
  <circle cx="15.5" cy="15.5" r="15.5" fill="#8AABFF" fill-opacity="0.35"/>
</svg>`
    postCard.appendChild(postLike);

    postCard.id = postData.id;

    return postCard;
}

async function fetchPosts(){
    const response = await fetch("./Assets/Data/Data.json");
    let data = await response.json();
    let alumniList = data.Posts;
    return alumniList;
}

async function populatePosts(){
    let list = await fetchPosts();
    console.log(list);
    var first = true;
    list.forEach(alumniData => {
        const alumniCard = createPostCard(alumniData);
        const container = document.getElementById("postFeed");
        if(!first){
            container.innerHTML+="<hr>";
        }else{
            first = false;
        }
        container.appendChild(alumniCard);
    });
    let followButtons = document.querySelectorAll(".postFollow")
    followButtons.forEach(button => {
        button.addEventListener("click", function(){
            if(button.innerHTML == "Follow"){
                button.innerHTML = "Following"
            }else{
                button.innerHTML = "Follow"
            }
        });
    });

}

document.addEventListener('DOMContentLoaded', function() {
    console.log("loaded content");
    populatePosts();
    loadGetData();
});

async function loadGetData(){

    const params = new URLSearchParams(window.location.search);

    if(params.has("postTitle") && params.has("postDesc")){

        console.log("Data Loaded");
    
        const feed = document.getElementById("postFeed");
    
        const postCard = document.createElement('div');
        postCard.className = 'postCard';
    
        // Create the post card content div
        const postCardContent = document.createElement('div');
        postCardContent.className = 'postCardContent';
    
        // Create and add the image
        const img = document.createElement('img');
        img.src = 'Assets/Images/Profile.png';
        postCard.appendChild(img);
    
        // Create and add author name
        const postAuthor = document.createElement('div');
        postAuthor.className = 'postAuthor';
        postAuthor.textContent = "User"
        postCardContent.appendChild(postAuthor);
    
        // Create and add author title
        const postAuthorTitle = document.createElement('div');
        postAuthorTitle.className = 'postAuthorTitle';
        postAuthorTitle.textContent = 'User';
        postCardContent.appendChild(postAuthorTitle);
    
        // Create and add description
        const postDescription = document.createElement('p');
        postDescription.className = 'postDescription';
        postDescription.textContent = params.get("postDesc");
        postCardContent.appendChild(postDescription);
    
        // Add the content div to the main container
        postCard.appendChild(postCardContent);

        const horizBreak = document.createElement("hr");
    
        feed.appendChild(postCard);
        feed.appendChild(horizBreak);
    }
}
