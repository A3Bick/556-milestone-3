function initialize(){
    const DocHeader = document.createElement("header");

    const HeaderText = document.createElement("a");

    //gonna just replace this with Profile since Splashscreen wasn't ultimately used
    HeaderText.href = "Profile.html";

    const logoImg = document.createElement("img");
    logoImg.src = "Assets/Images/Logo.png"; // replace with your actual logo path
    logoImg.alt = "NEXT STEP WASHU Logo";
    logoImg.style.height = "50px"; // adjust as needed
    logoImg.style.objectFit = "contain";

    HeaderText.appendChild(logoImg); // add image to the anchor
    DocHeader.appendChild(HeaderText);

    const linkDivs = document.createElement("div");
    linkDivs.id = "headerLinks";

    const textButton1 = document.createElement("a");
    textButton1.innerHTML = "Career";
    textButton1.href = "CareerHome.html";

    const textButton2 = document.createElement("a");
    textButton2.innerHTML = "Feed";
    textButton2.href = "Feed.html";

    const textButton3 = document.createElement("a");
    textButton3.innerHTML = "Courses";
    textButton3.href = "Courses.html";

    const textButton4 = document.createElement("a");
    textButton4.innerHTML = "Clubs";
    textButton4.href = "Clubs.html";

    const textButton5 = document.createElement("a");
    textButton5.innerHTML = "Internships";
    textButton5.href = "Internships.html";

    const profileButton = document.createElement("a");
    profileButton.href = "Profile.html";
    profileButton.innerHTML = "<img id='profileImg' src='Assets/Images/Profile.png'>";

    DocHeader.appendChild(HeaderText);

    linkDivs.appendChild(textButton1);
    linkDivs.appendChild(textButton2);
    linkDivs.appendChild(textButton3);
    linkDivs.appendChild(textButton4);
    linkDivs.appendChild(textButton5);
    linkDivs.appendChild(profileButton);

    DocHeader.appendChild(linkDivs);

    document.body.appendChild(DocHeader);
}

initialize();