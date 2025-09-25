import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ModuleCard = ({ module, onToggleStatus, onConfigure, onTest, onViewDetails }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy':
        return 'text-success bg-success/10 border-success/20';
      case 'warning':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'error':
        return 'text-error bg-error/10 border-error/20';
      case 'inactive':
        return 'text-text-secondary bg-muted border-border';
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
      case 'inactive':
        return 'Circle';
      default:
        return 'Circle';
    }
  };

  const formatUptime = (uptime) => {
    return `${uptime}%`;
  };

  return (
    <div className="brand-card p-6 hover:shadow-brand-md transition-all duration-brand">
      {}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Image
              src={module.icon}
              alt={`${module.name} icon`}
              className="w-12 h-12 rounded-lg object-cover" />
            
            <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
            module.status === 'healthy' ? 'bg-success' :
            module.status === 'warning' ? 'bg-warning' :
            module.status === 'error' ? 'bg-error' : 'bg-muted'} ${
            module.status === 'healthy' ? 'module-pulse' : ''}`}></div>
          </div>
          <div className="flex-1">
            <h3 className="font-inter font-semibold text-lg text-foreground">{module.name}</h3>
            <p className="text-sm text-text-secondary">{module.category}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(module.status)}`}>
            <Icon name={getStatusIcon(module.status)} size={12} className="inline mr-1" />
            {module.status}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}>
            
            <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={16} />
          </Button>
        </div>
      </div>
      {}
      <p className="text-sm text-text-secondary mb-4 line-clamp-2">{module.description}</p>
      {}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="text-lg font-bold text-foreground">{module.version}</div>
          <div className="text-xs text-text-secondary">Version</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-foreground">{formatUptime(module.uptime)}</div>
          <div className="text-xs text-text-secondary">Uptime</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-foreground">{module.loadTime}ms</div>
          <div className="text-xs text-text-secondary">Load Time</div>
        </div>
      </div>
      {}
      {isExpanded &&
      <div className="border-t border-border pt-4 space-y-4">
          {}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-sm text-foreground mb-2">Technical Info</h4>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Bundle Size:</span>
                  <span className="font-mono text-foreground">{module.bundleSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Dependencies:</span>
                  <span className="font-mono text-foreground">{module.dependencies}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Last Updated:</span>
                  <span className="font-mono text-foreground">{module.lastUpdated}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-sm text-foreground mb-2">Performance</h4>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Success Rate:</span>
                  <span className="font-mono text-success">{module.successRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Error Rate:</span>
                  <span className="font-mono text-error">{module.errorRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Memory Usage:</span>
                  <span className="font-mono text-foreground">{module.memoryUsage}</span>
                </div>
              </div>
            </div>
          </div>

          {}
          <div>
            <h4 className="font-medium text-sm text-foreground mb-2">Required Permissions</h4>
            <div className="flex flex-wrap gap-1">
              {module.permissions?.map((permission, index) =>
            <span
              key={index}
              className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-md">
              
                  {permission}
                </span>
            )}
            </div>
          </div>

          {}
          <div>
            <h4 className="font-medium text-sm text-foreground mb-2">API Endpoints</h4>
            <div className="space-y-1">
              {module.apiEndpoints?.slice(0, 3)?.map((endpoint, index) =>
            <div key={index} className="flex items-center space-x-2 text-xs">
                  <span className={`px-1.5 py-0.5 rounded text-white font-mono ${
              endpoint?.method === 'GET' ? 'bg-success' :
              endpoint?.method === 'POST' ? 'bg-primary' :
              endpoint?.method === 'PUT' ? 'bg-warning' : 'bg-error'}`
              }>
                    {endpoint?.method}
                  </span>
                  <span className="font-mono text-text-secondary">{endpoint?.path}</span>
                </div>
            )}
              {module.apiEndpoints?.length > 3 &&
            <div className="text-xs text-text-secondary">
                  +{module.apiEndpoints?.length - 3} more endpoints
                </div>
            }
            </div>
          </div>
        </div>
      }
      {}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <Button
            variant={module.status === 'inactive' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onToggleStatus(module.id)}
            iconName={module.status === 'inactive' ? 'Play' : 'Pause'}
            iconPosition="left">
            
            {module.status === 'inactive' ? 'Enable' : 'Disable'}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onConfigure(module.id)}
            iconName="Settings"
            iconPosition="left">
            
            Configure
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onTest(module.id)}
            iconName="TestTube"
            iconPosition="left">
            
            Test
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(module.id)}
            iconName="ExternalLink"
            iconPosition="left">
            
            Details
          </Button>
        </div>
      </div>
    </div>);

};

export default ModuleCard;