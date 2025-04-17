function createAlumniCard(alumniData) {
    // Create the main card container
    const card = document.createElement('div');
    card.className = 'alumniCard';

    // Create and append the profile image
    const img = document.createElement('img');
    img.className = 'icon';
    img.src = alumniData.imageUrl || 'Assets/Images/AlumProfileImage.png';
    img.alt = alumniData.name + ' profile image';
    card.appendChild(img);

    // Create and append the name
    const name = document.createElement('span');
    name.className = 'name';
    name.textContent = alumniData.name;
    card.appendChild(name);

    // Create and append the title
    const title = document.createElement('span');
    title.className = 'title';
    title.textContent = alumniData.title;
    card.appendChild(title);

    // Create the info container
    const info = document.createElement('div');
    info.className = 'info';

    // Create and append info items (pronouns, class year, location)
    const pronouns = document.createElement('span');
    pronouns.textContent = alumniData.pronouns;
    info.appendChild(pronouns);

    const classYear = document.createElement('span');
    classYear.textContent = 'Class of ' + alumniData.classYear;
    info.appendChild(classYear);

    const location = document.createElement('span');
    location.textContent = alumniData.location;
    info.appendChild(location);

    // Append info container to card
    card.appendChild(info);

    // Create and append the follow button
    const button = document.createElement('button');
    button.textContent = 'Follow';
    button.addEventListener("click", function(){
        switch(button.textContent){
            case "Follow":
                button.textContent = "Following"
                break;
            case "Following":
                button.textContent = "Follow"
                break;
        }
    });
    card.appendChild(button);

    return card;
}

async function fetchAlumni(numAlums){
    const response = await fetch("./Assets/Data/Alumni.json");
    let data = await response.json();
    let alumniList = data.Alumni;
    if(numAlums){
        return alumniList.slice(0, numAlums);
    }
    return alumniList;
}

async function populateAlumni(){
    let list = await fetchAlumni(document.getElementById("alumCardContainer").innerHTML);
    document.getElementById("alumCardContainer").innerHTML = "";
    list.forEach(alumniData => {
        const alumniCard = createAlumniCard(alumniData);
        const container = document.getElementById("alumCardContainer");
        container.appendChild(alumniCard);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    populateAlumni();
});
