import React from 'react';
import ReactDOMServer from 'react-dom/server';
import fs from 'fs';
import path from 'path';
import { ReactEmailNewsletter } from './emails/ReactEmailNewsletter';
import { renderReactEmailToAmp } from './reactEmailToAmp';
import { renderEmailToHTML } from './reactEmailToHtml';

/**
 * Available email types
 */
const EMAIL_TYPES = {
  'react-newsletter': ReactEmailNewsletter,
} as const;

type EmailType = keyof typeof EMAIL_TYPES;

/**
 * Render React Email component to AMP HTML
 */
async function renderReactEmailToAmpHTML(EmailComponent: React.ComponentType, props?: any): Promise<string> {
  const emailElement = React.createElement(EmailComponent, props);
  return await renderReactEmailToAmp({
    children: emailElement
  });
}

/**
 * Convert HTML to plain text by stripping HTML tags and entities
 */
function htmlToPlainText(html: string): string {
  // Remove HTML tags
  let text = html.replace(/<[^>]*>/g, '');
  
  // Decode common HTML entities
  text = text.replace(/&amp;/g, '&');
  text = text.replace(/&lt;/g, '<');
  text = text.replace(/&gt;/g, '>');
  text = text.replace(/&quot;/g, '"');
  text = text.replace(/&#39;/g, "'");
  text = text.replace(/&nbsp;/g, ' ');
  
  // Clean up whitespace
  text = text.replace(/\s+/g, ' ').trim();
  
  // Add line breaks for better readability
  text = text.replace(/\. /g, '.\n');
  text = text.replace(/! /g, '!\n');
  text = text.replace(/\? /g, '?\n');
  
  return text;
}


/**
 * Ensure directory exists
 */
function ensureDirectoryExists(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Main render function
 */
async function main() {
  const args = process.argv.slice(2);
  const emailType = args.find(arg => arg.startsWith('--type='))?.split('=')[1] as EmailType || 'react-newsletter';
  const outputDir = args.find(arg => arg.startsWith('--output='))?.split('=')[1] || `output/${emailType}`;
  
  try {
    console.log(`🔄 Rendering ${emailType} email...`);
    
    // Create output directory
    ensureDirectoryExists(outputDir);
    console.log(`📁 Created output directory: ${outputDir}`);
    
    // Get the email component
    const EmailComponent = EMAIL_TYPES[emailType];
    if (!EmailComponent) {
      throw new Error(`Unknown email type: ${emailType}`);
    }
    
    // Prepare props for the email component
    const props = {
      ...(emailType === 'react-newsletter' && { newsletterDate: 'this week' })
    };
    
    // Render AMP version
    console.log('📧 Rendering AMP version...');
    const ampHtml = await renderReactEmailToAmpHTML(EmailComponent, props);
    
    // Render normal HTML version directly
    console.log('📧 Creating normal HTML version...');
    const normalHtml = renderEmailToHTML(EmailComponent, props);
    
    // Generate plain text version from normal HTML
    console.log('📧 Creating plain text version...');
    const plainText = htmlToPlainText(normalHtml);
    
    // Write all three formats to files
    const ampFile = path.join(outputDir, 'email.amp.html');
    const normalFile = path.join(outputDir, 'email.html');
    const textFile = path.join(outputDir, 'email.txt');
    
    fs.writeFileSync(ampFile, ampHtml);
    fs.writeFileSync(normalFile, normalHtml);
    fs.writeFileSync(textFile, plainText);
    
    console.log(`✅ Successfully generated all formats in: ${outputDir}`);
    console.log(`📄 AMP HTML: ${ampFile} (${ampHtml.length} characters)`);
    console.log(`📄 Normal HTML: ${normalFile} (${normalHtml.length} characters)`);
    console.log(`📄 Plain Text: ${textFile} (${plainText.length} characters)`);
    console.log(`📧 Email type: ${emailType}`);
    console.log(`\n🔍 Validate your AMP email at:`);
    console.log(`   - https://playground.amp.dev/`);
    console.log(`   - https://amp.gmail.dev/playground/`);
    
  } catch (error) {
    console.error('❌ Error rendering email:', error);
    process.exit(1);
  }
}

/**
 * List available email types
 */
function listEmailTypes() {
  console.log('📧 Available email types:');
  console.log('');
  Object.keys(EMAIL_TYPES).forEach(type => {
    console.log(`  • ${type}`);
  });
  console.log('');
  console.log('Usage examples:');
  console.log('  npm run render -- --type=react-newsletter');
  console.log('  npm run render -- --type=react-newsletter --output=newsletter-emails');
  console.log('');
  console.log('📁 Output structure:');
  console.log('  output/');
  console.log('  ├── email.amp.html  (AMP version)');
  console.log('  ├── email.html      (Normal HTML)');
  console.log('  └── email.txt       (Plain text)');
}

// Export for programmatic use
export { renderEmailToHTML, renderReactEmailToAmpHTML, ReactEmailNewsletter };

// Run if executed directly
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.includes('--list') || args.includes('-l')) {
    listEmailTypes();
  } else {
    main();
  }
} 