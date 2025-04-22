// this function extracts and builds our clubs from our Data.json file
function getclubs(){

    // activeclubs seperates our filter from the club cards
    const activeclubs = document.createElement("div");
    activeclubs.id = "activeclubs";

    const clubBody = document.getElementById("clubs");
    clubBody.appendChild(activeclubs);

    // for every entry from our json file...
    for(let i = 0; i < clubs.length; i++){
        // get image 
        const clubImage = document.createElement("img")
        clubImage.className = "internshipImage"
        clubImage.src = clubs[i].clubImage || "./Assets/Images/Club1.jpeg";

        // get name, rating, skills, tags, etc...
        const clubInfo = document.createElement("div");
        clubInfo.className = "clubCard";

        const clubName = document.createElement("p");
        clubName.className = "clubCardName";
        clubName.innerHTML = clubs[i].clubName;

        const clubTimes = document.createElement("p");
        clubTimes.className = "clubTimes";
        let timeString = "Meet Times: ";

        for(let j = 0; j < clubs[i].MeetDay.length; j++){
            timeString = timeString.concat(clubs[i].MeetDay[j], ", ");
        }
        timeString = timeString.concat(clubs[i].MeetTime);

        clubTimes.innerHTML = timeString;

        const clubDesc = document.createElement("p");
        clubDesc.className = "clubCardDesc";
        clubDesc.innerHTML = clubs[i].clubDesc;


        // put it all together in a neat little card
        clubInfo.appendChild(clubImage);
        const save = document.createElement("div");
        save.className = "saveClub"
        save.innerText = "Save"
        save.addEventListener("click", function() {
            alert("Internship Successfully Saved!");
        });
        const clubInner = document.createElement("div");
        clubInner.appendChild(save);
        clubInner.appendChild(clubName);
        clubInner.appendChild(clubTimes);
        clubInner.appendChild(clubDesc);
        clubInfo.appendChild(clubInner);

        clubInfo.id = clubs[i].clubID;
        clubIDs.push(clubs[i].clubID);

        activeclubs.appendChild(clubInfo);
    }
    // prevents collapse when filter returns nothing
    const hiddenDiv = document.createElement("div");
    hiddenDiv.style.width = "900px";
    activeclubs.appendChild(hiddenDiv);
}

// load up our json file
const response = await fetch("./Assets/Data/Data.json");

let data = await response.json();

let clubs = data.Clubs;

let clubIDs = [];

getclubs();

// just for debug purposes
console.log(clubIDs);

// now let's look at the filter functions. The Filter should do something every time it is ever touched
const filter = document.getElementById("classFilter");
filter.addEventListener('input', function(event){
    console.log("Something happened with filter!");

    // start by getting search text if inputted
    let filterText = document.getElementsByClassName("filterSearch")[0].value;
    console.log(filterText);

    // then we get every checkbox that is active
    let activeChecks = filter.querySelectorAll('input[type="checkbox"]:checked');
    console.log(activeChecks);

    // from the checkboxes, we want the id of them, this is important
    let filterVals = [];
    for(let i = 0; i < activeChecks.length; i++){
        filterVals.push(activeChecks[i].id);
    }

    console.log(filterVals);

    // now what we want to do is focus on two cases: there is search data, there is not
    let validIds = [];
    for(let i = 0; i < clubs.length; i++){

        // if we have search data, identify if the data appears in club names
        if(filterText.length > 0){
            console.log(clubs[i].clubName.toLowerCase());
            if(clubs[i].clubName.toLowerCase().includes(filterText)){
                // if so, we must now check if there are any check filters, if not then we can add the id to valid ids
                if(filterVals.length == 0){
                    validIds.push(clubs[i].clubID);
                }
                // otherwise, see if one of the filter values correlates with one of the aspects of our club
                else{
                    for(let j = 0; j < filterVals.length; j++){
                        console.log(filterVals[j]);
                        console.log(clubs[i].MeetDay.join());
                        if(clubs[i].Industry == filterVals[j] || clubs[i].School == filterVals[j] || clubs[i].Major == filterVals[j] || clubs[i].MeetDay.join().includes(filterVals[j]) || clubs[i].MeetTime == filterVals[j]){
                            validIds.push(clubs[i].clubID);
                        }
                    }
                }
            }
        // no filtertext? just check for filter values with checkboxes like above then
        }else{
            if(filterVals.length == 0){
                validIds.push(clubs[i].clubID);
            }
            else{
                for(let j = 0; j < filterVals.length; j++){
                    if(clubs[i].Industry == filterVals[j] || clubs[i].School == filterVals[j] || clubs[i].Major == filterVals[j] || clubs[i].MeetDay.join().includes(filterVals[j]) || clubs[i].MeetTime == filterVals[j]){
                        validIds.push(clubs[i].clubID);
                    }
                }
            }
        }
    }

    console.log(validIds);

    // now that we finally have a set of valid ids, we can hide those that shouldn't be seen
    const clubCards = document.getElementsByClassName("clubCard");
    console.log(clubCards);

    // go through each club, if it's valid, show it, otherwise display nothing
    for(let i = 0; i < clubCards.length; i++){
        let toBeHidden = true;
        for(let j = 0; j < validIds.length; j++){
            if(validIds[j] == clubCards[i].id){

                console.log("Element won't be hidden");
                toBeHidden = false;
                break;
            }
        }
        if(toBeHidden == true){
            clubCards[i].style.display = "none";
        }
        else{
            clubCards[i].style.display = "";
        }
    }
});
