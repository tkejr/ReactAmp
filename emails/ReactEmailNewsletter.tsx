import React from 'react';
import {
  Container,
  Heading,
  Link,
  Section,
  Text,
  Form,
} from '../src/components'; 

interface ReactEmailNewsletterProps {
  // Removed userName, companyName, and newsletterDate props
}

export const ReactEmailNewsletter: React.FC<ReactEmailNewsletterProps> = () => {
  return (
    <Container style={container}>
      <Section style={headerSection}>
        <Heading style={h1}>Weekly Newsletter</Heading>
        <Text style={dateText}>This Week</Text>
      </Section>
      
      <Section style={contentSection}>
        <Text style={greeting}>
          Hello there!
        </Text>
        
        <Text style={text}>
          Here's what's new this week:
        </Text>
        
        <Section style={featureSection}>
          <Heading style={h2}>🚀 New Features</Heading>
          <Text style={text}>
            We've launched several exciting new features to improve your experience:
          </Text>
          <Text style={listItem}>• Enhanced dashboard with real-time analytics</Text>
          <Text style={listItem}>• Mobile app now available on iOS and Android</Text>
          <Text style={listItem}>• Improved collaboration tools for teams</Text>
        </Section>
        
        <Section style={featureSection}>
          <Heading style={h2}>📊 Community Highlights</Heading>
          <Text style={text}>
            Our community has been busy! Here are some highlights:
          </Text>
          <Text style={listItem}>• 1,000+ new users joined this week</Text>
          <Text style={listItem}>• 50+ new integrations added</Text>
          <Text style={listItem}>• Community forum now has 10,000+ members</Text>
        </Section>
        
        <Section style={featureSection}>
          <Heading style={h2}>📅 Upcoming Events</Heading>
          <Text style={text}>
            Don't miss these upcoming events:
          </Text>
          <Text style={listItem}>• Webinar: "Advanced Tips & Tricks" - Next Tuesday</Text>
          <Text style={listItem}>• Community Meetup - Virtual event this Friday</Text>
          <Text style={listItem}>• Product Q&A Session - Next month</Text>
        </Section>
      </Section>
      
      {/* Newsletter Subscription Form */}
      <Section style={formSection}>
        <Heading style={h2}>📧 Stay Updated</Heading>
        <Text style={text}>
          Subscribe to our newsletter to get the latest updates delivered to your inbox.
        </Text>
        
        <Form
          action="https://0e5e-2605-a601-aa50-e00-adf7-d3a-8dac-6e2e.ngrok-free.app/data"
          method="POST"
          submitButtonText="Subscribe"
          successMessage="Thank you for subscribing! You'll receive our next newsletter."
          errorMessage="There was an error subscribing. Please try again."
          submittingMessage="Subscribing..."
          className="newsletter-form"
          buttonStyle={button}
        >
          <input 
            type="email" 
            name="email" 
            placeholder="Enter your email address"
            required
            style={inputStyle}
          />
          <input 
            type="tel" 
            name="phone" 
            placeholder="Enter your phone number (optional)"
            style={inputStyle}
          />
        </Form>
      </Section>
      
      {/* Feedback Form */}
      <Section style={formSection}>
        <Heading style={h2}>💬 Share Your Feedback</Heading>
        <Text style={text}>
          We'd love to hear your thoughts about this newsletter and suggestions for future content.
        </Text>
        
        <Form
          action="https://0e5e-2605-a601-aa50-e00-adf7-d3a-8dac-6e2e.ngrok-free.app/data"
          method="POST"
          submitButtonText="Send Feedback"
          successMessage="Thank you for your feedback! We appreciate your input."
          errorMessage="There was an error sending your feedback. Please try again."
          submittingMessage="Sending feedback..."
          className="feedback-form"
          buttonStyle={button}
        >
          <input 
            type="text" 
            name="name" 
            placeholder="Your name (optional)"
            style={inputStyle}
          />
          <textarea 
            name="feedback" 
            placeholder="Share your feedback..."
            required
            style={textareaStyle}
          />
        </Form>
      </Section>
      
      <Section style={ctaSection}>
        <Link href="https://example.com/newsletter" style={button}>
          Read Full Newsletter
        </Link>
      </Section>
      
      <Text style={footer}>
        Thanks for being part of our community!<br />
        The Team
      </Text>
    </Container>
  );
};

const main = {
  backgroundColor: '#f8f9fa',
  fontFamily: 'Arial, sans-serif',
  margin: 0,
  padding: 0,
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '600px',
};

const headerSection = {
  backgroundColor: '#007bff',
  padding: '30px 20px',
  textAlign: 'center' as const,
};

const h1 = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '0 0 10px 0',
  padding: '0',
};

const dateText = {
  color: '#e3f2fd',
  fontSize: '16px',
  margin: '0',
};

const contentSection = {
  backgroundColor: '#ffffff',
  padding: '30px 20px',
};

const greeting = {
  color: '#333',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 20px 0',
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 16px 0',
};

const featureSection = {
  margin: '30px 0',
};

const h2 = {
  color: '#007bff',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '0 0 12px 0',
};

const listItem = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '8px 0 8px 20px',
};

const ctaSection = {
  backgroundColor: '#ffffff',
  padding: '20px',
  textAlign: 'center' as const,
};

const button = {
  backgroundColor: '#007bff',
  color: '#ffffff',
  padding: '14px 28px',
  textDecoration: 'none',
  borderRadius: '6px',
  fontSize: '16px',
  fontWeight: 'bold',
  display: 'inline-block',
};

const footer = {
  color: '#666',
  fontSize: '14px',
  lineHeight: '1.5',
  textAlign: 'center' as const,
  margin: '20px 0 0 0',
};

const formSection = {
  backgroundColor: '#ffffff',
  padding: '30px 20px',
  margin: '20px 0',
};

const inputStyle = {
  width: '100%',
  padding: '12px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  fontSize: '16px',
  marginBottom: '10px',
  boxSizing: 'border-box' as const,
};

const textareaStyle = {
  width: '100%',
  padding: '12px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  fontSize: '16px',
  marginBottom: '10px',
  minHeight: '100px',
  resize: 'vertical' as const,
  boxSizing: 'border-box' as const,
  fontFamily: 'Arial, sans-serif',
}; 