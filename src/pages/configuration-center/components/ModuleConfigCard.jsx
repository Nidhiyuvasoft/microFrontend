import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ModuleConfigCard = ({
  module,
  onEdit,
  onDeploy,
  onRollback,
  onDelete,
  isDeploying = false
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success bg-success/10 border-success/20';
      case 'pending':
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
      case 'active':
        return 'CheckCircle';
      case 'pending':
        return 'Clock';
      case 'error':
        return 'XCircle';
      case 'inactive':
        return 'Pause';
      default:
        return 'Circle';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-brand-md transition-all duration-brand">
      {}
      <div className="p-4 border-b border-border">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Package" size={20} className="text-primary" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-foreground">{module.name}</h3>
                <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(module.status)}`}>
                  <div className="flex items-center space-x-1">
                    <Icon name={getStatusIcon(module.status)} size={12} />
                    <span className="capitalize">{module.status}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-text-secondary mt-1">{module.description}</p>
              
              <div className="flex items-center space-x-4 mt-2 text-xs text-text-secondary">
                <span>Version: {module.version}</span>
                <span>Environment: {module.environment}</span>
                <span>Updated: {formatDate(module.lastUpdated)}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
              onClick={() => setIsExpanded(!isExpanded)} />
            
            
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                iconName="Edit"
                onClick={() => onEdit(module)} />
              
              
              <Button
                variant="ghost"
                size="sm"
                iconName="RotateCcw"
                onClick={() => onRollback(module)}
                disabled={!module.canRollback} />
              
              
              <Button
                variant="ghost"
                size="sm"
                iconName="Trash2"
                onClick={() => onDelete(module)}
                className="text-error hover:text-error" />
              
            </div>
          </div>
        </div>
      </div>
      {}
      {isExpanded &&
      <div className="p-4 bg-muted/30 space-y-4">
          {}
          <div>
            <h4 className="font-medium text-foreground mb-2">Configuration</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Remote URL:</span>
                <span className="font-mono text-foreground truncate ml-2">{module.remoteUrl}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Port:</span>
                <span className="font-mono text-foreground">{module.port}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Build:</span>
                <span className="font-mono text-foreground">{module.buildHash}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Bundle Size:</span>
                <span className="font-mono text-foreground">{module.bundleSize}</span>
              </div>
            </div>
          </div>

          {}
          <div>
            <h4 className="font-medium text-foreground mb-2">Health Metrics</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-lg font-semibold text-success">{module.metrics?.uptime}</div>
                <div className="text-xs text-text-secondary">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-primary">{module.metrics?.loadTime}ms</div>
                <div className="text-xs text-text-secondary">Load Time</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-accent">{module.metrics?.errorRate}%</div>
                <div className="text-xs text-text-secondary">Error Rate</div>
              </div>
            </div>
          </div>

          {}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="flex items-center space-x-2 text-xs text-text-secondary">
              <Icon name="History" size={14} />
              <span>{module.deploymentHistory?.length} deployments</span>
            </div>
            
            <Button
            variant="default"
            size="sm"
            iconName="Rocket"
            onClick={() => onDeploy(module)}
            loading={isDeploying}
            disabled={module.status === 'pending'}>
            
              Deploy Changes
            </Button>
          </div>
        </div>
      }
    </div>);

};

export default ModuleConfigCard;