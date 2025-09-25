import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import ConfigurationEditor from './components/ConfigurationEditor';
import ModuleConfigCard from './components/ModuleConfigCard';
import DeploymentSimulator from './components/DeploymentSimulator';
import EnvironmentSelector from './components/EnvironmentSelector';
import ConfigurationHistory from './components/ConfigurationHistory';
import ConfigurationTemplates from './components/ConfigurationTemplates';

const ConfigurationCenter = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('modules');
  const [selectedEnvironment, setSelectedEnvironment] = useState('development');
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);
  const [isDeploying, setIsDeploying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');


  const [modules, setModules] = useState([
  {
    id: 'auth-module',
    name: 'Authentication Module',
    description: 'User authentication and authorization system',
    version: '2.1.0',
    status: 'active',
    environment: 'production',
    remoteUrl: 'https://auth.microfed.com/remoteEntry.js',
    port: 3001,
    buildHash: 'a1b2c3d4',
    bundleSize: '245KB',
    lastUpdated: '2024-09-24T09:30:00Z',
    canRollback: true,
    metrics: {
      uptime: '99.9%',
      loadTime: 850,
      errorRate: 0.1
    },
    deploymentHistory: [
    { version: '2.1.0', date: '2024-09-24T09:30:00Z', status: 'success' },
    { version: '2.0.5', date: '2024-09-23T14:20:00Z', status: 'success' }]

  },
  {
    id: 'booking-module',
    name: 'Booking Interface',
    description: 'Facility booking and reservation management',
    version: '1.5.2',
    status: 'pending',
    environment: 'staging',
    remoteUrl: 'https://booking-staging.microfed.com/remoteEntry.js',
    port: 3002,
    buildHash: 'e5f6g7h8',
    bundleSize: '380KB',
    lastUpdated: '2024-09-24T08:15:00Z',
    canRollback: true,
    metrics: {
      uptime: '98.5%',
      loadTime: 1200,
      errorRate: 0.3
    },
    deploymentHistory: [
    { version: '1.5.2', date: '2024-09-24T08:15:00Z', status: 'pending' },
    { version: '1.5.1', date: '2024-09-22T16:45:00Z', status: 'success' }]

  },
  {
    id: 'analytics-module',
    name: 'Analytics Dashboard',
    description: 'Real-time analytics and reporting system',
    version: '3.0.1',
    status: 'error',
    environment: 'development',
    remoteUrl: 'http://localhost:3003/remoteEntry.js',
    port: 3003,
    buildHash: 'i9j0k1l2',
    bundleSize: '520KB',
    lastUpdated: '2024-09-24T07:45:00Z',
    canRollback: false,
    metrics: {
      uptime: '95.2%',
      loadTime: 2100,
      errorRate: 2.1
    },
    deploymentHistory: [
    { version: '3.0.1', date: '2024-09-24T07:45:00Z', status: 'failed' },
    { version: '3.0.0', date: '2024-09-20T11:30:00Z', status: 'success' }]

  }]
  );

  const [globalConfiguration, setGlobalConfiguration] = useState({
    name: "microfed-enterprise",
    version: "1.0.0",
    mode: "production",
    remotes: {
      auth: "auth@https://auth.microfed.com/remoteEntry.js",
      booking: "booking@https://booking.microfed.com/remoteEntry.js",
      analytics: "analytics@https://analytics.microfed.com/remoteEntry.js"
    },
    shared: {
      react: { singleton: true, requiredVersion: "^18.0.0" },
      "react-dom": { singleton: true, requiredVersion: "^18.0.0" },
      "react-router-dom": { singleton: true, requiredVersion: "^6.0.0" }
    },
    exposes: {},
    plugins: [],
    devServer: {
      port: 3000,
      hot: true,
      liveReload: true
    },
    optimization: {
      splitChunks: {
        chunks: "async",
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all"
          }
        }
      }
    }
  });

  const tabs = [
  { id: 'modules', name: 'Module Configuration', icon: 'Package' },
  { id: 'global', name: 'Global Settings', icon: 'Settings' },
  { id: 'templates', name: 'Templates', icon: 'Template' },
  { id: 'history', name: 'History', icon: 'History' }];


  const filteredModules = modules?.filter((module) =>
  module.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
  module.description?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const handleModuleEdit = (module) => {
    setSelectedModule(module);

  };

  const handleModuleDeploy = (module) => {
    setSelectedModule(module);
    setIsSimulatorOpen(true);
  };

  const handleModuleRollback = (module) => {

    console.log('Rolling back module:', module.name);
  };

  const handleModuleDelete = (module) => {
    setModules((prev) => prev?.filter((m) => m?.id !== module.id));
  };

  const handleConfigurationSave = (config) => {
    setGlobalConfiguration(config);

  };

  const handleConfigurationValidate = (isValid, errors) => {

    console.log('Configuration valid:', isValid, errors);
  };

  const handleDeploy = (configuration, environment) => {
    setIsDeploying(true);

    setTimeout(() => {
      setIsDeploying(false);
      setIsSimulatorOpen(false);

    }, 2000);
  };

  const handleTemplateApply = (template) => {
    setGlobalConfiguration(template?.config);
    setActiveTab('global');
  };

  const handleHistoryRestore = (historyItem) => {

    console.log('Restoring configuration:', historyItem?.version);
  };

  const handleHistoryCompare = (selectedItems) => {

    console.log('Comparing configurations:', selectedItems);
  };

  const handleHistoryViewDetails = (historyItem) => {

    console.log('Viewing details:', historyItem?.version);
  };

  const getStatusSummary = () => {
    const activeModules = modules?.filter((m) => m?.status === 'active')?.length;
    const totalModules = modules?.length;
    const pendingDeployments = modules?.filter((m) => m?.status === 'pending')?.length;
    const errorModules = modules?.filter((m) => m?.status === 'error')?.length;

    return {
      activeModules,
      totalModules,
      pendingDeployments,
      errorModules,
      healthScore: Math.round(activeModules / totalModules * 100)
    };
  };

  const statusSummary = getStatusSummary();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} />
      
      <main className={`transition-all duration-brand ${
      sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'} pt-16`
      }>
        <div className="p-6 space-y-6">
          {}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Configuration Center</h1>
              <p className="text-text-secondary">
                Manage module configurations, deployment settings, and environment variables
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <EnvironmentSelector
                currentEnvironment={selectedEnvironment}
                onEnvironmentChange={setSelectedEnvironment}
                environments={['development', 'staging', 'production']} />
              
              
              <Button
                variant="default"
                iconName="Rocket"
                onClick={() => setIsSimulatorOpen(true)}>
                
                Test Deployment
              </Button>
            </div>
          </div>

          {}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <Icon name="CheckCircle" size={20} className="text-success" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{statusSummary?.activeModules}</div>
                  <div className="text-sm text-text-secondary">Active Modules</div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Icon name="Clock" size={20} className="text-warning" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{statusSummary?.pendingDeployments}</div>
                  <div className="text-sm text-text-secondary">Pending Deployments</div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
                  <Icon name="XCircle" size={20} className="text-error" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{statusSummary?.errorModules}</div>
                  <div className="text-sm text-text-secondary">Failed Modules</div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Activity" size={20} className="text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{statusSummary?.healthScore}%</div>
                  <div className="text-sm text-text-secondary">System Health</div>
                </div>
              </div>
            </div>
          </div>

          {}
          <div className="border-b border-border">
            <nav className="flex space-x-8">
              {tabs?.map((tab) =>
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-all duration-brand ${
                activeTab === tab?.id ?
                'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-foreground hover:border-border'}`
                }>
                
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.name}</span>
                </button>
              )}
            </nav>
          </div>

          {}
          <div className="space-y-6">
            {activeTab === 'modules' &&
            <div className="space-y-6">
                {}
                <div className="flex items-center space-x-4">
                  <div className="flex-1 relative">
                    <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                    <input
                    type="text"
                    placeholder="Search modules..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e?.target?.value)}
                    className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                  
                  </div>
                  
                  <Button variant="outline" iconName="Filter">
                    Filter
                  </Button>
                  
                  <Button variant="default" iconName="Plus">
                    Add Module
                  </Button>
                </div>

                {}
                <div className="space-y-4">
                  {filteredModules?.map((module) =>
                <ModuleConfigCard
                  key={module.id}
                  module={module}
                  onEdit={handleModuleEdit}
                  onDeploy={handleModuleDeploy}
                  onRollback={handleModuleRollback}
                  onDelete={handleModuleDelete}
                  isDeploying={isDeploying && selectedModule?.id === module.id} />

                )}
                </div>
              </div>
            }

            {activeTab === 'global' &&
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">Global Configuration</h2>
                    <p className="text-text-secondary">
                      Manage shared dependencies, webpack settings, and global module federation configuration
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" iconName="Download">
                      Export Config
                    </Button>
                    <Button variant="outline" iconName="Upload">
                      Import Config
                    </Button>
                  </div>
                </div>

                <ConfigurationEditor
                configuration={globalConfiguration}
                onSave={handleConfigurationSave}
                onValidate={handleConfigurationValidate}
                title="webpack.config.js" />
              
              </div>
            }

            {activeTab === 'templates' &&
            <ConfigurationTemplates
              onApplyTemplate={handleTemplateApply}
              onCreateTemplate={() => {}} />

            }

            {activeTab === 'history' &&
            <ConfigurationHistory
              onRestore={handleHistoryRestore}
              onCompare={handleHistoryCompare}
              onViewDetails={handleHistoryViewDetails} />

            }
          </div>
        </div>
      </main>
      {}
      <DeploymentSimulator
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
        configuration={selectedModule || globalConfiguration}
        onDeploy={handleDeploy}
        environment={selectedEnvironment} />
      
    </div>);

};

export default ConfigurationCenter;