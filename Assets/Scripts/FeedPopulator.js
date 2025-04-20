function createPostCard(postData) {
    // Create the main container elements
    const postCard = document.createElement('div');
    postCard.className = 'postCard';
    
    // Create the video cell container
    const postVideoCell = document.createElement('div');
    postVideoCell.className = 'postVideoCell';
    
    // Create the iframe element
    const iframe = document.createElement('iframe');
    iframe.src = postData.videoUrl || 'https://www.youtube.com/embed/j1fc0FlCjyI';
    
    // Create the title element
    const postTitle = document.createElement('p');
    postTitle.className = 'postTitle';
    postTitle.textContent = postData.title || 'Post Title';
    
    // Create the description element
    const postDescription = document.createElement('p');
    postDescription.className = 'postDescription';
    postDescription.innerHTML = `Post Description: <br>${postData.description || 'This is a default post description.'}`;
    
    // Assemble the elements
    postVideoCell.appendChild(iframe);
    postVideoCell.appendChild(postTitle);
    postCard.appendChild(postVideoCell);
    postCard.appendChild(postDescription);
    
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
    list.forEach(alumniData => {
        const alumniCard = createPostCard(alumniData);
        const container = document.getElementById("postFeed");
        container.appendChild(alumniCard);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    console.log("loaded content");
    populatePosts();
});
