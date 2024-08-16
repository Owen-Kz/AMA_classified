async function productDetails(productId, productTitle) {
  return  fetch(`/details/${productTitle}/${productId}`, {
        method:"GET"
    }).then(res=>res.json())
    .then(data =>{
        if(data.success){
            const productDetails = data.details
            return productDetails
        }else{
            return data.error
        }
    })
}

export {
    productDetails
}