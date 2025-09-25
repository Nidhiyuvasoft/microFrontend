import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EnvironmentSelector = ({
  currentEnvironment,
  onEnvironmentChange,
  environments,
  className = ''
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const defaultEnvironments = [
  {
    id: 'development',
    name: 'Development',
    description: 'Local development environment',
    status: 'active',
    url: 'http://localhost:3000',
    color: 'bg-blue-500'
  },
  {
    id: 'staging',
    name: 'Staging',
    description: 'Pre-production testing environment',
    status: 'active',
    url: 'https://staging.microfed.com',
    color: 'bg-yellow-500'
  },
  {
    id: 'production',
    name: 'Production',
    description: 'Live production environment',
    status: 'active',
    url: 'https://microfed.com',
    color: 'bg-green-500'
  }];


  const envList = environments || defaultEnvironments;
  const current = envList?.find((env) => env.id === currentEnvironment) || envList?.[0];

  const handleEnvironmentSelect = (environment) => {
    onEnvironmentChange(environment);
    setIsDropdownOpen(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return 'CheckCircle';
      case 'maintenance':
        return 'AlertTriangle';
      case 'error':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success';
      case 'maintenance':
        return 'text-warning';
      case 'error':
        return 'text-error';
      default:
        return 'text-text-secondary';
    }
  };

  return (
    <div className={`relative ${className}`}>
      {}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-3 w-full p-3 bg-card border border-border rounded-lg hover:bg-muted/50 transition-all duration-brand">
        
        <div className={`w-3 h-3 rounded-full ${current?.color}`}></div>
        
        <div className="flex-1 text-left">
          <div className="flex items-center space-x-2">
            <span className="font-medium text-foreground">{current?.name}</span>
            <Icon
              name={getStatusIcon(current?.status)}
              size={14}
              className={getStatusColor(current?.status)} />
            
          </div>
          <div className="text-xs text-text-secondary">{current?.description}</div>
        </div>
        
        <Icon
          name={isDropdownOpen ? 'ChevronUp' : 'ChevronDown'}
          size={16}
          className="text-text-secondary" />
        
      </button>
      {}
      {isDropdownOpen &&
      <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-brand-lg z-50">
          <div className="p-2">
            {envList?.map((env) =>
          <button
            key={env.id}
            onClick={() => handleEnvironmentSelect(env)}
            className={`flex items-center space-x-3 w-full p-3 rounded-md hover:bg-muted transition-all duration-brand ${
            env.id === currentEnvironment ? 'bg-primary/10 text-primary' : 'text-foreground'}`
            }>
            
                <div className={`w-3 h-3 rounded-full ${env.color}`}></div>
                
                <div className="flex-1 text-left">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{env.name}</span>
                    <Icon
                  name={getStatusIcon(env.status)}
                  size={14}
                  className={getStatusColor(env.status)} />
                
                  </div>
                  <div className="text-xs opacity-75">{env.description}</div>
                  <div className="text-xs font-mono opacity-60 mt-1">{env.url}</div>
                </div>
                
                {env.id === currentEnvironment &&
            <Icon name="Check" size={16} className="text-primary" />
            }
              </button>
          )}
          </div>
          
          {}
          <div className="border-t border-border p-2">
            <Button
            variant="ghost"
            size="sm"
            fullWidth
            iconName="Plus"
            iconPosition="left"
            className="justify-start text-text-secondary">
            
              Add Environment
            </Button>
          </div>
        </div>
      }
      {}
      {isDropdownOpen &&
      <div
        className="fixed inset-0 z-40"
        onClick={() => setIsDropdownOpen(false)} />

      }
    </div>);

};

export default EnvironmentSelector;