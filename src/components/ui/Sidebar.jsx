import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggleCollapse, className = '' }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
  {
    section: 'Core',
    items: [
    {
      path: '/main-dashboard',
      label: 'Dashboard',
      icon: 'LayoutDashboard',
      description: 'System overview'
    },
    {
      path: '/module-registry',
      label: 'Module Registry',
      icon: 'Package',
      description: 'Micro-frontend modules'
    },
    {
      path: '/authentication-portal',
      label: 'Auth Portal',
      icon: 'Shield',
      description: 'Security management'
    }]

  },
  {
    section: 'Applications',
    items: [
    {
      path: '/booking-interface',
      label: 'Booking Interface',
      icon: 'Calendar',
      description: 'Reservation system'
    },
    {
      path: '/analytics-dashboard',
      label: 'Analytics',
      icon: 'BarChart3',
      description: 'Performance metrics'
    }]

  },
  {
    section: 'System',
    items: [
    {
      path: '/configuration-center',
      label: 'Configuration',
      icon: 'Settings',
      description: 'System settings'
    }]

  }];


  const systemStatus = {
    modules: { active: 12, total: 15, status: 'healthy' },
    performance: { score: 98, status: 'excellent' },
    uptime: '99.9%'
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileOpen(false);
  };

  const isActivePath = (path) => location?.pathname === path;

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy':case 'excellent':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'error':
        return 'text-error';
      default:
        return 'text-text-secondary';
    }
  };

  const SidebarContent = () =>
  <div className="flex flex-col h-full">
      {}
      <div className={`flex items-center justify-between p-4 border-b border-border ${
    isCollapsed ? 'px-2' : 'px-4'}`
    }>
        {!isCollapsed &&
      <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm opacity-90"></div>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-conversion-accent rounded-full module-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-inter font-bold text-sm text-foreground leading-none">
                MicroFed
              </span>
              <span className="font-inter font-medium text-xs text-text-secondary leading-none">
                Enterprise
              </span>
            </div>
          </div>
      }
        
        {onToggleCollapse &&
      <button
        onClick={onToggleCollapse}
        className="p-1.5 rounded-md text-text-secondary hover:text-foreground hover:bg-muted transition-all duration-brand">
        
            <Icon name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} size={16} />
          </button>
      }
      </div>

      {}
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="space-y-6">
          {navigationItems?.map((section) =>
        <div key={section?.section}>
              {!isCollapsed &&
          <div className="px-4 mb-2">
                  <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    {section?.section}
                  </h3>
                </div>
          }
              
              <div className="space-y-1">
                {section?.items?.map((item) =>
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`group flex items-center w-full transition-all duration-brand ${
              isCollapsed ? 'px-2 py-3 mx-2' : 'px-4 py-2 mx-2'} rounded-md ${

              isActivePath(item?.path) ?
              'bg-primary text-primary-foreground shadow-brand-sm' :
              'text-text-secondary hover:text-foreground hover:bg-muted'}`
              }
              title={isCollapsed ? item?.label : ''}>
              
                    <Icon
                name={item?.icon}
                size={20}
                className={`flex-shrink-0 ${isCollapsed ? '' : 'mr-3'}`} />
              
                    
                    {!isCollapsed &&
              <div className="flex-1 text-left">
                        <div className="font-medium text-sm">{item?.label}</div>
                        <div className="text-xs opacity-75">{item?.description}</div>
                      </div>
              }
                    
                    {isActivePath(item?.path) &&
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse-subtle"></div>
              }
                  </button>
            )}
              </div>
            </div>
        )}
        </div>
      </nav>

      {}
      {!isCollapsed &&
    <div className="p-4 border-t border-border">
          <div className="bg-muted rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-text-secondary">System Status</span>
              <div className={`w-2 h-2 rounded-full ${getStatusColor(systemStatus?.modules?.status)} module-pulse`}></div>
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-text-secondary">Modules</span>
                <span className="font-mono text-foreground">
                  {systemStatus?.modules?.active}/{systemStatus?.modules?.total}
                </span>
              </div>
              
              <div className="flex justify-between text-xs">
                <span className="text-text-secondary">Performance</span>
                <span className={`font-mono ${getStatusColor(systemStatus?.performance?.status)}`}>
                  {systemStatus?.performance?.score}%
                </span>
              </div>
              
              <div className="flex justify-between text-xs">
                <span className="text-text-secondary">Uptime</span>
                <span className="font-mono text-success">{systemStatus?.uptime}</span>
              </div>
            </div>
          </div>
        </div>
    }

      {}
      {!isCollapsed &&
    <div className="p-4 border-t border-border">
          <div className="space-y-2">
            <Button
          variant="outline"
          size="sm"
          fullWidth
          iconName="Plus"
          iconPosition="left"
          className="text-xs">
          
              Deploy Module
            </Button>
            
            <Button
          variant="ghost"
          size="sm"
          fullWidth
          iconName="HelpCircle"
          iconPosition="left"
          className="text-xs text-text-secondary">
          
              Documentation
            </Button>
          </div>
        </div>
    }
    </div>;


  return (
    <>
      {}
      <aside
        className={`hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:z-sidebar bg-card border-r border-border transition-all duration-brand ${
        isCollapsed ? 'lg:w-16' : 'lg:w-72'} ${
        className}`}>
        
        <SidebarContent />
      </aside>

      {}
      {isMobileOpen &&
      <div className="lg:hidden fixed inset-0 z-sidebar">
          <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)} />
        
          <aside className="fixed inset-y-0 left-0 w-72 bg-card border-r border-border">
            <SidebarContent />
          </aside>
        </div>
      }

      {}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed bottom-4 left-4 z-40 p-3 bg-primary text-primary-foreground rounded-full shadow-brand-lg">
        
        <Icon name="Menu" size={20} />
      </button>
    </>);

};

export default Sidebar;