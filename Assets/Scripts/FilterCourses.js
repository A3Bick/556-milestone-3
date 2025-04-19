// this function extracts and builds our courses from our Data.json file
function getCourses(){

    // activeCourses seperates our filter from the course cards
    const activeCourses = document.createElement("div");
    activeCourses.id = "activeCourses";

    const courseBody = document.getElementById("courses");
    courseBody.appendChild(activeCourses);

    // for every entry from our json file...
    for(let i = 0; i < courses.length; i++){

        // get name, rating, skills, tags, etc...
        const courseInfo = document.createElement("div");
        courseInfo.className = "courseCard";

        const courseCardTop = document.createElement("div");
        courseCardTop.className = "courseCardTop";

        const courseName = document.createElement("p");
        courseName.className = "courseTitle";
        courseName.innerHTML = courses[i].courseName;

        const addButton = document.createElement("button");
        addButton.className = "addToPlan";
        addButton.innerHTML = "Add to Plan";

        courseCardTop.appendChild(courseName);
        courseCardTop.appendChild(addButton);

        const courseRating = document.createElement("p");
        courseRating.className="courseRating";
        courseRating.innerHTML = "Rating: ".concat(courses[i].courseRating);

        const skills = document.createElement("p");
        let skillString = "Skills: ";
        for(let j = 0; j < courses[i].skills.length; j++){
            skillString = skillString.concat(courses[i].skills[j], " ");
        }
        skills.className="courseSkills";
        skills.innerHTML = skillString;


        let dayString = "Days and Times: ";
        for(let j = 0; j < courses[i].Days.length; j++){
            dayString = dayString.concat(courses[i].Days[j], ", ");
        }

        const times = document.createElement("p");
        dayString = dayString.concat(courses[i].Times[0], "-", courses[i].Times[1]);
        times.className="courseTimes";
        times.innerHTML = dayString;

        const Tags = document.createElement("p");
        let tagString = "Tags: ";
        for(let j = 0; j < courses[i].Tags.length; j++){
            tagString = tagString.concat(courses[i].Tags[j], " ");
        }

        Tags.innerHTML = tagString;
        Tags.className = "courseTags";

        // put it all together in a neat little card
        courseInfo.appendChild(courseCardTop);
        courseInfo.appendChild(courseRating);
        courseInfo.appendChild(skills);
        courseInfo.appendChild(times);
        courseInfo.appendChild(Tags);

        courseInfo.id = courses[i].courseID;
        courseIDs.push(courses[i].courseID);

        activeCourses.appendChild(courseInfo);
    }
}

// load up our json file
const response = await fetch("./Assets/Data/Data.json");

let data = await response.json();

let courses = data.Courses;

let courseIDs = [];

getCourses();

// just for debug purposes
console.log(courseIDs);

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

    // from the checkboxes, we want the id of them, this is important
    let filterVals = [];
    for(let i = 0; i < activeChecks.length; i++){
        filterVals.push(activeChecks[i].id);
    }

    console.log(filterVals);

    // now what we want to do is focus on two cases: there is search data, there is not
    let validIds = [];
    for(let i = 0; i < courses.length; i++){

        // if we have search data, identify if the data appears in course names or skills
        if(filterText.length > 0){
            console.log(courses[i].courseName.toLowerCase());
            if(courses[i].courseName.toLowerCase().includes(filterText) || courses[i].skills.join().toLowerCase().includes(filterText)){
                // if so, we must now check if there are any check filters, if not then we can add the id to valid ids
                if(filterVals.length == 0){
                    validIds.push(courses[i].courseID);
                }
                // otherwise, see if one of the filter values correlates with one of the aspects of our course
                else{
                    for(let j = 0; j < filterVals.length; j++){
                        if(courses[i].Industry == filterVals[j] || courses[i].School == filterVals[j] || courses[i].Major == filterVals[j]){
                            validIds.push(courses[i].courseID);
                        }
                    }
                }
            }
        // no filtertext? just check for filter values with checkboxes like above then
        }else{
            if(filterVals.length == 0){
                validIds.push(courses[i].courseID);
            }
            else{
                for(let j = 0; j < filterVals.length; j++){
                    if(courses[i].Industry == filterVals[j] || courses[i].School == filterVals[j] || courses[i].Major == filterVals[j]){
                        validIds.push(courses[i].courseID);
                    }
                }
            }
        }
    }

    console.log(validIds);

    // now that we finally have a set of valid ids, we can hide those that shouldn't be seen
    const courseCards = document.getElementsByClassName("courseCard");
    console.log(courseCards);

    // go through each course, if it's valid, show it, otherwise display nothing
    for(let i = 0; i < courseCards.length; i++){
        let toBeHidden = true;
        for(let j = 0; j < validIds.length; j++){
            if(validIds[j] == courseCards[i].id){

                console.log("Element won't be hidden");
                toBeHidden = false;
                break;
            }
        }
        if(toBeHidden == true){
            courseCards[i].style.display = "none";
        }
        else{
            courseCards[i].style.display = "";
        }
    }
});
