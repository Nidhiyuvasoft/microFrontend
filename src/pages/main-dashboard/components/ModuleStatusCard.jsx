import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ModuleStatusCard = ({ module, onViewDetails, onQuickAction }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy':
        return 'text-success bg-success/10 border-success/20';
      case 'warning':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'error':
        return 'text-error bg-error/10 border-error/20';
      case 'loading':
        return 'text-primary bg-primary/10 border-primary/20';
      default:
        return 'text-text-secondary bg-muted border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'error':
        return 'XCircle';
      case 'loading':
        return 'Loader';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-brand-md transition-all duration-brand">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <Icon name={module.icon} size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-inter font-semibold text-foreground">{module.name}</h3>
            <p className="text-sm text-text-secondary">{module.description}</p>
          </div>
        </div>
        
        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${getStatusColor(module.status)}`}>
          <Icon
            name={getStatusIcon(module.status)}
            size={14}
            className={module.status === 'loading' ? 'animate-spin' : ''} />
          
          <span className="text-xs font-medium capitalize">{module.status}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">{module.version}</div>
          <div className="text-xs text-text-secondary">Version</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">{module.uptime}</div>
          <div className="text-xs text-text-secondary">Uptime</div>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-text-secondary">Performance</span>
          <span className="font-mono text-foreground">{module.performance}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-brand ${
            module.performance >= 90 ? 'bg-success' :
            module.performance >= 70 ? 'bg-warning' : 'bg-error'}`
            }
            style={{ width: `${module.performance}%` }}>
          </div>
        </div>
      </div>
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          iconName="Eye"
          iconPosition="left"
          onClick={() => onViewDetails(module)}
          className="flex-1">
          
          Details
        </Button>
        <Button
          variant="default"
          size="sm"
          iconName={module.quickAction?.icon}
          iconPosition="left"
          onClick={() => onQuickAction(module)}
          className="flex-1">
          
          {module.quickAction?.label}
        </Button>
      </div>
    </div>);

};

export default ModuleStatusCard;