// NOTICE: Stripe operations migrated to ama_endpoint.
// const stripe = require('stripe')(process.env.STRIPE_API_TEST_KEY)

const paidAdvertPage = async (req,res) =>{
    const sessionId = req.cookies.sessionId;

    try {
    res.render("postPaidItem", {username:req.user.u_name})
    } catch (err) {
      console.error(err);
      res.status(500).send('Unable to retrieve session.');
    }
}


module.exports = paidAdvertPage