function initialize(){
    const DocHeader = document.createElement("header");

    const HeaderText = document.createElement("a");
    HeaderText.href = "SplashScreen.html";
    HeaderText.innerHTML = "NEXT STEP WASHU";

    const linkDivs = document.createElement("div");
    linkDivs.id = "headerLinks";

    const textButton1 = document.createElement("a");
    textButton1.innerHTML = "Career";
    textButton1.href = "Career.html";

    const textButton2 = document.createElement("a");
    textButton2.innerHTML = "Feed";
    textButton2.href = "Feed.html";

    const profileButton = document.createElement("a");
    profileButton.href = "Profile.html";
    profileButton.innerHTML = "<img id='profileImg' src='Assets/Images/Profile.png'>";

    DocHeader.appendChild(HeaderText);

    linkDivs.appendChild(textButton1);
    linkDivs.appendChild(textButton2);
    linkDivs.appendChild(profileButton);

    DocHeader.appendChild(linkDivs);

    document.body.appendChild(DocHeader);
}

initialize();