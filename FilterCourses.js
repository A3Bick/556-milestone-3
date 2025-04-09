const response = await fetch("./Assets/Data/Data.json");

let data = await response.json();

let courses = data.Courses;

console.log(courses);

const activeCourses = document.createElement("div");
activeCourses.id = "activeCourses";
document.body.appendChild(activeCourses);

for(let i = 0; i < courses.length; i++){
    const courseInfo = document.createElement("div");
    courseInfo.className = "courseInfo";

    const courseName = document.createElement("p");
    courseName.className = "courseName";
    courseName.innerHTML = courses[i].courseName;

    const courseRating = document.createElement("p");
    courseRating.innerHTML = "Rating: ".concat(courses[i].courseRating);

    const skills = document.createElement("p");
    let skillString = "Skills: ";
    for(let j = 0; j < courses[i].skills.length; j++){
        skillString = skillString.concat(courses[i].skills[j], " ");
    }
    skills.innerHTML = skillString;


    let dayString = "Days and Times: ";
    for(let j = 0; j < courses[i].Days.length; j++){
        dayString = dayString.concat(courses[i].Days[j], ", ");
    }

    const times = document.createElement("p");
    dayString = dayString.concat(courses[i].Times[0], "-", courses[i].Times[1]);
    times.innerHTML = dayString;

    courseInfo.appendChild(courseName);
    courseInfo.appendChild(courseRating);
    courseInfo.appendChild(skills);
    courseInfo.appendChild(times);

    activeCourses.appendChild(courseInfo);
}
