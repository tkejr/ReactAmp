import { render } from '@react-email/render';
import React from 'react';

export interface AmpEmailConfig {
  customStyles?: string;
  children: React.ReactNode;
}

export async function renderReactEmailToAmp(config: AmpEmailConfig): Promise<string> {
  const { customStyles = "", children } = config;
  
  try {
    // Render React Email components to HTML
    const emailHtml = await render(children);
    
    // Check if the rendered HTML already has AMP structure
    const hasAmpStructure = emailHtml.includes('⚡4email') || emailHtml.includes('amp4email');
    
    if (hasAmpStructure) {
      // If it already has AMP structure, just return it as is
      return emailHtml;
    }
    
    // Extract the body content from the rendered HTML
    const bodyMatch = emailHtml.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    const bodyContent = bodyMatch ? bodyMatch[1] : emailHtml;
    
    // Extract any styles from the rendered HTML, but exclude amp4email-boilerplate
    const styleMatches = emailHtml.match(/<style[^>]*>([\s\S]*)<\/style>/gi);
    let extractedStyles = '';
    if (styleMatches) {
      extractedStyles = styleMatches
        .filter(style => !style.includes('amp4email-boilerplate'))
        .join('\n');
    }

    // Build the AMP email HTML
    const ampHtml = `<!DOCTYPE html>
<html ⚡4email data-css-strict lang="en">
<head>
  <meta charset="utf-8" />
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <script async custom-element="amp-form" src="https://cdn.ampproject.org/v0/amp-form-0.1.js"></script>
  <style amp4email-boilerplate>body{visibility:hidden}</style>
  ${extractedStyles ? `<style amp-custom>${extractedStyles}</style>` : ''}
  ${customStyles ? `<style amp-custom>${customStyles}</style>` : ''}
</head>
<body>
  ${bodyContent}
</body>
</html>`;

    return ampHtml;
  } catch (error) {
    console.error('Error rendering React Email to AMP:', error);
    throw error;
  }
} 