import React from 'react';
import {
  Container,
  Heading,
  Link,
  Section,
  Text,
  Button,
  Hr,
  Html,
  Img,
  Preview,
  Body,
  Head,
  Tailwind,
  Font,
  Row,
  Column,
} from '@react-email/components';

// Re-export all React Email components
export {
  Container,
  Heading,
  Link,
  Section,
  Text,
  Button,
  Hr,
  Html,
  Img,
  Preview,
  Body,
  Head,
  Tailwind,
  Font,
  Row,
  Column,
};

// Custom wrapper components with Email prefix
export const EmailContainer: React.FC<React.ComponentProps<typeof Container>> = (props) => {
  return <Container {...props} />;
};

export const EmailSection: React.FC<React.ComponentProps<typeof Section>> = (props) => {
  return <Section {...props} />;
};

export const EmailText: React.FC<React.ComponentProps<typeof Text>> = (props) => {
  return <Text {...props} />;
};

export const EmailHeading: React.FC<React.ComponentProps<typeof Heading>> = (props) => {
  return <Heading {...props} />;
};

export const EmailLink: React.FC<React.ComponentProps<typeof Link>> = (props) => {
  return <Link {...props} />;
};

export const EmailButton: React.FC<React.ComponentProps<typeof Button>> = (props) => {
  return <Button {...props} />;
}; 