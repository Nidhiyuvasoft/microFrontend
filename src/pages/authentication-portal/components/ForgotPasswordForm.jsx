import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const ForgotPasswordForm = ({ onBackToLogin, onResetRequest, isLoading }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e?.preventDefault();

    if (!email) {
      setError('Email is required');
      return;
    }

    if (!/\S+@\S+\.\S+/?.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    setIsSubmitted(true);
    onResetRequest(email);
  };

  const handleInputChange = (e) => {
    setEmail(e?.target?.value);
    if (error) setError('');
  };

  if (isSubmitted) {
    return (
      <div className="w-full max-w-md mx-auto text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
            <Icon name="Mail" size={32} className="text-success" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-foreground mb-4">Check Your Email</h1>
        <p className="text-text-secondary mb-6">
          We've sent a password reset link to <strong>{email}</strong>
        </p>
        
        <div className="space-y-4">
          <p className="text-sm text-text-secondary">
            Didn't receive the email? Check your spam folder or try again.
          </p>
          
          <Button
            variant="outline"
            fullWidth
            onClick={() => setIsSubmitted(false)}
            iconName="RotateCcw"
            iconPosition="left">
            
            Try Different Email
          </Button>
          
          <Button
            variant="ghost"
            fullWidth
            onClick={onBackToLogin}
            iconName="ArrowLeft"
            iconPosition="left">
            
            Back to Sign In
          </Button>
        </div>
      </div>);

  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-warning to-primary rounded-xl flex items-center justify-center">
              <Icon name="KeyRound" size={24} className="text-white" />
            </div>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Forgot Password?</h1>
        <p className="text-text-secondary">
          No worries! Enter your email and we'll send you reset instructions.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={handleInputChange}
          error={error}
          required
          description="We'll send reset instructions to this email" />
        

        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          iconName="Send"
          iconPosition="right"
          className="bg-warning hover:bg-warning/90">
          
          Send Reset Instructions
        </Button>
      </form>

      <div className="mt-8 text-center">
        <button
          onClick={onBackToLogin}
          className="inline-flex items-center space-x-2 text-sm text-text-secondary hover:text-foreground transition-colors">
          
          <Icon name="ArrowLeft" size={16} />
          <span>Back to Sign In</span>
        </button>
      </div>
    </div>);

};

export default ForgotPasswordForm;