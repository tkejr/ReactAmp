import React from 'react';

interface HtmlFormProps {
  action: string;
  method?: 'GET' | 'POST';
  children: React.ReactNode;
  className?: string;
  submitButtonText?: string;
  buttonStyle?: React.CSSProperties;
}

export const HtmlForm: React.FC<HtmlFormProps> = ({ 
  action, 
  method = 'POST', 
  children, 
  className,
  submitButtonText = 'Submit',
  buttonStyle
}) => {
  const formProps: any = {
    method: method,
    action: action,
    className: className,
  };

  return (
    <form {...formProps}>
      {children}

      hi this is html form
      
      {/* Submit Button */}
      <input 
        type="submit" 
        value={submitButtonText}
        className="form-submit"
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
    </form>
  );
}; 