import React from "react";
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton=({price})=>{

  const  onToken=token=>{
        console.log(token);
        alert('Payment successful')
    }

    const priceForStripe=price*100;
    const publishableKey = 'pk_test_51KjKggDMmOgJkKbf4DNagXa7JEno87gekHQPXbVGhcFAY5zuiFr9vR95L3I2Qzqipalv3GbsdUFaSWcwqBCxOcLR00Kw6YvgTE';
    
    return(
        <StripeCheckout
            label="Pay Now"
            name="Gadgets Nepal"
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={ `Your price is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}


        />
    );
}
export default StripeCheckoutButton;