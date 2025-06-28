import React from 'react';
import { AmpForm } from './amp';
import { HtmlForm } from './html';

interface FormProps {
  action: string;
  method?: 'GET' | 'POST';
  children: React.ReactNode;
  className?: string;
  submitButtonText?: string;
  successMessage?: string;
  errorMessage?: string;
  submittingMessage?: string;
  onSubmitSuccess?: (response: any) => void;
  onSubmitError?: (error: any) => void;
  buttonStyle?: React.CSSProperties;
  _renderMode?: 'amp' | 'html'; // Internal prop for render mode
}

// Main Form component that chooses between AMP and HTML based on render mode
export const Form: React.FC<FormProps> = (props) => {
  const { _renderMode = 'amp', ...restProps } = props;  
  if (_renderMode === 'html') {
    return <HtmlForm {...restProps} />;
  }
  
  return <AmpForm {...restProps} />;
}; 