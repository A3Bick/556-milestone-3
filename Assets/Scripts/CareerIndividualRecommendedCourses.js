function createRecommendedCourseCard(courseData) {
    // Create the main card container
    const card = document.createElement('div');
    card.className = 'recommendedCourseCard';

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
    if (!courseData.alumniApproved) {
        approvalStamp.style = 'visibility: hidden;';
    }
    card.appendChild(approvalStamp);
    

    // Create the course name and title section
    const courseName = document.createElement('div');
    courseName.className = 'recommendedCourseCardName';
    courseName.innerHTML = `
        <p class="code">${courseData.code}</p>
        <p class="title">${courseData.title}</p>
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

const courseDataList = [{
    code: "CSE 330",
    title: "Rapid Prototype and Creative Programming",
    alumniApproved: true,
    description: "Rating: 4.5/5 <br>Skills: Prototyping, JavaScript <br>Times: MWF 10:00-11:20"
},
{
    code: "CSE 131",
    title: "Introduction to Computer Science",
    alumniApproved: true,
    description: "Rating: 4.2/5 <br>Skills: Coding, Java <br>Times: MW 11:30-12:50"
},
{
    code: "CSE 231S",
    title: "Introduction to Parallel and Concurrent Programming",
    alumniApproved: true,
    description: "Rating: 4.9/5 <br> Skills: Parallel, Concurrency, Java <br> Times: TR 2:30-3:50"
},
{
    code: "CSE 256A",
    title: "Introduction to Human-Centered Design",
    alumniApproved: true,
    description: "Rating: 4.7/5 <br>Skills: UI/UX, Design <br>Times: MW 10:00-11:20"
},
{
    code: "CSE 217",
    title: "Introduction to Data Science",
    alumniApproved: false,
    description: "Rating: 4.5/5 <br>Skills: Data Science, Python <br>Times: TR 1:00-2:20"
},
{
    code: "CSE 361S",
    title: "Introduction to Systems Software",
    alumniApproved: false,
    description: "Rating: 3.3/5 <br>Skills: Machine Code, System Design <br>Times: TR 10:00-11:20"
}];

document.addEventListener('DOMContentLoaded', function() {
    courseDataList.forEach(courseData => {
        console.log("courseData: "+courseData.code);
        const courseCard = createRecommendedCourseCard(courseData);
        const container = document.getElementById("recommendedCourses");
        container.appendChild(courseCard);
    });
});


const clubsList = [{
    code: "WUDBF",
    title: "Design/Build/Fly",
    description: "Design, build and test lightweight aircraft on a budgetdesign, fabricate, and demonstrate the flight capabilities of an unmanned, electric powered, radio-controlled aircraft which can best meet the specified mission profile"
},
{
    code: "WURC",
    title: "Robotics",
    description: "Strives to learn about, build, and compete with robots"
},{
    code: "WURocketry",
    title: "Rocketry",
    description: "Design, test, build, and launch of an 8-10 foot reusable rocket approximately 1 mile into the air"
}
];

document.addEventListener('DOMContentLoaded', function() {
    clubsList.forEach(clubData => {
        console.log("courseData: "+clubData.code);
        const courseCard = createRecommendedCourseCard(clubData);
        const container = document.getElementById("clubsOnCampus");
        container.appendChild(courseCard);
    });
});

const internshipList = [{
    code: "Amazon",
    title: "Software Development Engineer",
    description: "Pay: $6k/Month <br> Work through a real-world project design and implementation to gain experience"
},
{
    code: "Boeing",
    title: "Software Engineer",
    description: "Pay: $30/Hr <br> Act as a temporary employee to help find and fix bugs in a real software system"
},{
    code: "WashU",
    title: "Researcher",
    description: "Pay: $17/Hr <br> Wrok closesly with a professor and help with state-of-the-art Computer Science research"
}
];

document.addEventListener('DOMContentLoaded', function() {
    internshipList.forEach(internship => {
        console.log("courseData: "+internship.code);
        const internshipCard = createRecommendedCourseCard(internship);
        const container = document.getElementById("careerInternships");
        container.appendChild(internshipCard);
    });
});

const projectList = [{
    code: "Chess App",
    title: "Coding Project",
    description: "Create a chess app that only allows legal moves and automatically detects check and checkmate"
},
{
    code: "Video game",
    title: "Game Development",
    description: "Create a new video game or show that you are capable of efficiently replicating one that already exists"
},
{
    code: "Twitter bot",
    title: "APIs, Backend",
    description: "Use Twitter's API to make a bot that reads or writes tweets automatically"
}
];

document.addEventListener('DOMContentLoaded', function() {
    projectList.forEach(project => {
        console.log("courseData: "+project.code);
        const projectCard = createRecommendedCourseCard(project);
        const container = document.getElementById("personalProjects");
        container.appendChild(projectCard);
    });
});