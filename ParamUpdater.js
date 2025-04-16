document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const careerTitle = urlParams.get('career');
    console.log("career title: "+careerTitle);

    if (careerTitle) {
        // Update the career title on the page
        document.querySelectorAll('.selectedCareer').forEach(elem => {
            elem.innerHTML = careerTitle;
        });
    }

    // Add button for View More with params
    document.querySelectorAll('.includeParams').forEach(a => {
        a.href += `?career=${careerTitle}`;
    });
    
});