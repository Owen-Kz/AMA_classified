document.addEventListener('DOMContentLoaded', function() {
    const itemButtons = document.querySelectorAll('.item-button');

    itemButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Toggle active class
            itemButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Get the subcategories data
            const subcategories = button.getAttribute('data-subcategories').split(',');

            // Get the corresponding select element
            const subcategorySelect = button.nextElementSibling;
            subcategorySelect.innerHTML = ''; // Clear previous options

            // Populate the select with subcategories
            subcategories.forEach(subcategory => {
                const option = document.createElement('option');
                option.value = subcategory;
                option.textContent = subcategory;
                subcategorySelect.appendChild(option);
            });

            // Show the select element
            subcategorySelect.style.display = 'none';
        });
    });

    // Handle form submission
    const form = document.getElementById('selectionForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const selectedCategories = [];
        const selectedSubcategories = [];

        itemButtons.forEach(button => {
            if (button.classList.contains('active')) {
                selectedCategories.push(button.textContent);
                const subcategorySelect = button.nextElementSibling;
                selectedSubcategories.push(subcategorySelect.value);
            }
        });

        console.log('Selected Categories:', selectedCategories);
        console.log('Selected Subcategories:', selectedSubcategories);

        // Here you can send the data to the server or process it as needed
        // form.submit(); // Uncomment this line to actually submit the form
    });
});
