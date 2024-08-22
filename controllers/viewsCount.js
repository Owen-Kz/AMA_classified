const ViewsCount = async (req,res) =>{
    try {
        const response = await fetch(`${process.env.ENDPOINT}/y/viewsCount`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({itemId:req.params.id})
        });

        const responseData = await response.json();

        if (responseData.success) {
         
            return res.json({
                success: responseData.success,
                viewsCount: responseData.count
            });
        } else {
            return res.json({ error: responseData.error });
        }
    } catch (error) {
        console.log(error.message);
        return res.json({ error: error.message });
    }
}

module.exports = ViewsCount