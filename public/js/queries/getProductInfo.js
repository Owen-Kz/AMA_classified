const url = new URL(window.location.href);
const pathname = url.pathname; // '/l/Videography/7231'
const segments = pathname.split('/').filter(Boolean);

const productTitle= segments[1]; // 'Videography'
const id = segments[2];       // '7231'

const priceContainer = document.getElementById("priceContainer")
const locationContainer = document.getElementById("locationContainer")
const conditionContainer = document.getElementById("conditionContainer")
const descriptionContainer = document.getElementById("descriptionContainer")
const purposeContainer = document.getElementById("purposeContainer")

function GetProductDetails(productId, productTitle) {
    fetch(`/details/${productTitle}/${productId}`, {
        method:"GET"
    }).then(res=>res.json())
    .then(data =>{
        if(data.success){
            const productDetails = data.details
            purposeContainer.innerText = productDetails.purpose
            locationContainer.innerText = productDetails.country
            conditionContainer.innerText = productDetails.condition
            priceContainer.innerText = productDetails.price
        }else{
            alert(data.error)
            window.location.href = "/"
        }
    })
}

if(productTitle && id){
    console.log(productTitle, id)
    GetProductDetails(id, productTitle)
}else{
    window.location.href = '/'
}