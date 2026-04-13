const referralsContainer = document.getElementById("referralsContainer")


function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
  
    const dayName = days[date.getDay()];
    const monthName = months[date.getMonth()];
    const day = date.getDate(); // Numeric day of the month
    const year = date.getFullYear();
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
  
    return `${day} ${monthName}, ${year}`;
  }

async function GetSellerDetails(uid){
    return fetch(`/seller/profile/details/`, {
        method:"POST",
        body:JSON.stringify({u_id:uid}),
        headers:{
            "Content-type" : "application/JSON"
        }
    }).then(res=>res.json())
    .then(data=>{

        if(data.success){
            return data.sellerDetails.u_name
        }else{
            return null
        }
    })
}


fetch(`/getReferrals`, {
    method:"POST",
    headers: {
        "Content-type" : "application/JSON"
    }
}).then(res => res.json())
.then( async data => {
    if(data.success){
        const referrals = data.referrals 
        if(referrals.length > 0){
            for(let i=0; i<referrals.length; i++){
                let Status = ""
                if(referrals[i].status === "approved" || referrals[i].status === "completed"){
                    Status = `<span class="status-text status-green">Payment Completed</span>`
                }else if(referrals[i].status === "rejected"){
                    Status = `<span class="status-text status-red">Rejected</span>`

                }else if(referrals[i].status === "pending"){
                    Status = `<span class="status-text status-orange">Invited, Pending Advert Placement</span>`
                }else if(referrals[i].status === "registered"){
                    Status = `<span class="status-text status-orange">Registered, Pending Advert Placement</span>`
                    
                }

                referralsContainer.innerHTML += `<tr>
                <td>${await GetSellerDetails(referrals[i].referred_user)}</td>
                <td>${formatTimestamp(referrals[i].date_referred)}</td>
                <td>${Currency} ${new Number(referrals[i].bonus * ExchangeRate).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td>${Status}</td>
                </tr>`
            }
        }else{
            referralsContainer.innerHTML = "No Referrals Available at the moment"
        }
    }else{
        alert(data.error)
    }
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