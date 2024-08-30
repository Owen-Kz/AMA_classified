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

    fetch(`/getTransactions`, {
        method:"POST",
        headers:{
            "Content-type":"application/JSON"
        },
    }).then(res=>res.json())
    .then(data=>{
        if(data){
            if(data.success){
            const MainTransactionsList = data.TransactionsList;
            const newTransactionsArray = [];
            
            const findATransaction = document.getElementById("findATransaction");
            const TransactionsContainer = document.getElementById("TransactionsContainer"); // Assuming you have this element
          
            function updateUI(TransactionsList) {
              
                TransactionsContainer.innerHTML = ''; // Clear previous content
                if (TransactionsList.length > 0) {
                    TransactionsList.forEach(Transaction => {
                        const AccountStatus = Transaction.payment_status;
                        let StatusColor = "";
            
                        if (AccountStatus === 'verified') {
                            StatusColor = "status-green";
                        } else {
                            StatusColor = "status-orange";
                        }
            
                        TransactionsContainer.innerHTML += `       
                            <tr>
                                <td>${Transaction.payment_id}</td>
                                <td>${Transaction.payer_id}</td>
                                <td>${Transaction.payer_email}</td>
                                <td>
                                    <p>${Transaction.currency} ${Transaction.amount.toLocaleString()}</p> 
                                                                      
                                </td>
                                <td><p>${formatTimestamp(Transaction.updated_at)}</p></td>
                                <td class="status">
                                    <span class="status-text ${StatusColor}">${AccountStatus}</span>
                                </td>
                              
                            </tr> 
                        `;
                    });
            
               
             
                } else {
                    TransactionsContainer.innerHTML = `<tr><td>No result to display.</td></tr>`;
                }
            }
        
            findATransaction.addEventListener("keyup", function () {
                const searchTerm = findATransaction.value.toLowerCase();
                const filteredTransactions = MainTransactionsList.filter(Transaction => {
                    return (
                        Transaction.payer_email.toLowerCase().includes(searchTerm) ||
                        Transaction.payment_id.toLowerCase().includes(searchTerm)
                    );
                });
                updateUI(filteredTransactions);
            });
            
            updateUI(MainTransactionsList);
            
        }
    }else{
        alert(data.error)
    }
    
    })
  