function createRecommendedCourseCard(courseData) {
    // Create the main card container
    const card = document.createElement('div');
    card.className = 'recommendedCourseCard courseCard';
    card.id = courseData.courseID;

    // Create the "add" button with SVG
    const addButton = document.createElement('div');
    addButton.className = 'addRecommendedCourse';
    addButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
            <path d="M0 7H15" stroke="#2020D2"/>
            <path d="M7.5 0V14" stroke="#2020D2"/>
        </svg>
    `;
    card.appendChild(addButton);

    // Create the approval stamp if the course is alumni approved
    
    const approvalStamp = document.createElement('div');
    approvalStamp.className = 'approvalStamp';
    approvalStamp.textContent = 'Alumni Approved';
    if (!"Alumni Approved" in courseData.Tags) {
        approvalStamp.style = 'visibility: hidden;';
    }
    card.appendChild(approvalStamp);
    

    // Create the course name and title section
    const courseName = document.createElement('div');
    courseName.className = 'recommendedCourseCardName';
    courseName.innerHTML = `
        <p class="code">${courseData.School}</p>
        <p class="title">${courseData.courseName}</p>
    `;
    card.appendChild(courseName);

    // Create the course info section
    const courseInfo = document.createElement('div');
    courseInfo.className = 'recommendedCourseCardInfo';
    courseInfo.innerHTML = `
        <p>
            ${courseData.description || ''}
        </p>
    `;
    card.appendChild(courseInfo);

    return card;
}

// this function extracts and builds our courses from our Data.json file
function getCourses(){

    // activeCourses seperates our filter from the course cards
    const activeCourses = document.createElement("div");
    activeCourses.id = "activeCourses";

    const courseBody = document.getElementById("courses");
    courseBody.appendChild(activeCourses);

    // for every entry from our json file...
    for(let i = 0; i < courses.length; i++){
        
        const courseCard = createRecommendedCourseCard(courses[i]);

        activeCourses.appendChild(courseCard);
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

    console.log(`valid IDs: ${validIds}`);

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
