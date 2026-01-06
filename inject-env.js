#!/usr/bin/env node

/**
 * Script to inject environment variables into index.html from index.html.template
 * 
 * Usage:
 *   node inject-env.js
 * 
 * Environment variables:
 *   GOOGLE_ANALYTICS_STREAM_ID - Google Analytics 4 Measurement ID (e.g., G-XXXXXXXXXX)
 * 
 * For local development, you can use a .env file with the dotenv package,
 * or simply export the environment variable before running the script.
 */

const fs = require('fs');
const path = require('path');

// Try to load .env file if it exists (for local development)
try {
  const dotenvPath = path.join(__dirname, '.env');
  if (fs.existsSync(dotenvPath)) {
    const dotenv = require('dotenv');
    dotenv.config();
    console.log('Loaded environment variables from .env file');
  }
} catch (error) {
  // dotenv is not required for CI/CD, only for local development
  console.log('dotenv not available or .env file not found, using system environment variables');
}

const templatePath = path.join(__dirname, 'index.html.template');
const outputPath = path.join(__dirname, 'index.html');

// Read template file
let template;
try {
  template = fs.readFileSync(templatePath, 'utf8');
} catch (error) {
  console.error(`Error reading template file: ${error.message}`);
  process.exit(1);
}

// Get Google Analytics Stream ID from environment
const googleAnalyticsStreamId = process.env.GOOGLE_ANALYTICS_STREAM_ID;

if (!googleAnalyticsStreamId) {
  console.error('Error: GOOGLE_ANALYTICS_STREAM_ID environment variable is not set');
  console.error('For local development, create a .env file with:');
  console.error('  GOOGLE_ANALYTICS_STREAM_ID=G-XXXXXXXXXX');
  process.exit(1);
}

// Validate format (basic check for G-XXXXXXXXXX format)
if (!/^G-[A-Z0-9]+$/.test(googleAnalyticsStreamId)) {
  console.warn(`Warning: GOOGLE_ANALYTICS_STREAM_ID format may be invalid: ${googleAnalyticsStreamId}`);
  console.warn('Expected format: G-XXXXXXXXXX');
}

// Replace placeholder with actual value
const output = template.replace(/\{\{GOOGLE_ANALYTICS_STREAM_ID\}\}/g, googleAnalyticsStreamId);

// Write output file
try {
  fs.writeFileSync(outputPath, output, 'utf8');
  console.log(`Successfully generated index.html with Google Analytics ID`);
} catch (error) {
  console.error(`Error writing output file: ${error.message}`);
  process.exit(1);
}
