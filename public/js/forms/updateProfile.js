var editAction = document.querySelectorAll('.form_control');
const editButton = document.querySelectorAll(".bi-pen");
const inputFields = document.querySelectorAll("input");
const submitButton = document.querySelectorAll(".bi-check-circle-fill");

function saveItem(field, value){
    fetch(`/saveProfile/${field}/${value}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
    .then(data => {
        if (data) {
            if (data.success) {
                alert(data.success);
            } else {
                alert(data.error);
            }
        } else {
            alert("Internal Server Error");
        }
    });
}

for (let i = 0; i < editButton.length; i++) {
    const edit = editButton[i];
    const field = inputFields[i+1];  // Adjust based on your HTML structure

    edit.addEventListener('click', () => {
        field.removeAttribute("readonly");
    });
}

for (let i = 0; i < submitButton.length; i++) {
    const submitB = submitButton[i];
    const field = inputFields[i+1];  // Adjust based on your HTML structure

    submitB.addEventListener('click', () => {
        const fieldId = field.id;     // Get the current field ID
        const fieldValue = field.value;  // Get the current value of the field

        if (fieldValue !== "") {
            saveItem(fieldId, fieldValue);  // Send the latest value to the server
        }
    });
}
