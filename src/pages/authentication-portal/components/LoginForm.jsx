import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onLogin, onSwitchToRegister, onForgotPassword, isLoading }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const mockCredentials = [
  { email: 'senior.dev@microfed.com', password: 'DevMaster2024!', role: 'Senior React Developer' },
  { email: 'architect@microfed.com', password: 'ArchDesign2024!', role: 'Technical Architect' },
  { email: 'manager@microfed.com', password: 'TeamLead2024!', role: 'Engineering Manager' },
  { email: 'stakeholder@microfed.com', password: 'Business2024!', role: 'Enterprise Stakeholder' }];


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));


    if (errors?.[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();

    if (!validateForm()) return;


    const validCredential = mockCredentials?.find(
      (cred) => cred?.email === formData?.email && cred?.password === formData?.password
    );

    if (validCredential) {
      onLogin({
        email: formData?.email,
        role: validCredential?.role,
        rememberMe: formData?.rememberMe
      });
    } else {
      setErrors({
        general: 'Invalid credentials. Please use one of the demo accounts'
      });
    }
  };

  const handleSocialLogin = (provider) => {

    const socialUser = {
      email: `demo.${provider}@microfed.com`,
      role: 'Senior React Developer',
      provider: provider
    };
    onLogin(socialUser);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
              <Icon name="Shield" size={24} className="text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-conversion-accent rounded-full animate-pulse-subtle"></div>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Welcome Back</h1>
        <p className="text-text-secondary">Sign in to your MicroFed Enterprise account</p>
      </div>
      {errors?.general &&
      <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="AlertCircle" size={20} className="text-error flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-error mb-1">Authentication Failed</p>
              <pre className="text-xs text-error/80 whitespace-pre-wrap font-mono">{errors?.general}</pre>
            </div>
          </div>
        </div>
      }
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData?.email}
          onChange={handleInputChange}
          error={errors?.email}
          required
          className="mb-4" />
        

        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            required
            className="mb-4" />
          
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-text-secondary hover:text-foreground transition-colors">
            
            <Icon name={showPassword ? "EyeOff" : "Eye"} size={20} />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <Checkbox
            label="Remember me"
            name="rememberMe"
            checked={formData?.rememberMe}
            onChange={handleInputChange} />
          
          
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-sm text-primary hover:text-primary/80 transition-colors">
            
            Forgot password?
          </button>
        </div>

        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          iconName="LogIn"
          iconPosition="right"
          className="bg-primary hover:bg-primary/90">
          
          Sign In
        </Button>
      </form>
      <div className="mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
        </div>

      </div>
      <div className="mt-8 text-center">
        <p className="text-sm text-text-secondary">
          Don't have an account?{' '}
          <button
            onClick={onSwitchToRegister}
            className="text-primary hover:text-primary/80 font-medium transition-colors">
            
            Sign up
          </button>
        </p>
      </div>
    </div>);

};

export default LoginForm;