// this function extracts and builds our careers from our Data.json file
function getcareers(){

    // activecareers seperates our filter from the career cards
    const activecareers = document.createElement("div");
    activecareers.id = "activeCareers";

    const careerBody = document.getElementById("careers");
    careerBody.appendChild(activecareers);

    // for every entry from our json file...
    for(let i = 0; i < careers.length; i++){

        // get name, rating, skills, tags, etc...
        const careerInfo = document.createElement("div");
        careerInfo.className = "careerCard";

        const careerImg = document.createElement("img");
        careerImg.src = careers[i].careerImg;

        const careerName = document.createElement("strong");
        careerName.className = "careerTitle";
        careerName.innerHTML = careers[i].careerName;

        const careerDesc = document.createElement("p");
        careerDesc.className="careerDesc";
        careerDesc.innerHTML = careers[i].careerDesc;

        const careerButton = document.createElement("button");
        careerButton.innerHTML = "Learn More";
        careerButton.className = "careerButton";

        // put it all together in a neat little card
        careerInfo.appendChild(careerImg);
        careerInfo.appendChild(careerName);
        careerInfo.appendChild(careerDesc);
        careerInfo.appendChild(careerButton);

        careerInfo.id = careers[i].careerID;
        careerIDs.push(careers[i].careerID);

        activecareers.appendChild(careerInfo);
    }
}

// load up our json file
const response = await fetch("./Assets/Data/Data.json");

let data = await response.json();

let careers = data.Careers;

let careerIDs = [];

getcareers();

// just for debug purposes
console.log(careerIDs);

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
    for(let i = 0; i < careers.length; i++){

        // if we have search data, identify if the data appears in career names
        if(filterText.length > 0){
            console.log(careers[i].careerName.toLowerCase());
            if(careers[i].careerName.toLowerCase().includes(filterText)){
                // if so, we must now check if there are any check filters, if not then we can add the id to valid ids
                if(filterVals.length == 0){
                    validIds.push(careers[i].careerID);
                }
                // otherwise, see if one of the filter values correlates with one of the aspects of our career
                else{
                    for(let j = 0; j < filterVals.length; j++){
                        if(careers[i].Industry == filterVals[j] || careers[i].School == filterVals[j] || careers[i].Major == filterVals[j]){
                            validIds.push(careers[i].careerID);
                        }
                    }
                }
            }
        // no filtertext? just check for filter values with checkboxes like above then
        }else{
            if(filterVals.length == 0){
                validIds.push(careers[i].careerID);
            }
            else{
                for(let j = 0; j < filterVals.length; j++){
                    if(careers[i].Industry == filterVals[j] || careers[i].School == filterVals[j] || careers[i].Major == filterVals[j]){
                        validIds.push(careers[i].careerID);
                    }
                }
            }
        }
    }

    console.log(validIds);

    // now that we finally have a set of valid ids, we can hide those that shouldn't be seen
    const careerCards = document.getElementsByClassName("careerCard");
    console.log(careerCards);

    // go through each career, if it's valid, show it, otherwise display nothing
    for(let i = 0; i < careerCards.length; i++){
        let toBeHidden = true;
        for(let j = 0; j < validIds.length; j++){
            if(validIds[j] == careerCards[i].id){

                console.log("Element won't be hidden");
                toBeHidden = false;
                break;
            }
        }
        if(toBeHidden == true){
            careerCards[i].style.display = "none";
        }
        else{
            careerCards[i].style.display = "block";
        }
    }
});
