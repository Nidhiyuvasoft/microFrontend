import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const RegisterForm = ({ onRegister, onSwitchToLogin, isLoading }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    company: '',
    agreeToTerms: false,
    subscribeNewsletter: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const roleOptions = [
  'Senior React Developer',
  'Technical Architect',
  'Engineering Manager',
  'Enterprise Stakeholder',
  'Frontend Developer',
  'Full Stack Developer',
  'DevOps Engineer',
  'Product Manager'];


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

    if (!formData?.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData?.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/?.test(formData?.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, number and special character';
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData?.role) {
      newErrors.role = 'Please select your role';
    }

    if (!formData?.company?.trim()) {
      newErrors.company = 'Company name is required';
    }

    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();

    if (!validateForm()) return;


    onRegister({
      firstName: formData?.firstName,
      lastName: formData?.lastName,
      email: formData?.email,
      role: formData?.role,
      company: formData?.company,
      subscribeNewsletter: formData?.subscribeNewsletter
    });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center">
              <Icon name="UserPlus" size={24} className="text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-conversion-accent rounded-full animate-pulse-subtle"></div>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Create Account</h1>
        <p className="text-text-secondary">Join the MicroFed Enterprise community</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="First Name"
            type="text"
            name="firstName"
            placeholder="John"
            value={formData?.firstName}
            onChange={handleInputChange}
            error={errors?.firstName}
            required />
          
          
          <Input
            label="Last Name"
            type="text"
            name="lastName"
            placeholder="Doe"
            value={formData?.lastName}
            onChange={handleInputChange}
            error={errors?.lastName}
            required />
          
        </div>

        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="john.doe@company.com"
          value={formData?.email}
          onChange={handleInputChange}
          error={errors?.email}
          required />
        

        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Create a strong password"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            required
            description="Must contain uppercase, lowercase, number and special character" />
          
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-text-secondary hover:text-foreground transition-colors">
            
            <Icon name={showPassword ? "EyeOff" : "Eye"} size={20} />
          </button>
        </div>

        <div className="relative">
          <Input
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData?.confirmPassword}
            onChange={handleInputChange}
            error={errors?.confirmPassword}
            required />
          
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-9 text-text-secondary hover:text-foreground transition-colors">
            
            <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Role <span className="text-error">*</span>
            </label>
            <select
              name="role"
              value={formData?.role}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              required>
              
              <option value="">Select your role</option>
              {roleOptions?.map((role) =>
              <option key={role} value={role}>{role}</option>
              )}
            </select>
            {errors?.role &&
            <p className="mt-1 text-sm text-error">{errors?.role}</p>
            }
          </div>

          <Input
            label="Company"
            type="text"
            name="company"
            placeholder="Your company name"
            value={formData?.company}
            onChange={handleInputChange}
            error={errors?.company}
            required />
          
        </div>

        <div className="space-y-3">
          <Checkbox
            label="I agree to the Terms of Service and Privacy Policy"
            name="agreeToTerms"
            checked={formData?.agreeToTerms}
            onChange={handleInputChange}
            error={errors?.agreeToTerms}
            required />
          
        </div>

        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          iconName="UserPlus"
          iconPosition="right"
          className="bg-accent hover:bg-accent/90 mt-6">
          
          Create Account
        </Button>
      </form>
      <div className="mt-8 text-center">
        <p className="text-sm text-text-secondary">
          Already have an account?{' '}
          <button
            onClick={onSwitchToLogin}
            className="text-primary hover:text-primary/80 font-medium transition-colors">
            
            Sign in
          </button>
        </p>
      </div>
    </div>);

};

export default RegisterForm;