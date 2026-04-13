async function GetProductFiles(productId) {
    return fetch(`/listingFiles/${productId}`, {
         method: "GET"
     }).then(res => res.json())
     .then(data => {
         if(data){
         if (data.success) {
             return data.productFiles
         }else{
             return  []
         }
     }else{
         return []
     }
     })
 }


 export {
    GetProductFiles
 }