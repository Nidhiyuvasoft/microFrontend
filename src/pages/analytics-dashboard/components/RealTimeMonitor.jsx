import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RealTimeMonitor = ({ onRefresh }) => {
  const [isLive, setIsLive] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [alerts, setAlerts] = useState([]);

  const realTimeMetrics = [
  {
    id: 'active_users',
    label: 'Active Users',
    value: 1247,
    change: '+12',
    changeType: 'positive',
    icon: 'Users',
    status: 'healthy'
  },
  {
    id: 'requests_per_second',
    label: 'Requests/sec',
    value: 342,
    change: '-8',
    changeType: 'negative',
    icon: 'Zap',
    status: 'warning'
  },
  {
    id: 'response_time',
    label: 'Avg Response Time',
    value: '127ms',
    change: '+15ms',
    changeType: 'negative',
    icon: 'Clock',
    status: 'warning'
  },
  {
    id: 'error_rate',
    label: 'Error Rate',
    value: '0.12%',
    change: '-0.03%',
    changeType: 'positive',
    icon: 'AlertTriangle',
    status: 'healthy'
  },
  {
    id: 'cpu_usage',
    label: 'CPU Usage',
    value: '68%',
    change: '+5%',
    changeType: 'neutral',
    icon: 'Cpu',
    status: 'healthy'
  },
  {
    id: 'memory_usage',
    label: 'Memory Usage',
    value: '4.2GB',
    change: '+0.3GB',
    changeType: 'neutral',
    icon: 'HardDrive',
    status: 'healthy'
  }];


  const systemAlerts = [
  {
    id: 1,
    type: 'warning',
    message: 'High response time detected in booking module',
    timestamp: new Date(Date.now() - 300000),
    module: 'booking-interface'
  },
  {
    id: 2,
    type: 'info',
    message: 'New module deployment completed successfully',
    timestamp: new Date(Date.now() - 600000),
    module: 'analytics-dashboard'
  },
  {
    id: 3,
    type: 'error',
    message: 'Authentication service connection timeout',
    timestamp: new Date(Date.now() - 900000),
    module: 'authentication-portal'
  }];


  useEffect(() => {
    setAlerts(systemAlerts);

    if (isLive) {
      const interval = setInterval(() => {
        setLastUpdate(new Date());
        if (onRefresh) {
          onRefresh();
        }
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isLive, onRefresh]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'error':
        return 'text-error';
      default:
        return 'text-text-secondary';
    }
  };

  const getChangeColor = (type) => {
    switch (type) {
      case 'positive':
        return 'text-success';
      case 'negative':
        return 'text-error';
      case 'neutral':
        return 'text-text-secondary';
      default:
        return 'text-text-secondary';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'error':
        return 'border-error bg-error/5 text-error';
      case 'warning':
        return 'border-warning bg-warning/5 text-warning';
      case 'info':
        return 'border-primary bg-primary/5 text-primary';
      default:
        return 'border-border bg-muted text-text-secondary';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'error':
        return 'XCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'info':
        return 'Info';
      default:
        return 'Bell';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div className="space-y-6">
      {}
      <div className="bg-card border border-border rounded-lg shadow-brand-sm">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Icon name="Activity" size={20} className="text-accent" />
              </div>
              <div>
                <h3 className="font-inter font-semibold text-lg text-foreground">Real-Time Monitor</h3>
                <p className="text-sm text-text-secondary">
                  Live system metrics and performance data
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-success animate-pulse' : 'bg-error'}`}></div>
                <span className="text-sm text-text-secondary">
                  {isLive ? 'Live' : 'Paused'}
                </span>
              </div>

              <Button
                variant="outline"
                size="sm"
                iconName={isLive ? 'Pause' : 'Play'}
                iconPosition="left"
                onClick={() => setIsLive(!isLive)}>
                
                {isLive ? 'Pause' : 'Resume'}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                iconName="RefreshCw"
                iconPosition="left"
                onClick={() => {
                  setLastUpdate(new Date());
                  if (onRefresh) onRefresh();
                }}>
                
                Refresh
              </Button>
            </div>
          </div>

          <div className="mt-4 text-xs text-text-secondary">
            Last updated: {lastUpdate?.toLocaleTimeString()}
          </div>
        </div>

        {}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {realTimeMetrics?.map((metric) =>
            <div
              key={metric?.id}
              className="bg-background border border-border rounded-lg p-4 hover:shadow-brand-sm transition-all duration-brand">
              
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Icon name={metric?.icon} size={16} className={getStatusColor(metric?.status)} />
                    <span className="text-sm font-medium text-foreground">{metric?.label}</span>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(metric?.status)?.replace('text-', 'bg-')}`}></div>
                </div>

                <div className="flex items-end justify-between">
                  <div className="text-2xl font-bold text-foreground">{metric?.value}</div>
                  <div className={`text-sm font-medium ${getChangeColor(metric?.changeType)}`}>
                    {metric?.change}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {}
      <div className="bg-card border border-border rounded-lg shadow-brand-sm">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <Icon name="Bell" size={20} className="text-warning" />
              </div>
              <h3 className="font-inter font-semibold text-lg text-foreground">System Alerts</h3>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-text-secondary">{alerts?.length} active alerts</span>
              <Button
                variant="ghost"
                size="sm"
                iconName="Settings"
                iconPosition="left">
                
                Configure
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {alerts?.length > 0 ?
          <div className="space-y-3">
              {alerts?.map((alert) =>
            <div
              key={alert?.id}
              className={`flex items-start space-x-3 p-4 rounded-lg border ${getAlertColor(alert?.type)}`}>
              
                  <Icon name={getAlertIcon(alert?.type)} size={16} className="mt-0.5" />
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{alert?.message}</span>
                      <span className="text-xs opacity-75">{formatTimeAgo(alert?.timestamp)}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-xs opacity-75">
                      <Icon name="Package" size={12} />
                      <span>{alert?.module}</span>
                    </div>
                  </div>

                  <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={() => setAlerts((prev) => prev?.filter((a) => a?.id !== alert?.id))}
                className="opacity-50 hover:opacity-100" />
              
                </div>
            )}
            </div> :

          <div className="text-center py-8">
              <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-3" />
              <p className="text-text-secondary">No active alerts. All systems are running smoothly.</p>
            </div>
          }
        </div>
      </div>
      {}
      <div className="bg-card border border-border rounded-lg shadow-brand-sm">
        <div className="p-6 border-b border-border">
          <h3 className="font-inter font-semibold text-lg text-foreground">Performance Indicators</h3>
          <p className="text-sm text-text-secondary mt-1">
            Key performance metrics across all micro-frontend modules
          </p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name="Zap" size={24} className="text-success" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">98.7%</div>
              <div className="text-sm text-text-secondary">System Uptime</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name="TrendingUp" size={24} className="text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">156ms</div>
              <div className="text-sm text-text-secondary">Avg Load Time</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name="Shield" size={24} className="text-accent" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">99.98%</div>
              <div className="text-sm text-text-secondary">Security Score</div>
            </div>
          </div>
        </div>
      </div>
    </div>);

};

export default RealTimeMonitor;