import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SystemHealthIndicator = ({ onHealthCheck }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const healthMetrics = [
  {
    category: 'Infrastructure',
    items: [
    { name: 'Load Balancer', status: 'healthy', uptime: '99.99%', responseTime: '12ms' },
    { name: 'CDN Network', status: 'healthy', uptime: '99.95%', responseTime: '8ms' },
    { name: 'Database Cluster', status: 'warning', uptime: '99.87%', responseTime: '45ms' },
    { name: 'Cache Layer', status: 'healthy', uptime: '99.99%', responseTime: '3ms' }]

  },
  {
    category: 'Micro-Frontends',
    items: [
    { name: 'Authentication Portal', status: 'healthy', uptime: '99.98%', responseTime: '156ms' },
    { name: 'Booking Interface', status: 'healthy', uptime: '99.92%', responseTime: '234ms' },
    { name: 'Analytics Dashboard', status: 'warning', uptime: '99.85%', responseTime: '312ms' },
    { name: 'Module Registry', status: 'healthy', uptime: '99.97%', responseTime: '89ms' },
    { name: 'Configuration Center', status: 'healthy', uptime: '99.99%', responseTime: '67ms' }]

  },
  {
    category: 'External Services',
    items: [
    { name: 'Payment Gateway', status: 'healthy', uptime: '99.94%', responseTime: '187ms' },
    { name: 'Email Service', status: 'healthy', uptime: '99.89%', responseTime: '423ms' },
    { name: 'SMS Provider', status: 'error', uptime: '98.76%', responseTime: '1.2s' },
    { name: 'File Storage', status: 'healthy', uptime: '99.96%', responseTime: '78ms' }]

  }];


  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy':
        return 'text-success bg-success/10 border-success/20';
      case 'warning':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'error':
        return 'text-error bg-error/10 border-error/20';
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
      default:
        return 'Circle';
    }
  };

  const overallHealth = () => {
    const allItems = healthMetrics?.flatMap((category) => category?.items);
    const healthyCount = allItems?.filter((item) => item?.status === 'healthy')?.length;
    const warningCount = allItems?.filter((item) => item?.status === 'warning')?.length;
    const errorCount = allItems?.filter((item) => item?.status === 'error')?.length;

    if (errorCount > 0) return { status: 'error', percentage: Math.round(healthyCount / allItems?.length * 100) };
    if (warningCount > 0) return { status: 'warning', percentage: Math.round(healthyCount / allItems?.length * 100) };
    return { status: 'healthy', percentage: 100 };
  };

  const health = overallHealth();

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-success to-accent rounded-lg flex items-center justify-center">
            <Icon name="Heart" size={16} className="text-white" />
          </div>
          <div>
            <h3 className="font-inter font-semibold text-foreground">System Health Monitor</h3>
            <p className="text-sm text-text-secondary">
              Last updated: {currentTime?.toLocaleTimeString()}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${getStatusColor(health?.status)}`}>
            <Icon name={getStatusIcon(health?.status)} size={14} />
            <span className="text-sm font-medium">{health?.percentage}% Healthy</span>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            iconName="RefreshCw"
            iconPosition="left"
            onClick={onHealthCheck}>
            
            Refresh
          </Button>
        </div>
      </div>
      <div className="space-y-6">
        {healthMetrics?.map((category) =>
        <div key={category?.category}>
            <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
              <Icon name="Layers" size={16} className="text-text-secondary" />
              <span>{category?.category}</span>
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {category?.items?.map((item, index) =>
            <div key={index} className="p-4 bg-muted rounded-lg border border-border hover:border-primary/30 transition-all duration-brand">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Icon name={getStatusIcon(item?.status)} size={16} className={getStatusColor(item?.status)?.split(' ')?.[0]} />
                      <span className="font-medium text-foreground">{item?.name}</span>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item?.status)}`}>
                      {item?.status}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-text-secondary">Uptime</div>
                      <div className="font-mono text-foreground">{item?.uptime}</div>
                    </div>
                    <div>
                      <div className="text-text-secondary">Response</div>
                      <div className="font-mono text-foreground">{item?.responseTime}</div>
                    </div>
                  </div>
                </div>
            )}
            </div>
          </div>
        )}
      </div>
      {}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-success/10 rounded-lg border border-success/20">
            <div className="text-2xl font-bold text-success">
              {healthMetrics?.flatMap((c) => c?.items)?.filter((i) => i?.status === 'healthy')?.length}
            </div>
            <div className="text-sm text-text-secondary">Healthy Services</div>
          </div>
          
          <div className="text-center p-4 bg-warning/10 rounded-lg border border-warning/20">
            <div className="text-2xl font-bold text-warning">
              {healthMetrics?.flatMap((c) => c?.items)?.filter((i) => i?.status === 'warning')?.length}
            </div>
            <div className="text-sm text-text-secondary">Warning Services</div>
          </div>
          
          <div className="text-center p-4 bg-error/10 rounded-lg border border-error/20">
            <div className="text-2xl font-bold text-error">
              {healthMetrics?.flatMap((c) => c?.items)?.filter((i) => i?.status === 'error')?.length}
            </div>
            <div className="text-sm text-text-secondary">Critical Services</div>
          </div>
        </div>
      </div>
    </div>);

};

export default SystemHealthIndicator;