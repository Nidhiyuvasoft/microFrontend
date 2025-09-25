import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ModuleCard from './components/ModuleCard';
import ModuleFilters from './components/ModuleFilters';
import ModuleStats from './components/ModuleStats';
import ModuleTestSandbox from './components/ModuleTestSandbox';
import ModuleComparison from './components/ModuleComparison';
import BulkOperations from './components/BulkOperations';

const ModuleRegistry = () => {
  const navigate = useNavigate();
  const [modules, setModules] = useState([]);
  const [filteredModules, setFilteredModules] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedModules, setSelectedModules] = useState([]);
  const [comparisonModules, setComparisonModules] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [testSandbox, setTestSandbox] = useState({ isOpen: false, module: null });
  const [isLoading, setIsLoading] = useState(true);


  const mockModules = [
  {
    id: 'auth-portal',
    name: 'Authentication Portal',
    category: 'authentication',
    description: 'Complete user authentication system with role-based access control, session management, and security monitoring capabilities.',
    version: '2.1.4',
    status: 'healthy',
    uptime: 99.8,
    loadTime: 1250,
    bundleSize: '245KB',
    dependencies: 8,
    successRate: 99.2,
    errorRate: 0.8,
    memoryUsage: '12MB',
    lastUpdated: '2024-09-20',
    icon: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=100&h=100&fit=crop&crop=center',
    permissions: ['user.read', 'user.write', 'auth.manage', 'session.control'],
    apiEndpoints: [
    { method: 'POST', path: '/api/auth/login' },
    { method: 'POST', path: '/api/auth/logout' },
    { method: 'GET', path: '/api/auth/profile' },
    { method: 'PUT', path: '/api/auth/update' },
    { method: 'POST', path: '/api/auth/refresh' }]

  },
  {
    id: 'booking-system',
    name: 'Booking Interface',
    category: 'booking',
    description: 'Advanced booking management system with calendar integration, conflict resolution, and resource optimization for enterprise scheduling.',
    version: '1.8.2',
    status: 'healthy',
    uptime: 98.5,
    loadTime: 1850,
    bundleSize: '380KB',
    dependencies: 12,
    successRate: 97.8,
    errorRate: 2.2,
    memoryUsage: '18MB',
    lastUpdated: '2024-09-18',
    icon: 'https://images.pexels.com/photos/273230/pexels-photo-273230.jpeg?w=100&h=100&fit=crop&crop=center',
    permissions: ['booking.read', 'booking.write', 'calendar.access', 'resource.manage'],
    apiEndpoints: [
    { method: 'GET', path: '/api/bookings' },
    { method: 'POST', path: '/api/bookings' },
    { method: 'PUT', path: '/api/bookings/:id' },
    { method: 'DELETE', path: '/api/bookings/:id' }]

  },
  {
    id: 'analytics-hub',
    name: 'Analytics Dashboard',
    category: 'analytics',
    description: 'Comprehensive analytics and reporting hub with interactive charts, data visualization, and export capabilities for business intelligence.',
    version: '3.0.1',
    status: 'warning',
    uptime: 96.2,
    loadTime: 2100,
    bundleSize: '520KB',
    dependencies: 15,
    successRate: 94.5,
    errorRate: 5.5,
    memoryUsage: '25MB',
    lastUpdated: '2024-09-22',
    icon: 'https://images.pixabay.com/photo/2016/11/27/21/42/stock-1863880_1280.jpg?w=100&h=100&fit=crop&crop=center',
    permissions: ['analytics.read', 'reports.generate', 'data.export', 'dashboard.config'],
    apiEndpoints: [
    { method: 'GET', path: '/api/analytics/metrics' },
    { method: 'GET', path: '/api/analytics/reports' },
    { method: 'POST', path: '/api/analytics/export' }]

  },
  {
    id: 'notification-center',
    name: 'Notification Center',
    category: 'communication',
    description: 'Real-time notification system with multi-channel delivery, user preferences, and notification history management.',
    version: '1.5.7',
    status: 'healthy',
    uptime: 99.1,
    loadTime: 950,
    bundleSize: '180KB',
    dependencies: 6,
    successRate: 98.7,
    errorRate: 1.3,
    memoryUsage: '8MB',
    lastUpdated: '2024-09-19',
    icon: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop&crop=center',
    permissions: ['notifications.send', 'notifications.read', 'preferences.manage'],
    apiEndpoints: [
    { method: 'POST', path: '/api/notifications/send' },
    { method: 'GET', path: '/api/notifications' },
    { method: 'PUT', path: '/api/notifications/:id/read' }]

  },
  {
    id: 'file-manager',
    name: 'File Management',
    category: 'utilities',
    description: 'Enterprise file management system with cloud storage integration, version control, and collaborative editing features.',
    version: '2.3.0',
    status: 'healthy',
    uptime: 97.8,
    loadTime: 1650,
    bundleSize: '420KB',
    dependencies: 10,
    successRate: 96.9,
    errorRate: 3.1,
    memoryUsage: '22MB',
    lastUpdated: '2024-09-21',
    icon: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?w=100&h=100&fit=crop&crop=center',
    permissions: ['files.read', 'files.write', 'files.delete', 'storage.manage'],
    apiEndpoints: [
    { method: 'GET', path: '/api/files' },
    { method: 'POST', path: '/api/files/upload' },
    { method: 'DELETE', path: '/api/files/:id' }]

  },
  {
    id: 'user-management',
    name: 'User Management',
    category: 'authentication',
    description: 'Complete user lifecycle management with role assignments, permission controls, and organizational hierarchy support.',
    version: '2.0.8',
    status: 'error',
    uptime: 89.5,
    loadTime: 2850,
    bundleSize: '310KB',
    dependencies: 9,
    successRate: 87.2,
    errorRate: 12.8,
    memoryUsage: '16MB',
    lastUpdated: '2024-09-15',
    icon: 'https://images.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png?w=100&h=100&fit=crop&crop=center',
    permissions: ['users.read', 'users.write', 'roles.manage', 'permissions.assign'],
    apiEndpoints: [
    { method: 'GET', path: '/api/users' },
    { method: 'POST', path: '/api/users' },
    { method: 'PUT', path: '/api/users/:id' },
    { method: 'DELETE', path: '/api/users/:id' }]

  },
  {
    id: 'payment-gateway',
    name: 'Payment Gateway',
    category: 'utilities',
    description: 'Secure payment processing module with multiple payment methods, fraud detection, and transaction monitoring.',
    version: '1.9.3',
    status: 'healthy',
    uptime: 99.9,
    loadTime: 1100,
    bundleSize: '290KB',
    dependencies: 7,
    successRate: 99.8,
    errorRate: 0.2,
    memoryUsage: '14MB',
    lastUpdated: '2024-09-23',
    icon: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop&crop=center',
    permissions: ['payments.process', 'transactions.read', 'refunds.manage'],
    apiEndpoints: [
    { method: 'POST', path: '/api/payments/charge' },
    { method: 'GET', path: '/api/payments/history' },
    { method: 'POST', path: '/api/payments/refund' }]

  },
  {
    id: 'chat-system',
    name: 'Chat System',
    category: 'communication',
    description: 'Real-time messaging system with group chats, file sharing, and integration with external communication platforms.',
    version: '1.4.1',
    status: 'warning',
    uptime: 94.7,
    loadTime: 1750,
    bundleSize: '350KB',
    dependencies: 11,
    successRate: 93.8,
    errorRate: 6.2,
    memoryUsage: '20MB',
    lastUpdated: '2024-09-17',
    icon: 'https://images.pexels.com/photos/1591061/pexels-photo-1591061.jpeg?w=100&h=100&fit=crop&crop=center',
    permissions: ['chat.send', 'chat.read', 'files.share', 'groups.manage'],
    apiEndpoints: [
    { method: 'POST', path: '/api/chat/send' },
    { method: 'GET', path: '/api/chat/messages' },
    { method: 'POST', path: '/api/chat/groups' }]

  },
  {
    id: 'config-manager',
    name: 'Configuration Manager',
    category: 'configuration',
    description: 'Runtime configuration management system with environment-specific settings, feature flags, and deployment controls.',
    version: '1.2.5',
    status: 'healthy',
    uptime: 98.9,
    loadTime: 800,
    bundleSize: '150KB',
    dependencies: 4,
    successRate: 99.5,
    errorRate: 0.5,
    memoryUsage: '6MB',
    lastUpdated: '2024-09-24',
    icon: 'https://images.pixabay.com/photo/2017/06/10/07/18/list-2389219_1280.png?w=100&h=100&fit=crop&crop=center',
    permissions: ['config.read', 'config.write', 'features.toggle', 'deploy.manage'],
    apiEndpoints: [
    { method: 'GET', path: '/api/config' },
    { method: 'PUT', path: '/api/config' },
    { method: 'POST', path: '/api/config/deploy' }]

  },
  {
    id: 'reporting-engine',
    name: 'Reporting Engine',
    category: 'analytics',
    description: 'Advanced reporting system with custom report builder, scheduled reports, and multi-format export capabilities.',
    version: '2.2.1',
    status: 'inactive',
    uptime: 0,
    loadTime: 0,
    bundleSize: '480KB',
    dependencies: 13,
    successRate: 0,
    errorRate: 0,
    memoryUsage: '0MB',
    lastUpdated: '2024-09-10',
    icon: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop&crop=center',
    permissions: ['reports.create', 'reports.schedule', 'data.access', 'exports.generate'],
    apiEndpoints: [
    { method: 'POST', path: '/api/reports/create' },
    { method: 'GET', path: '/api/reports' },
    { method: 'POST', path: '/api/reports/export' }]

  },
  {
    id: 'audit-logger',
    name: 'Audit Logger',
    category: 'authentication',
    description: 'Comprehensive audit logging system with activity tracking, compliance reporting, and security event monitoring.',
    version: '1.7.2',
    status: 'healthy',
    uptime: 99.6,
    loadTime: 650,
    bundleSize: '120KB',
    dependencies: 3,
    successRate: 99.9,
    errorRate: 0.1,
    memoryUsage: '5MB',
    lastUpdated: '2024-09-22',
    icon: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?w=100&h=100&fit=crop&crop=center',
    permissions: ['audit.read', 'logs.access', 'compliance.report'],
    apiEndpoints: [
    { method: 'GET', path: '/api/audit/logs' },
    { method: 'POST', path: '/api/audit/search' },
    { method: 'GET', path: '/api/audit/compliance' }]

  },
  {
    id: 'resource-scheduler',
    name: 'Resource Scheduler',
    category: 'booking',
    description: 'Intelligent resource scheduling system with availability optimization, conflict resolution, and capacity management.',
    version: '1.6.0',
    status: 'warning',
    uptime: 95.3,
    loadTime: 1950,
    bundleSize: '400KB',
    dependencies: 14,
    successRate: 92.1,
    errorRate: 7.9,
    memoryUsage: '19MB',
    lastUpdated: '2024-09-16',
    icon: 'https://images.pixabay.com/photo/2016/04/04/14/12/monitor-1307227_1280.jpg?w=100&h=100&fit=crop&crop=center',
    permissions: ['resources.read', 'resources.schedule', 'capacity.manage'],
    apiEndpoints: [
    { method: 'GET', path: '/api/resources' },
    { method: 'POST', path: '/api/resources/schedule' },
    { method: 'GET', path: '/api/resources/availability' }]

  }];


  useEffect(() => {

    const loadModules = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setModules(mockModules);
      setFilteredModules(mockModules);
      setIsLoading(false);
    };

    loadModules();
  }, []);

  useEffect(() => {
    let filtered = [...modules];


    if (searchTerm) {
      filtered = filtered?.filter((module) =>
      module.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      module.description?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      module.category?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    }


    if (selectedCategory !== 'all') {
      filtered = filtered?.filter((module) => module.category === selectedCategory);
    }


    if (selectedStatus !== 'all') {
      filtered = filtered?.filter((module) => module.status === selectedStatus);
    }


    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a?.name?.localeCompare(b?.name);
        case 'status':
          return a?.status?.localeCompare(b?.status);
        case 'uptime':
          return b?.uptime - a?.uptime;
        case 'loadTime':
          return a?.loadTime - b?.loadTime;
        case 'lastUpdated':
          return new Date(b.lastUpdated) - new Date(a.lastUpdated);
        default:
          return 0;
      }
    });

    setFilteredModules(filtered);
  }, [modules, searchTerm, selectedCategory, selectedStatus, sortBy]);

  const handleToggleModuleStatus = (moduleId) => {
    setModules((prev) => prev?.map((module) => {
      if (module.id === moduleId) {
        const newStatus = module.status === 'inactive' ? 'healthy' : 'inactive';
        return {
          ...module,
          status: newStatus,
          uptime: newStatus === 'inactive' ? 0 : 99.5,
          successRate: newStatus === 'inactive' ? 0 : 99.5,
          errorRate: newStatus === 'inactive' ? 0 : 0.5
        };
      }
      return module;
    }));
  };

  const handleConfigureModule = (moduleId) => {
    navigate('/configuration-center', { state: { moduleId } });
  };

  const handleTestModule = (moduleId) => {
    const module = modules?.find((m) => m?.id === moduleId);
    setTestSandbox({ isOpen: true, module });
  };

  const handleViewModuleDetails = (moduleId) => {

    console.log('View details for module:', moduleId);
  };

  const handleModuleSelection = (moduleId) => {
    setSelectedModules((prev) => {
      if (prev?.includes(moduleId)) {
        return prev?.filter((id) => id !== moduleId);
      } else {
        return [...prev, moduleId];
      }
    });
  };

  const handleComparisonToggle = (moduleId) => {
    setComparisonModules((prev) => {
      if (prev?.find((m) => m?.id === moduleId)) {
        return prev?.filter((m) => m?.id !== moduleId);
      } else if (prev?.length < 4) {
        const module = modules?.find((m) => m?.id === moduleId);
        return [...prev, module];
      }
      return prev;
    });
  };

  const handleBulkAction = (action, moduleIds) => {
    console.log(`Performing bulk action: ${action} on modules:`, moduleIds);

    setSelectedModules([]);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedStatus('all');
    setSortBy('name');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin mb-4">
                <Icon name="Loader" size={32} className="text-primary mx-auto" />
              </div>
              <p className="text-foreground">Loading module registry...</p>
              <p className="text-text-secondary text-sm">Discovering available micro-frontends</p>
            </div>
          </div>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Icon name="Package" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="font-inter font-bold text-3xl text-foreground">
                  Module Registry
                </h1>
                <p className="text-text-secondary">
                  Dynamic discovery interface for micro-frontend modules
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all duration-brand ${
                  viewMode === 'grid' ? 'bg-background text-foreground shadow-sm' : 'text-text-secondary hover:text-foreground'}`
                  }>
                  
                  <Icon name="Grid3X3" size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-all duration-brand ${
                  viewMode === 'list' ? 'bg-background text-foreground shadow-sm' : 'text-text-secondary hover:text-foreground'}`
                  }>
                  
                  <Icon name="List" size={16} />
                </button>
              </div>

              <Button
                variant={showComparison ? 'default' : 'outline'}
                onClick={() => setShowComparison(!showComparison)}
                iconName="BarChart3"
                iconPosition="left">
                
                Compare ({comparisonModules?.length})
              </Button>

              <Button
                variant="default"
                iconName="Plus"
                iconPosition="left"
                onClick={() => navigate('/configuration-center')}>
                
                Add Module
              </Button>
            </div>
          </div>

          {}
          <ModuleStats modules={modules} />
        </div>

        {}
        <ModuleFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onClearFilters={handleClearFilters} />
        

        {}
        {showComparison &&
        <div className="mb-6">
            <ModuleComparison
            modules={modules}
            selectedModules={comparisonModules}
            onClose={() => setShowComparison(false)}
            onSelectModule={handleComparisonToggle} />
          
          </div>
        }

        {}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h2 className="font-inter font-semibold text-xl text-foreground">
              Available Modules
            </h2>
            <span className="px-3 py-1 bg-muted text-text-secondary text-sm rounded-full">
              {filteredModules?.length} of {modules?.length} modules
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedModules(filteredModules?.map((m) => m?.id))}
              iconName="CheckSquare"
              iconPosition="left">
              
              Select All
            </Button>
            {selectedModules?.length > 0 &&
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedModules([])}
              iconName="Square"
              iconPosition="left">
              
                Clear Selection
              </Button>
            }
          </div>
        </div>

        {}
        {filteredModules?.length === 0 ?
        <div className="text-center py-12">
            <Icon name="Search" size={48} className="text-text-secondary mx-auto mb-4" />
            <h3 className="font-inter font-semibold text-lg text-foreground mb-2">
              No modules found
            </h3>
            <p className="text-text-secondary mb-4">
              Try adjusting your search criteria or filters
            </p>
            <Button variant="outline" onClick={handleClearFilters}>
              Clear Filters
            </Button>
          </div> :

        <div className={`grid gap-6 mb-8 ${
        viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`
        }>
            {filteredModules?.map((module) =>
          <div key={module.id} className="relative">
                {}
                <div className="absolute top-4 left-4 z-10">
                  <input
                type="checkbox"
                checked={selectedModules?.includes(module.id)}
                onChange={() => handleModuleSelection(module.id)}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2" />
              
                </div>

                {}
                <div className="absolute top-4 right-4 z-10">
                  <button
                onClick={() => handleComparisonToggle(module.id)}
                className={`p-2 rounded-md transition-all duration-brand ${
                comparisonModules?.find((m) => m?.id === module.id) ?
                'bg-primary text-primary-foreground' :
                'bg-background/80 text-text-secondary hover:text-foreground'}`
                }
                title="Add to comparison">
                
                    <Icon name="BarChart3" size={16} />
                  </button>
                </div>

                <ModuleCard
              module={module}
              onToggleStatus={handleToggleModuleStatus}
              onConfigure={handleConfigureModule}
              onTest={handleTestModule}
              onViewDetails={handleViewModuleDetails} />
            
              </div>
          )}
          </div>
        }

        {}
        <ModuleTestSandbox
          module={testSandbox?.module}
          isOpen={testSandbox?.isOpen}
          onClose={() => setTestSandbox({ isOpen: false, module: null })}
          onTest={handleTestModule} />
        

        {}
        <BulkOperations
          selectedModules={selectedModules?.map((id) => modules?.find((m) => m?.id === id))?.filter(Boolean)}
          onBulkAction={handleBulkAction}
          onClearSelection={() => setSelectedModules([])} />
        
      </div>
    </div>);

};

export default ModuleRegistry;