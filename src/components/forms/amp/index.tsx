import React from 'react';

interface AmpFormProps {
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
}

export const AmpForm: React.FC<AmpFormProps> = ({ 
  action, 
  method = 'POST', 
  children, 
  className,
  submitButtonText = 'Submit',
  successMessage = 'Form submitted successfully!',
  errorMessage = 'There was an error submitting the form. Please try again.',
  submittingMessage = 'Submitting...',
  onSubmitSuccess,
  onSubmitError,
  buttonStyle
}) => {
  const formProps: any = {
    method: method,
    'action-xhr': action,
    className: className,
  };

  // Add AMP event handlers if callbacks are provided
  if (onSubmitSuccess || onSubmitError) {
    const events = [];
    if (onSubmitSuccess) events.push('submit-success:AMP.setState({formSuccess: true})');
    if (onSubmitError) events.push('submit-error:AMP.setState({formError: true})');
    formProps.on = events.join(';');
  }

  return (
    <form {...formProps}>
      {children}
      
      {/* Submit Button */}
      <input 
        type="submit" 
        value={submitButtonText}
        className="amp-form-submit"
        style={{
          backgroundColor: '#007bff',
          color: '#ffffff',
          padding: '14px 28px',
          border: 'none',
          borderRadius: '6px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: 'pointer',
          width: '100%',
          textAlign: 'center',
          fontFamily: 'Arial, sans-serif',
          textDecoration: 'none',
          display: 'block',
          ...buttonStyle
        }}
      />
      
      {/* Submitting State */}
      <div {...{ 'submitting': '' }}>
        {submittingMessage}
      </div>
      
      {/* Success Response */}
      <div {...{ 'submit-success': '' }}>
        {successMessage}
      </div>
      
      {/* Error Response */}
      <div {...{ 'submit-error': '' }}>
        {errorMessage}
      </div>
    </form>
  );
}; 