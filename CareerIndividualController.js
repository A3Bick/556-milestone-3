document.addEventListener('DOMContentLoaded', function() {
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
