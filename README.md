# x-list-digest-bot-landing-page
The landing page for x-list digest bot

## Features

- Responsive landing page design
- Modal-based signup and login forms
- Form validation
- Google Analytics 4 (GA4) tracking

## Setup

### Google Analytics 4 Configuration

The landing page includes GA4 tracking support. To enable analytics:

1. Create a GA4 property in [Google Analytics](https://analytics.google.com/)
2. Obtain your GA4 Measurement ID (format: `G-XXXXXXXXXX`)
3. Open `index.html` and replace both instances of `G-XXXXXXXXXX` with your actual Measurement ID:
   - Line 10: In the script src URL
   - Line 15: In the gtag config call

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
