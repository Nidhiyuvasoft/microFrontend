import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import MetricsCard from './components/MetricsCard';
import PerformanceChart from './components/PerformanceChart';
import ModuleHealthGrid from './components/ModuleHealthGrid';
import UserEngagementChart from './components/UserEngagementChart';
import ExportPanel from './components/ExportPanel';
import RealTimeMonitor from './components/RealTimeMonitor';

const AnalyticsDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('24h');
  const [selectedModule, setSelectedModule] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);


  const metricsData = [
  {
    title: 'Total Page Views',
    value: '2.4M',
    change: '+12.5%',
    changeType: 'positive',
    icon: 'Eye',
    description: 'Across all micro-frontends',
    trend: true
  },
  {
    title: 'Active Users',
    value: '18,247',
    change: '+8.2%',
    changeType: 'positive',
    icon: 'Users',
    description: 'Currently online users',
    trend: true
  },
  {
    title: 'Module Load Time',
    value: '127ms',
    change: '-15ms',
    changeType: 'positive',
    icon: 'Clock',
    description: 'Average across all modules',
    trend: true
  },
  {
    title: 'Error Rate',
    value: '0.12%',
    change: '+0.03%',
    changeType: 'negative',
    icon: 'AlertTriangle',
    description: 'System-wide error rate',
    trend: false
  },
  {
    title: 'Bundle Size',
    value: '2.8MB',
    change: '-0.4MB',
    changeType: 'positive',
    icon: 'Package',
    description: 'Total bundle size',
    trend: true
  },
  {
    title: 'Performance Score',
    value: '94/100',
    change: '+3',
    changeType: 'positive',
    icon: 'Zap',
    description: 'Lighthouse performance',
    trend: true
  }];



  const performanceData = [
  { timestamp: '2025-01-24T06:00:00Z', 'Load Time': 145, 'Bundle Size': 2800, 'Performance Score': 92, 'Memory Usage': 45, 'CPU Usage': 23 },
  { timestamp: '2025-01-24T07:00:00Z', 'Load Time': 132, 'Bundle Size': 2750, 'Performance Score': 94, 'Memory Usage': 42, 'CPU Usage': 28 },
  { timestamp: '2025-01-24T08:00:00Z', 'Load Time': 128, 'Bundle Size': 2820, 'Performance Score': 93, 'Memory Usage': 48, 'CPU Usage': 31 },
  { timestamp: '2025-01-24T09:00:00Z', 'Load Time': 127, 'Bundle Size': 2780, 'Performance Score': 95, 'Memory Usage': 44, 'CPU Usage': 26 },
  { timestamp: '2025-01-24T10:00:00Z', 'Load Time': 124, 'Bundle Size': 2760, 'Performance Score': 96, 'Memory Usage': 41, 'CPU Usage': 24 }];


  const performanceMetrics = ['Load Time', 'Bundle Size', 'Performance Score', 'Memory Usage', 'CPU Usage'];


  const moduleHealthData = [
  {
    id: 'main-dashboard',
    name: 'Main Dashboard',
    version: '2.1.4',
    status: 'healthy',
    loadTime: 89,
    bundleSize: 456,
    memoryUsage: 12.4,
    cpuUsage: 8.2,
    requestsPerSecond: 145,
    lastUpdated: '2 hours ago'
  },
  {
    id: 'booking-interface',
    name: 'Booking Interface',
    version: '1.8.2',
    status: 'warning',
    loadTime: 156,
    bundleSize: 678,
    memoryUsage: 18.7,
    cpuUsage: 15.3,
    requestsPerSecond: 89,
    lastUpdated: '30 minutes ago'
  },
  {
    id: 'authentication-portal',
    name: 'Auth Portal',
    version: '3.0.1',
    status: 'healthy',
    loadTime: 67,
    bundleSize: 234,
    memoryUsage: 8.9,
    cpuUsage: 5.1,
    requestsPerSecond: 267,
    lastUpdated: '1 hour ago'
  },
  {
    id: 'analytics-dashboard',
    name: 'Analytics Dashboard',
    version: '1.5.7',
    status: 'healthy',
    loadTime: 134,
    bundleSize: 892,
    memoryUsage: 24.6,
    cpuUsage: 12.8,
    requestsPerSecond: 56,
    lastUpdated: '15 minutes ago'
  },
  {
    id: 'module-registry',
    name: 'Module Registry',
    version: '2.3.0',
    status: 'error',
    loadTime: 0,
    bundleSize: 345,
    memoryUsage: 0,
    cpuUsage: 0,
    requestsPerSecond: 0,
    lastUpdated: '5 minutes ago',
    errorMessage: 'Connection timeout - unable to load module'
  },
  {
    id: 'configuration-center',
    name: 'Configuration Center',
    version: '1.9.3',
    status: 'loading',
    loadTime: 0,
    bundleSize: 567,
    memoryUsage: 0,
    cpuUsage: 0,
    requestsPerSecond: 0,
    lastUpdated: 'Loading...'
  }];



  const userEngagementData = [
  { period: 'Mon', pageViews: 12450, uniqueUsers: 3240, sessions: 4560, bounceRate: 32, avgSessionDuration: 245 },
  { period: 'Tue', pageViews: 15680, uniqueUsers: 4120, sessions: 5890, bounceRate: 28, avgSessionDuration: 267 },
  { period: 'Wed', pageViews: 18920, uniqueUsers: 4890, sessions: 6780, bounceRate: 25, avgSessionDuration: 289 },
  { period: 'Thu', pageViews: 16540, uniqueUsers: 4350, sessions: 6120, bounceRate: 30, avgSessionDuration: 256 },
  { period: 'Fri', pageViews: 21340, uniqueUsers: 5670, sessions: 7890, bounceRate: 22, avgSessionDuration: 312 },
  { period: 'Sat', pageViews: 19870, uniqueUsers: 5120, sessions: 7340, bounceRate: 26, avgSessionDuration: 298 },
  { period: 'Sun', pageViews: 14560, uniqueUsers: 3890, sessions: 5450, bounceRate: 35, avgSessionDuration: 234 }];



  const availableReports = [
  {
    id: 'performance-overview',
    name: 'Performance Overview',
    description: 'Comprehensive performance metrics across all modules',
    icon: 'Zap',
    dataPoints: 1250
  },
  {
    id: 'user-engagement',
    name: 'User Engagement Analysis',
    description: 'User behavior patterns and engagement metrics',
    icon: 'Users',
    dataPoints: 890
  },
  {
    id: 'module-health',
    name: 'Module Health Report',
    description: 'Detailed health status and diagnostics for all modules',
    icon: 'Package',
    dataPoints: 456
  },
  {
    id: 'error-analysis',
    name: 'Error Analysis',
    description: 'Error tracking and analysis across the system',
    icon: 'AlertTriangle',
    dataPoints: 234
  },
  {
    id: 'load-time-analysis',
    name: 'Load Time Analysis',
    description: 'Detailed analysis of module loading performance',
    icon: 'Clock',
    dataPoints: 678
  },
  {
    id: 'bundle-optimization',
    name: 'Bundle Optimization Report',
    description: 'Bundle size analysis and optimization recommendations',
    icon: 'FileText',
    dataPoints: 345
  }];


  const tabs = [
  { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
  { id: 'performance', label: 'Performance', icon: 'Zap' },
  { id: 'modules', label: 'Module Health', icon: 'Package' },
  { id: 'users', label: 'User Analytics', icon: 'Users' },
  { id: 'realtime', label: 'Real-Time', icon: 'Activity' },
  { id: 'export', label: 'Export', icon: 'Download' }];


  const handleModuleClick = (module) => {
    setSelectedModule(module);
  };

  const handleExport = async (exportConfig) => {
    console.log('Exporting with config:', exportConfig);

    return new Promise((resolve) => setTimeout(resolve, 2000));
  };

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  useEffect(() => {
    document.title = 'Analytics Dashboard - MicroFed Enterprise';
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {metricsData?.map((metric, index) =>
              <MetricsCard key={index} {...metric} />
              )}
            </div>
            {}
            <PerformanceChart
              title="System Performance Trends"
              data={performanceData}
              metrics={performanceMetrics}
              timeRange={timeRange}
              onTimeRangeChange={setTimeRange} />
            
            {}
            <UserEngagementChart
              title="User Engagement Analytics"
              data={userEngagementData} />
            
          </div>);


      case 'performance':
        return (
          <div className="space-y-6">
            <PerformanceChart
              title="Detailed Performance Analysis"
              data={performanceData}
              metrics={performanceMetrics}
              timeRange={timeRange}
              onTimeRangeChange={setTimeRange} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {metricsData?.slice(2, 6)?.map((metric, index) =>
              <MetricsCard key={index} {...metric} />
              )}
            </div>
          </div>);


      case 'modules':
        return (
          <div className="space-y-6">
            <ModuleHealthGrid
              modules={moduleHealthData}
              onModuleClick={handleModuleClick} />
            
          </div>);


      case 'users':
        return (
          <div className="space-y-6">
            <UserEngagementChart
              title="Comprehensive User Analytics"
              data={userEngagementData} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metricsData?.slice(0, 4)?.map((metric, index) =>
              <MetricsCard key={index} {...metric} />
              )}
            </div>
          </div>);


      case 'realtime':
        return (
          <RealTimeMonitor onRefresh={handleRefresh} />);


      case 'export':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ExportPanel
                onExport={handleExport}
                availableReports={availableReports} />
              
            </div>
            <div className="space-y-6">
              {metricsData?.slice(0, 3)?.map((metric, index) =>
              <MetricsCard key={index} {...metric} />
              )}
            </div>
          </div>);


      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Analytics Dashboard - MicroFed Enterprise</title>
        <meta name="description" content="Comprehensive analytics and reporting hub with interactive charts, data visualization, and export capabilities for micro-frontend performance monitoring." />
      </Helmet>
      <Header />
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} />
      
      <main className={`transition-all duration-brand ${
      sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'} pt-16`
      }>
        <div className="p-6 lg:p-8">
          {}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-inter font-bold text-foreground mb-2">
                  Analytics Dashboard
                </h1>
                <p className="text-text-secondary">
                  Comprehensive analytics and reporting hub with real-time performance monitoring
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  iconName="RefreshCw"
                  iconPosition="left"
                  onClick={handleRefresh}>
                  
                  Refresh Data
                </Button>
                <Button
                  variant="default"
                  iconName="Download"
                  iconPosition="left"
                  onClick={() => setActiveTab('export')}>
                  
                  Export Reports
                </Button>
              </div>
            </div>

            {}
            <div className="border-b border-border">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs?.map((tab) =>
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-all duration-brand ${
                  activeTab === tab?.id ?
                  'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-foreground hover:border-border'}`
                  }>
                  
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                )}
              </nav>
            </div>
          </div>

          {}
          <div key={refreshKey}>
            {renderTabContent()}
          </div>

          {}
          {selectedModule &&
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-card border border-border rounded-lg shadow-brand-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                <div className="p-6 border-b border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon name="Package" size={20} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-inter font-semibold text-lg text-foreground">
                          {selectedModule?.name}
                        </h3>
                        <p className="text-sm text-text-secondary">
                          Version {selectedModule?.version} • {selectedModule?.lastUpdated}
                        </p>
                      </div>
                    </div>
                    <Button
                    variant="ghost"
                    size="sm"
                    iconName="X"
                    onClick={() => setSelectedModule(null)} />
                  
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-background rounded-lg p-4">
                      <div className="text-sm text-text-secondary mb-1">Load Time</div>
                      <div className="text-2xl font-bold text-foreground">{selectedModule?.loadTime}ms</div>
                    </div>
                    <div className="bg-background rounded-lg p-4">
                      <div className="text-sm text-text-secondary mb-1">Bundle Size</div>
                      <div className="text-2xl font-bold text-foreground">{selectedModule?.bundleSize}KB</div>
                    </div>
                    <div className="bg-background rounded-lg p-4">
                      <div className="text-sm text-text-secondary mb-1">Memory Usage</div>
                      <div className="text-2xl font-bold text-foreground">{selectedModule?.memoryUsage}MB</div>
                    </div>
                    <div className="bg-background rounded-lg p-4">
                      <div className="text-sm text-text-secondary mb-1">CPU Usage</div>
                      <div className="text-2xl font-bold text-foreground">{selectedModule?.cpuUsage}%</div>
                    </div>
                  </div>

                  {selectedModule?.errorMessage &&
                <div className="bg-error/10 border border-error/20 rounded-lg p-4 mb-6">
                      <div className="flex items-center space-x-2 text-error mb-2">
                        <Icon name="AlertTriangle" size={16} />
                        <span className="font-medium">Error Details</span>
                      </div>
                      <p className="text-sm text-error">{selectedModule?.errorMessage}</p>
                    </div>
                }

                  <div className="flex justify-end space-x-3">
                    <Button
                    variant="outline"
                    iconName="ExternalLink"
                    iconPosition="left">
                    
                      View Module
                    </Button>
                    <Button
                    variant="default"
                    iconName="Settings"
                    iconPosition="left">
                    
                      Configure
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </main>
    </div>);

};

export default AnalyticsDashboard;