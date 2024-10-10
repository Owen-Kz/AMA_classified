import { quill } from "../forms/quill.js";
import { formatTimestamp } from "/js/routes/formatDate.js";

const emailForm = document.getElementById("emailForm");

emailForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const message = document.getElementById("text-subject");
  const to = document.getElementById("to");
  const subject = document.getElementById("subject");
  const quillMessage = JSON.stringify(quill.getContents().ops); // Quill Delta format

  const formData = {
    to: to.value,
    subject: subject.value,
    message: quillMessage
  };

  fetch(`/mail/send`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'  // Ensure JSON format
    },
    body: JSON.stringify(formData),  // Send formData as JSON
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        alert(data.success);
      } else if (data.error) {
        alert(data.error);
      } else {
        alert(data);
      }
    });
});

const emailListContainer = document.getElementById("emailListContainer");
const emailContentContainer = document.getElementById("emailContentContainer");

function UpdateContent(content, subject) {
  emailContentContainer.innerHTML = `
    <h4 class="fw-semibold text-dark mb-3">${subject}</h4>
    <p class="mb-3 text-dark">${content}</p>
  `;
}

fetch(`/mail/sent`, {
  method: "POST",
})
  .then((res) => res.json())
  .then((data) => {
    if (data.success) {
      const emails = data.emailList; // No need to parse if it's already an object 
      for(let i=0; i<emails.length; i++) {
        const email = emails[i]


        const listItem = document.createElement("li");
        const anchor = document.createElement("a");
        anchor.href = "javascript:void(0)";
        anchor.className = "px-4 py-3 bg-hover-light-black d-flex align-items-start chat-user bg-light-subtle";
        anchor.dataset.userId = email.id;
        

        anchor.addEventListener("click", () => {
          UpdateContent(email.body, email.subject);
        });

        anchor.innerHTML = `
          <div class="position-relative w-100 ms-2">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <h6 class="mb-0">${email.recipient}</h6>
            </div>
            <h6 class="fw-semibold text-dark">${email.subject}</h6>
            <div class="d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center"></div>
              <p class="mb-0 fs-2 text-muted">${formatTimestamp(email.date_sent)}</p>
            </div>
          </div>
        `;

        listItem.appendChild(anchor);
        emailListContainer.appendChild(listItem);
      }
    }
  });
