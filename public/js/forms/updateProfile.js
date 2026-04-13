var editAction = document.querySelectorAll('.form_control');
const editButton = document.querySelectorAll(".bi-pen");
const inputFields = document.querySelectorAll("input");
const submitButton = document.querySelectorAll(".bi-check-circle-fill");
const submitPhoto = document.getElementById("submitProfilePicture")
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
    const submitB = submitButton[i];

    edit.addEventListener('click', () => {
        field.removeAttribute("readonly");
        submitB.style.display = "block"
    });
}

for (let i = 0; i < submitButton.length; i++) {
    const submitB = submitButton[i];
    submitB.style.display = "none"
    const field = inputFields[i+1];  // Adjust based on your HTML structure

    submitB.addEventListener('click', () => {
        const fieldId = field.id;     // Get the current field ID
        const fieldValue = field.value;  // Get the current value of the field

        if (fieldValue !== "") {
            saveItem(fieldId, fieldValue);  // Send the latest value to the server
        }
    });
}


const imageInput = document.getElementById('thumbnail');
const imagePreview = document.getElementById('image-preview');
const dzbutton = document.querySelector(".dz-button")
const removeImageContainer = document.querySelector("#removeImageContainer")
// imagePreview.style.display = "none"
removeImageContainer.style.display = "none"
submitPhoto.style.display = "none"
const profilePictureForm = document.getElementById("profilePictureForm")

profilePictureForm.addEventListener("submit", function(e) {
    e.preventDefault()
    const newData = new FormData(profilePictureForm)
    submitPhoto.setAttribute("disabled", true)
    fetch(`/updateProfileImage`, {
        method:"POST",
        body:newData,
    }).then(res => res.json())
    .then(data =>{
        if(data.success){
            alert(data.success)
            window.location.reload()
        }else{
            alert(data.error)
            submitPhoto.removeAttribute("disabled")
        }
    })
})
dzbutton.addEventListener("click", function() {
    imageInput.click()
})
imageInput.addEventListener('change', function() {
    const file = this.files[0];
    imagePreview.style.display = "flex"
    removeImageContainer.style.display = "block"
    dzbutton.style.display = "none"
    submitPhoto.style.display = "block"

    if (file) {
        const fileType = this.files[0].type 
        const fileSize = this.files[0].size
        if(fileType  !== 'image/jpeg' && fileType !== 'image/jpg' && fileType !== 'image/png'){
            alert("Wrong file type, Choose a JPEG or PNG file")
            this.files[0] = []
            file.value = ""
        }else if(this.files[0].size > 5000000){
           alert("File is too large, Choose a file below less than 5MB")
           this.value = ""
           this.files[0] = []
       }else{
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            imagePreview.innerHTML = '';
            imagePreview.appendChild(img);
        }
        reader.readAsDataURL(file);
    }
    } else {
        imagePreview.innerHTML = '<p>No image selected</p>';
    }
});

const removebutton = removeImageContainer.querySelector("button")
removebutton.addEventListener("click", function(){
    // imagePreview.style.display = "none"
    imagePreview.innerHTML = `<img src="/plugins/images/users1.jpg" alt="profile_photo">`
    removeImageContainer.style.display = "none"
    dzbutton.style.display = "flex"
    submitPhoto.style.display = "none"
})



// Copy referral Link 
const input = document.querySelector(".linkContainer"),
copy = document.querySelector(".copy");

copy.onclick = ()=>{
  input.select(); //select input value
  if(document.execCommand("copy")){ //if the selected text is copied
    copy.innerText = "Copied";
    setTimeout(()=>{
      window.getSelection().removeAllRanges(); //remove selection from page
      copy.innerText = "Copy";
    }, 3000);
  }
}