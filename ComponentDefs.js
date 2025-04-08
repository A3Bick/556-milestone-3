function initialize(){
    const DocHeader = document.createElement("header");

    const HeaderText = document.createElement("a");
    HeaderText.href = "SplashScreen.html";
    HeaderText.innerHTML = "NEXT STEP WASHU";

    const linkDivs = document.createElement("div");
    linkDivs.id = "headerLinks";

    const textButton1 = document.createElement("a");
    textButton1.innerHTML = "some page";
    textButton1.href = "Page2.html";

    const textButton2 = document.createElement("a");
    textButton2.innerHTML = "another page";
    textButton2.href = "Page2.html";

    DocHeader.appendChild(HeaderText);

    linkDivs.appendChild(textButton1);
    linkDivs.appendChild(textButton2);

    DocHeader.appendChild(linkDivs);

    document.body.appendChild(DocHeader);
}

initialize();