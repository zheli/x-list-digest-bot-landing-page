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

3. Generate `index.html` from the template:
   ```bash
   make build
   ```
   
   Or directly with the script:
   ```bash
   ./inject-env.sh
   ```
   
   Or with environment variable directly:
   ```bash
   GOOGLE_ANALYTICS_STREAM_ID=G-ABC123XYZ make build
   ```

4. Open `index.html` in a web browser to view the landing page locally.

**Note:** The `.env` file is gitignored and will not be committed to the repository.

## Development

For local development:

1. **Quick start (no analytics):** 
   - Simply open `index.template.html` directly in a web browser
   - The page will work but analytics will not be collected (placeholder ID shows in template)

2. **With analytics (optional):**
   - Copy `.env.example` to `.env`
   - Edit `.env` and replace `G-XXXXXXXXXX` with your actual GA4 Measurement ID
   - Generate index.html: `make build`
   - Open the generated `index.html` in a web browser

### Makefile Commands

- `make help` - Show available commands
- `make build` - Generate index.html from template
- `make clean` - Remove generated index.html
- `make test` - Test the build process

### File Structure

- `index.template.html` - The source template (can be opened directly in browser)
- `index.html` - Generated file (not committed to git)
- `inject-env.sh` - Script to inject environment variables
- `Makefile` - Build automation

**Note:** When making changes to the page structure or content, edit `index.template.html` instead of `index.html`. The `index.html` file is generated and should not be committed to the repository.

The site is a static HTML page and doesn't require a build process or server.
