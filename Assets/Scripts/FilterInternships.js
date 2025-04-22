// this function extracts and builds our internships from our Data.json file
function getinternships(){

    // activeinternships seperates our filter from the internship cards
    const activeinternships = document.createElement("div");
    activeinternships.id = "activeinternships";

    const internshipBody = document.getElementById("internships");
    internshipBody.appendChild(activeinternships);

    // for every entry from our json file...
    for(let i = 0; i < internships.length; i++){
        // get image 
        const internshipImage = document.createElement("img")
        internshipImage.className = "internshipImage"
        internshipImage.src = internships[i].internshipImage || "./Assets/Images/InternshipImage2.png";

        // get name, rating, skills, tags, etc...
        const internshipInfo = document.createElement("div");
        internshipInfo.className = "internshipCard";
        internshipInfo.appendChild(document.createElement("hr"))

        const internshipName = document.createElement("p");
        internshipName.className = "internshipCardName";
        internshipName.innerHTML = internships[i].internshipName;

        const intershipExtraInfo = document.createElement("div");
        intershipExtraInfo.className = "ExtraInfo";

        const pay = document.createElement("div");
        pay.className = "pay";
        pay.innerHTML = "Pay: ".concat(internships[i].pay);

        const skills = document.createElement("div");
        skills.className = "skills";
        let skillString = "Desired Skills: ";
        for(let j = 0; j < internships[i].skills.length; j++){
            skillString = skillString.concat(internships[i].skills[j], " ");
        }
        skills.innerHTML = skillString;

        const qualities = document.createElement("div");
        qualities.className = "qualities";
        let qualityString = "Desired Qualities: ";
        for(let j = 0; j < internships[i].qualities.length; j++){
            qualityString = qualityString.concat(internships[i].qualities[j], " ");
        }
        qualities.innerHTML = qualityString;

        intershipExtraInfo.appendChild(pay);
        intershipExtraInfo.appendChild(skills);
        intershipExtraInfo.appendChild(qualities);

        const internshipDesc = document.createElement("p");
        internshipDesc.className = "internshipCardDesc";
        internshipDesc.innerHTML = internships[i].internshipDesc;


        // put it all together in a neat little card
        internshipInfo.appendChild(internshipImage);
        const save = document.createElement("div");
        save.className = "saveClub"
        save.innerText = "Save"
        save.addEventListener("click", function() {
            alert("Internship Successfully Saved!");
        });
        const internshipInner = document.createElement("div");
        internshipInner.appendChild(save);
        internshipInner.appendChild(internshipName);
        internshipInner.appendChild(intershipExtraInfo);
        internshipInner.appendChild(internshipDesc);
        internshipInfo.appendChild(internshipInner);


        internshipInfo.id = internships[i].internshipID;
        internshipIDs.push(internships[i].internshipID);

        activeinternships.appendChild(internshipInfo);
    }
    // prevents collapse when filter returns nothing
    const hiddenDiv = document.createElement("div");
    hiddenDiv.style.width = "900px";
    activeinternships.appendChild(hiddenDiv);
}

// load up our json file
const response = await fetch("./Assets/Data/Data.json");

let data = await response.json();

let internships = data.Internships;

let internshipIDs = [];

getinternships();

// just for debug purposes
console.log(internshipIDs);

// now let's look at the filter functions. The Filter should do something every time it is ever touched
const filter = document.getElementById("classFilter");
filter.addEventListener('input', function(event){
    console.log("Something happened with filter!");

    // start by getting search text if inputted
    let filterText = document.getElementsByClassName("filterSearch")[0].value.toLowerCase();
    console.log(filterText);

    // then we get every checkbox that is active
    let activeChecks = filter.querySelectorAll('input[type="checkbox"]:checked');
    console.log(activeChecks);

    let payText = document.getElementById("Pay").value;

    // from the checkboxes, we want the id of them, this is important
    let filterVals = [];
    for(let i = 0; i < activeChecks.length; i++){
        filterVals.push(activeChecks[i].id);
    }

    console.log(filterVals);

    // now what we want to do is focus on two cases: there is search data, there is not
    let validIds = [];
    for(let i = 0; i < internships.length; i++){

        // if we have search data and paytext do a search for both
        if(filterText.length > 0 && payText.length > 0){
            if(internships[i].pay != "None"){
                if(Number(internships[i].pay.slice(0, 2)) >= Number(payText)){
                    if(internships[i].internshipName.toLowerCase().includes(filterText)){
                        // if so, we must now check if there are any check filters, if not then we can add the id to valid ids
                        if(filterVals.length == 0){
                            validIds.push(internships[i].internshipID);
                        }
                        // otherwise, see if one of the filter values correlates with one of the aspects of our internship
                        else{
                            for(let j = 0; j < filterVals.length; j++){
                                if(internships[i].Industry == filterVals[j] || internships[i].School == filterVals[j] || internships[i].Major == filterVals[j]){
                                    validIds.push(internships[i].internshipID);
                                }
                            }
                        }
                    }
                } 
            }
        }
        else if(payText.length > 0){
            if(internships[i].pay != "None"){
                if(Number(internships[i].pay.slice(0, 2)) >= Number(payText)){
                    if(filterVals.length == 0){
                        validIds.push(internships[i].internshipID);
                    }
                    for(let j = 0; j < filterVals.length; j++){
                        if(internships[i].Industry == filterVals[j] || internships[i].School == filterVals[j] || internships[i].Major == filterVals[j]){
                            validIds.push(internships[i].internshipID);
                        }
                    }
                }
            }
        }
        else if(filterText.length > 0){
            console.log(internships[i].internshipName.toLowerCase());
            if(internships[i].internshipName.toLowerCase().includes(filterText)){
                // if so, we must now check if there are any check filters, if not then we can add the id to valid ids
                if(filterVals.length == 0){
                    validIds.push(internships[i].internshipID);
                }
                // otherwise, see if one of the filter values correlates with one of the aspects of our internship
                else{
                    for(let j = 0; j < filterVals.length; j++){
                        if(internships[i].Industry == filterVals[j] || internships[i].School == filterVals[j] || internships[i].Major == filterVals[j]){
                            validIds.push(internships[i].internshipID);
                        }
                    }
                }
            }
        // no filtertext? just check for filter values with checkboxes like above then
        }else{
            if(filterVals.length == 0){
                validIds.push(internships[i].internshipID);
            }
            else{
                for(let j = 0; j < filterVals.length; j++){
                    if(internships[i].Industry == filterVals[j] || internships[i].School == filterVals[j] || internships[i].Major == filterVals[j]){
                        validIds.push(internships[i].internshipID);
                    }
                }
            }
        }
    }

    console.log(validIds);

    // now that we finally have a set of valid ids, we can hide those that shouldn't be seen
    const internshipCards = document.getElementsByClassName("internshipCard");
    console.log(internshipCards);

    // go through each internship, if it's valid, show it, otherwise display nothing
    for(let i = 0; i < internshipCards.length; i++){
        let toBeHidden = true;
        for(let j = 0; j < validIds.length; j++){
            if(validIds[j] == internshipCards[i].id){

                console.log("Element won't be hidden");
                toBeHidden = false;
                break;
            }
        }
        if(toBeHidden == true){
            internshipCards[i].style.display = "none";
        }
        else{
            internshipCards[i].style.display = "";
        }
    }
});
