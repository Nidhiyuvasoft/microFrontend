import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ModuleStatusCard from './components/ModuleStatusCard';
import PerformanceMetrics from './components/PerformanceMetrics';
import QuickActionsPanel from './components/QuickActionsPanel';
import SystemHealthIndicator from './components/SystemHealthIndicator';
import ModuleDependencyGraph from './components/ModuleDependencyGraph';

const MainDashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedModule, setSelectedModule] = useState(null);
  const [dashboardLayout, setDashboardLayout] = useState('default');
  const [userRole] = useState('Senior React Developer');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);


  const modules = [
  {
    id: 'auth-portal',
    name: 'Authentication Portal',
    description: 'User authentication & security management',
    icon: 'Shield',
    status: 'healthy',
    version: 'v1.8.3',
    uptime: '99.98%',
    performance: 98,
    quickAction: { label: 'Manage Users', icon: 'Users' },
    route: '/authentication-portal'
  },
  {
    id: 'booking-interface',
    name: 'Booking Interface',
    description: 'Facility booking & reservation system',
    icon: 'Calendar',
    status: 'healthy',
    version: 'v2.3.0',
    uptime: '99.92%',
    performance: 95,
    quickAction: { label: 'View Bookings', icon: 'Eye' },
    route: '/booking-interface'
  },
  {
    id: 'analytics-dashboard',
    name: 'Analytics Dashboard',
    description: 'Performance metrics & reporting',
    icon: 'BarChart3',
    status: 'warning',
    version: 'v1.7.4',
    uptime: '99.85%',
    performance: 92,
    quickAction: { label: 'View Reports', icon: 'FileText' },
    route: '/analytics-dashboard'
  },
  {
    id: 'module-registry',
    name: 'Module Registry',
    description: 'Micro-frontend module discovery',
    icon: 'Package',
    status: 'healthy',
    version: 'v1.5.2',
    uptime: '99.97%',
    performance: 97,
    quickAction: { label: 'Deploy Module', icon: 'Upload' },
    route: '/module-registry'
  },
  {
    id: 'config-center',
    name: 'Configuration Center',
    description: 'System settings & configuration',
    icon: 'Settings',
    status: 'healthy',
    version: 'v1.9.1',
    uptime: '99.99%',
    performance: 99,
    quickAction: { label: 'Edit Config', icon: 'Edit' },
    route: '/configuration-center'
  }];


  const handleModuleDetails = (module) => {
    setSelectedModule(module);
    navigate(module.route);
  };

  const handleQuickAction = (module) => {
    navigate(module.route);
  };

  const handleActionClick = (actionId) => {
    switch (actionId) {
      case 'error-center':

        alert('Error Center: No critical errors detected. System operating normally.');
        break;
      default:
        console.log(`Action clicked: ${actionId}`);
    }
  };

  const handleHealthCheck = () => {

    alert('Health check initiated. All systems refreshed successfully.');
  };

  const handleNodeClick = (module) => {
    setSelectedModule(module);
  };

  const getWelcomeMessage = () => {
    const hour = currentTime?.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="min-h-screen bg-background">
      {}
      <div className="bg-gradient-to-r from-primary via-brand-primary to-accent text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold font-inter">
                {getWelcomeMessage()}, {userRole}
              </h1>
              <p className="text-lg opacity-90 mt-2">
                Welcome to MicroFed Enterprise - Your unified control center
              </p>
              <div className="flex items-center space-x-4 mt-4 text-sm opacity-80">
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} />
                  <span>{currentTime?.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Activity" size={16} />
                  <span>All systems operational</span>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold">{modules?.length}</div>
                <div className="text-sm opacity-80">Active Modules</div>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div className="text-right">
                <div className="text-2xl font-bold">99.9%</div>
                <div className="text-sm opacity-80">System Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-foreground">System Overview</h2>
            <div className="flex bg-muted rounded-lg p-1">
              {[
              { layout: 'default', label: 'Default', icon: 'LayoutGrid' },
              { layout: 'compact', label: 'Compact', icon: 'LayoutList' },
              { layout: 'detailed', label: 'Detailed', icon: 'LayoutDashboard' }]?.
              map((option) =>
              <button
                key={option?.layout}
                onClick={() => setDashboardLayout(option?.layout)}
                className={`flex items-center space-x-1 px-3 py-1 rounded-md text-sm font-medium transition-all duration-brand ${
                dashboardLayout === option?.layout ?
                'bg-primary text-primary-foreground' :
                'text-text-secondary hover:text-foreground'}`
                }>
                
                  <Icon name={option?.icon} size={14} />
                  <span>{option?.label}</span>
                </button>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              iconName="RefreshCw"
              iconPosition="left"
              onClick={() => window.location?.reload()}>
              
              Refresh
            </Button>
            <Button
              variant="default"
              size="sm"
              iconName="Settings"
              iconPosition="left"
              onClick={() => navigate('/configuration-center')}>
              
              Configure
            </Button>
          </div>
        </div>

        {}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {}
          <div className="xl:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-foreground">Module Status</h3>
              <Button
                variant="ghost"
                size="sm"
                iconName="ExternalLink"
                iconPosition="right"
                onClick={() => navigate('/module-registry')}>
                
                View All Modules
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {modules?.map((module) =>
              <ModuleStatusCard
                key={module.id}
                module={module}
                onViewDetails={handleModuleDetails}
                onQuickAction={handleQuickAction} />

              )}
            </div>
          </div>

          {}
          <div className="xl:col-span-2">
            <QuickActionsPanel onActionClick={handleActionClick} />
          </div>
        </div>

        {}
        <div className="mt-8">
          <PerformanceMetrics metrics={{}} />
        </div>

        {}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-8">
          <div>
            <SystemHealthIndicator onHealthCheck={handleHealthCheck} />
          </div>
          <div>
            <ModuleDependencyGraph onNodeClick={handleNodeClick} />
          </div>
        </div>

        {}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-secondary to-success rounded-lg flex items-center justify-center">
                <Icon name="Code" size={16} className="text-white" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Dev Environment</h4>
                <p className="text-sm text-text-secondary">Development status</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Hot Reload</span>
                <span className="text-success font-medium">Active</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Build Mode</span>
                <span className="text-primary font-medium">Development</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Port</span>
                <span className="font-mono text-foreground">3000</span>
              </div>
            </div>
          </div>

          {}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-warning to-conversion-accent rounded-lg flex items-center justify-center">
                <Icon name="Shield" size={16} className="text-white" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Security</h4>
                <p className="text-sm text-text-secondary">Security monitoring</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">SSL Status</span>
                <span className="text-success font-medium">Secure</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Auth Sessions</span>
                <span className="font-mono text-foreground">247</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Last Scan</span>
                <span className="text-text-secondary">2 hours ago</span>
              </div>
            </div>
          </div>

          {}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center">
                <Icon name="Zap" size={16} className="text-white" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">API Gateway</h4>
                <p className="text-sm text-text-secondary">API performance</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Requests/min</span>
                <span className="font-mono text-foreground">1,247</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Avg Response</span>
                <span className="font-mono text-foreground">89ms</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Success Rate</span>
                <span className="text-success font-medium">99.7%</span>
              </div>
            </div>
          </div>

          {}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-trust-builder to-brand-primary rounded-lg flex items-center justify-center">
                <Icon name="HardDrive" size={16} className="text-white" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Resources</h4>
                <p className="text-sm text-text-secondary">System resources</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">CPU Usage</span>
                <span className="font-mono text-foreground">34%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Memory</span>
                <span className="font-mono text-foreground">2.1GB</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Storage</span>
                <span className="font-mono text-foreground">45GB</span>
              </div>
            </div>
          </div>
        </div>

        {}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="text-sm text-text-secondary">
              Last updated: {currentTime?.toLocaleString()} • MicroFed Enterprise v2.1.0
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                iconName="HelpCircle"
                iconPosition="left">
                
                Documentation
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="MessageSquare"
                iconPosition="left">
                
                Support
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Github"
                iconPosition="left"
                onClick={() => window.open('https://github.com', '_blank')}>
                
                GitHub
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>);

};

export default MainDashboard;