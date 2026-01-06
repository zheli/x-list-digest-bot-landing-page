# x-list-digest-bot-landing-page
The landing page for x-list digest bot

## Features

- Responsive landing page design
- Stripe payment integration for subscriptions
- Modal-based signup and login forms
- Form validation
- Google Analytics 4 (GA4) tracking
- Success page for post-subscription confirmation

## Setup

### Stripe Integration

The landing page includes Stripe Checkout integration for handling subscriptions. To enable payment processing:

1. **Get your Stripe API keys:**
   - Sign up or log in to [Stripe Dashboard](https://dashboard.stripe.com/)
   - Navigate to Developers > API keys
   - Copy your **Publishable key** (starts with `pk_test_` for test mode or `pk_live_` for production)

2. **Configure the publishable key:**
   - Open `script.js`
   - Find the `STRIPE_PUBLISHABLE_KEY` constant at the top of the file
   - Replace `'pk_test_YOUR_PUBLISHABLE_KEY_HERE'` with your actual publishable key

3. **Set up a backend for Checkout Sessions:**
   - Stripe Checkout requires a backend to create checkout sessions securely
   - Create an endpoint (e.g., `/create-checkout-session`) that:
     - Accepts the customer email
     - Creates a Stripe Checkout Session with your product/price ID
     - Returns the session ID
   - Update the signup form handler in `script.js` to call your endpoint
   - Configure success and cancel URLs to point to `success.html` and your landing page

Example backend endpoint (Node.js/Express):
```javascript
app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    customer_email: req.body.email,
    line_items: [{
      price: 'price_YOUR_PRICE_ID', // Your Stripe Price ID
      quantity: 1,
    }],
    mode: 'subscription',
    success_url: 'https://yourdomain.com/success.html',
    cancel_url: 'https://yourdomain.com/',
  });
  res.json({ id: session.id });
});
```

### Google Analytics 4 Configuration

The landing page includes GA4 tracking support. To enable analytics:

1. Create a GA4 property in [Google Analytics](https://analytics.google.com/)
2. Obtain your GA4 Measurement ID (format: `G-XXXXXXXXXX`)
3. Open `index.html` and replace both instances of `G-XXXXXXXXXX` with your actual Measurement ID:
   - Line 11: In the script src URL
   - Line 16: In the gtag config call

Example:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-ABC123XYZ"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-ABC123XYZ');
</script>
```

## Development

Simply open `index.html` in a web browser to view the landing page locally.

## Pages

- `index.html` - Main landing page with pricing and signup
- `success.html` - Post-subscription confirmation page
