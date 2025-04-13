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
    card.appendChild(button);

    return card;
}

const alumniList = [
    {
    name: 'Rose Liu',
    title: 'Software Engineer at Apple',
    pronouns: 'She/her',
    classYear: '2022',
    location: 'New York, NY',
    imageUrl: 'Assets/Images/AlumProfileImage.png'
},
{
    name: 'Rose Liu',
    title: 'Software Engineer at Apple',
    pronouns: 'She/her',
    classYear: '2020',
    location: 'Seattle, Washington',
    imageUrl: 'Assets/Images/AlumProfileImage2.png'
},
{
    name: 'Rose Liu',
    title: 'Software Engineer at Apple',
    pronouns: 'She/her',
    classYear: '2011',
    location: 'St. Louis, MO',
    imageUrl: 'Assets/Images/AlumProfileImage3.png'
},
{
    name: 'Rose Liu',
    title: 'Software Engineer at Apple',
    pronouns: 'She/her',
    classYear: '1989',
    location: 'San Jose, CA',
    imageUrl: 'Assets/Images/AlumProfileImage4.png'
}
];

document.addEventListener('DOMContentLoaded', function() {
    alumniList.forEach(alumniData => {
        console.log("alumniData: "+alumniData.name);
        const alumniCard = createAlumniCard(alumniData);
        const container = document.getElementById("alumCardContainer");
        container.appendChild(alumniCard);
    });
});
