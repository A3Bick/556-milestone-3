function getCourses(){

    const activeCourses = document.createElement("div");
    activeCourses.id = "activeCourses";

    const courseBody = document.getElementById("courses");
    courseBody.appendChild(activeCourses);

    for(let i = 0; i < courses.length; i++){

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

const response = await fetch("./Assets/Data/Data.json");

let data = await response.json();

let courses = data.Courses;

let courseIDs = [];

getCourses();

console.log(courseIDs);

const filter = document.getElementById("classFilter");
filter.addEventListener('input', function(event){
    console.log("Something happened with filter!");

    //we are just gonna kinda "fake" the functionality here. Each button impacts if courses appear or not
    let filterText = document.getElementsByClassName("filterSearch")[0].value;
    console.log(filterText);

    let activeChecks = filter.querySelectorAll('input[type="checkbox"]:checked');
    console.log(activeChecks);

    let filterVals = [];
    for(let i = 0; i < activeChecks.length; i++){
        filterVals.push(activeChecks[i].id);
    }

    console.log(filterVals);

    let validIds = [];
    for(let i = 0; i < courses.length; i++){

        if(filterText.length > 0){
            console.log(courses[i].courseName.toLowerCase());
            if(courses[i].courseName.toLowerCase().includes(filterText)){
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

    const courseCards = document.getElementsByClassName("courseCard");
    console.log(courseCards);

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
            courseCards[i].style.display = "block";
        }
    }
});
