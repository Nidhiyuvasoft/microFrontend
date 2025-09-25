import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsPanel = ({ onActionClick }) => {
  const navigate = useNavigate();

  const quickActions = [
  {
    id: 'deploy-module',
    title: 'Deploy Module',
    description: 'Deploy new micro-frontend module',
    icon: 'Rocket',
    color: 'bg-primary',
    action: () => navigate('/module-registry')
  },
  {
    id: 'view-analytics',
    title: 'View Analytics',
    description: 'Check system performance metrics',
    icon: 'BarChart3',
    color: 'bg-accent',
    action: () => navigate('/analytics-dashboard')
  },
  {
    id: 'manage-auth',
    title: 'Manage Auth',
    description: 'User authentication & permissions',
    icon: 'Shield',
    color: 'bg-warning',
    action: () => navigate('/authentication-portal')
  },
  {
    id: 'system-config',
    title: 'System Config',
    description: 'Configure system settings',
    icon: 'Settings',
    color: 'bg-secondary',
    action: () => navigate('/configuration-center')
  },
  {
    id: 'booking-system',
    title: 'Booking System',
    description: 'Manage facility bookings',
    icon: 'Calendar',
    color: 'bg-success',
    action: () => navigate('/booking-interface')
  },
  {
    id: 'error-handling',
    title: 'Error Center',
    description: 'Monitor system errors',
    icon: 'AlertTriangle',
    color: 'bg-error',
    action: () => onActionClick('error-center')
  }];


  const systemStats = [
  { label: 'Active Modules', value: '12/15', status: 'healthy' },
  { label: 'CPU Usage', value: '34%', status: 'healthy' },
  { label: 'Memory', value: '68%', status: 'warning' },
  { label: 'Network', value: '2.1MB/s', status: 'healthy' }];


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

  return (
    <div className="space-y-6">
      {}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-conversion-accent to-cta rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={16} className="text-white" />
            </div>
            <div>
              <h3 className="font-inter font-semibold text-foreground">Quick Actions</h3>
              <p className="text-sm text-text-secondary">Common system operations</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions?.map((action) =>
          <button
            key={action?.id}
            onClick={action?.action}
            className="group p-4 bg-muted hover:bg-muted/80 rounded-lg border border-border hover:border-primary/30 transition-all duration-brand text-left">
            
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 ${action?.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-brand`}>
                  <Icon name={action?.icon} size={20} className="text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground group-hover:text-primary transition-colors duration-brand">
                    {action?.title}
                  </h4>
                  <p className="text-sm text-text-secondary mt-1">{action?.description}</p>
                </div>
              </div>
            </button>
          )}
        </div>
      </div>
      {}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-trust-builder to-brand-secondary rounded-lg flex items-center justify-center">
              <Icon name="Monitor" size={16} className="text-white" />
            </div>
            <div>
              <h3 className="font-inter font-semibold text-foreground">System Status</h3>
              <p className="text-sm text-text-secondary">Real-time system health</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse-subtle"></div>
            <span className="text-sm text-text-secondary">All Systems Operational</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {systemStats?.map((stat, index) =>
          <div key={index} className="text-center p-4 bg-muted rounded-lg">
              <div className={`text-2xl font-bold ${getStatusColor(stat?.status)}`}>
                {stat?.value}
              </div>
              <div className="text-sm text-text-secondary mt-1">{stat?.label}</div>
            </div>
          )}
        </div>
      </div>
      {}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-primary to-primary rounded-lg flex items-center justify-center">
              <Icon name="Activity" size={16} className="text-white" />
            </div>
            <div>
              <h3 className="font-inter font-semibold text-foreground">Recent Activities</h3>
              <p className="text-sm text-text-secondary">Latest system events</p>
            </div>
          </div>
          
          <Button variant="ghost" size="sm" iconName="ExternalLink" iconPosition="right">
            View All
          </Button>
        </div>

        <div className="space-y-3">
          {[
          { time: '2 min ago', action: 'Module deployed', module: 'Authentication Portal', status: 'success' },
          { time: '5 min ago', action: 'Configuration updated', module: 'Booking Interface', status: 'info' },
          { time: '12 min ago', action: 'Performance alert', module: 'Analytics Dashboard', status: 'warning' },
          { time: '18 min ago', action: 'User login', module: 'Auth Portal', status: 'info' }]?.
          map((activity, index) =>
          <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
              activity?.status === 'success' ? 'bg-success' :
              activity?.status === 'warning' ? 'bg-warning' :
              activity?.status === 'error' ? 'bg-error' : 'bg-primary'}`
              }></div>
                <div>
                  <div className="text-sm font-medium text-foreground">{activity?.action}</div>
                  <div className="text-xs text-text-secondary">{activity?.module}</div>
                </div>
              </div>
              <div className="text-xs text-text-secondary">{activity?.time}</div>
            </div>
          )}
        </div>
      </div>
    </div>);

};

export default QuickActionsPanel;