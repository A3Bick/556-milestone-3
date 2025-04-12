async function getCourses(){
    const response = await fetch("./Assets/Data/Data.json");

    let data = await response.json();

    let courses = data.Courses;

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

let courseIDs = [];

getCourses();

console.log(courseIDs);
