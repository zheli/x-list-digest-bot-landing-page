# x-list-digest-bot-landing-page
The landing page for x-list digest bot

## Features

- Responsive landing page design
- Modal-based signup and login forms
- Form validation
- Google Analytics 4 (GA4) tracking

## Setup

### Google Analytics 4 Configuration

The landing page includes GA4 tracking support. The Google Analytics Measurement ID is injected from environment variables during deployment for security.

#### For Production (GitHub Pages Deployment)

1. Create a GA4 property in [Google Analytics](https://analytics.google.com/)
2. Obtain your GA4 Measurement ID (format: `G-XXXXXXXXXX`)
3. Add the Measurement ID as a GitHub Actions secret:
   - Go to your repository Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `GOOGLE_ANALYTICS_STREAM_ID`
   - Value: Your GA4 Measurement ID (e.g., `G-ABC123XYZ`)

The deployment workflow will automatically inject this ID when deploying to GitHub Pages.

#### For Local Development

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and replace `G-XXXXXXXXXX` with your actual GA4 Measurement ID:
   ```
   GOOGLE_ANALYTICS_STREAM_ID=G-ABC123XYZ
   ```

3. Install dotenv package (optional, for convenience):
   ```bash
   npm install dotenv
   ```

4. Generate `index.html` from the template:
   ```bash
   node inject-env.js
   ```
   
   Or with environment variable directly:
   ```bash
   GOOGLE_ANALYTICS_STREAM_ID=G-ABC123XYZ node inject-env.js
   ```

5. Open `index.html` in a web browser to view the landing page locally.

**Note:** The `.env` file is gitignored and will not be committed to the repository.

## Development

For local development without Google Analytics:
1. Set a placeholder ID: `GOOGLE_ANALYTICS_STREAM_ID=G-XXXXXXXXXX node inject-env.js`
2. Open the generated `index.html` in a web browser

The site is a static HTML page and doesn't require a build process or server.
