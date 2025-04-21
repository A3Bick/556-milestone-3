document.addEventListener('DOMContentLoaded', function() {
    updateParams();
});

export function updateParams(){
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
        const baseUrl = a.href.split('?')[0];
        a.href = baseUrl + `?career=${careerTitle}`;
    });
}