document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const careerTitle = urlParams.get('career');

    if (careerTitle) {
        console.log("careerTitle check");
        // TODO: look for careerTitle in Data.Careers and update description
        updateCareer(careerTitle);
    }
    // Get all buttons with the shared class name
    const buttons = document.querySelectorAll('.subpage');
    const pages = document.querySelectorAll('.subpageContent');
    
    // Add click event listener to each button
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove 'selected' class from all buttons
            buttons.forEach(btn => {
                btn.classList.remove('selected');
            });
            pages.forEach(page => {
                page.classList.add('hidden');
            });
            
            // Add 'selected' class to the clicked button
            this.classList.add('selected');

            // Slice removes the T at the end of the id
            console.log(this.id.slice(0,-1));

            document.getElementById(this.id.slice(0,-1)).classList.remove('hidden');
        });
    });
});


async function updateCareer(name){
    let response = await fetch("./Assets/Data/AdditionalCareer.json");
    let list = await response.json();
    careerObj =  list.find(career => career.careerName === name);
    console.log(careerObj);
        console.log(careerObj.Object);
        if(careerObj.skills){
            console.log("Skills: "+careerObj.skills);
            let skills = document.getElementById("careerSpecificYSK");
            skills.innerHTML = "";
            careerObj.skills.forEach(element => {
                let skill = document.createElement('div');
                skill.textContent = element
                skills.appendChild(skill);
            });
        }
        if(careerObj.alumniStudied){
            let majors = document.getElementById("careerSpecificAS");
            majors.innerHTML = "";
            careerObj.alumniStudied.forEach(element => {
                let major = document.createElement('div');
                major.textContent = element
                majors.appendChild(major);
            });
        }
        if(careerObj.longDescription){
            let description = document.getElementById("careerSpecificDescription");
            description.innerHTML = careerObj.longDescription;
        }
}