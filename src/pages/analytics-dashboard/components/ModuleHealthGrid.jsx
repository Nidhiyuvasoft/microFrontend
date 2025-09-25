import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ModuleHealthGrid = ({ modules, onModuleClick }) => {
  const [sortBy, setSortBy] = useState('name');
  const [filterStatus, setFilterStatus] = useState('all');

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy':
        return 'bg-success text-success-foreground';
      case 'warning':
        return 'bg-warning text-warning-foreground';
      case 'error':
        return 'bg-error text-error-foreground';
      case 'loading':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
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
      case 'loading':
        return 'Loader';
      default:
        return 'Circle';
    }
  };

  const sortedAndFilteredModules = modules?.filter((module) => filterStatus === 'all' || module.status === filterStatus)?.sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a?.name?.localeCompare(b?.name);
      case 'status':
        return a?.status?.localeCompare(b?.status);
      case 'loadTime':
        return a?.loadTime - b?.loadTime;
      case 'bundleSize':
        return a?.bundleSize - b?.bundleSize;
      default:
        return 0;
    }
  });

  const statusCounts = modules?.reduce((acc, module) => {
    acc[module.status] = (acc?.[module.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="bg-card border border-border rounded-lg shadow-brand-sm">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-inter font-semibold text-lg text-foreground">Module Health Status</h3>
          
          <div className="flex items-center space-x-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e?.target?.value)}
              className="text-xs bg-background border border-border rounded px-2 py-1 text-foreground">
              
              <option value="name">Sort by Name</option>
              <option value="status">Sort by Status</option>
              <option value="loadTime">Sort by Load Time</option>
              <option value="bundleSize">Sort by Bundle Size</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e?.target?.value)}
              className="text-xs bg-background border border-border rounded px-2 py-1 text-foreground">
              
              <option value="all">All Status</option>
              <option value="healthy">Healthy</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
              <option value="loading">Loading</option>
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-text-secondary">Healthy: {statusCounts?.healthy || 0}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span className="text-text-secondary">Warning: {statusCounts?.warning || 0}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-error rounded-full"></div>
            <span className="text-text-secondary">Error: {statusCounts?.error || 0}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-secondary rounded-full animate-pulse"></div>
            <span className="text-text-secondary">Loading: {statusCounts?.loading || 0}</span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sortedAndFilteredModules?.map((module) =>
          <div
            key={module.id}
            onClick={() => onModuleClick(module)}
            className="bg-background border border-border rounded-lg p-4 hover:shadow-brand-md transition-all duration-brand cursor-pointer group">
            
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 bg-primary/10 rounded">
                    <Icon name="Package" size={16} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                      {module.name}
                    </h4>
                    <p className="text-xs text-text-secondary">v{module.version}</p>
                  </div>
                </div>

                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(module.status)}`}>
                  <Icon
                  name={getStatusIcon(module.status)}
                  size={12}
                  className={module.status === 'loading' ? 'animate-spin' : ''} />
                
                  <span className="capitalize">{module.status}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-text-secondary">Load Time:</span>
                  <span className="font-mono text-foreground">{module.loadTime}ms</span>
                </div>
                
                <div className="flex justify-between text-xs">
                  <span className="text-text-secondary">Bundle Size:</span>
                  <span className="font-mono text-foreground">{module.bundleSize}KB</span>
                </div>
                
                <div className="flex justify-between text-xs">
                  <span className="text-text-secondary">Memory Usage:</span>
                  <span className="font-mono text-foreground">{module.memoryUsage}MB</span>
                </div>

                <div className="flex justify-between text-xs">
                  <span className="text-text-secondary">Last Updated:</span>
                  <span className="text-foreground">{module.lastUpdated}</span>
                </div>
              </div>

              {module.status === 'error' && module.errorMessage &&
            <div className="mt-3 p-2 bg-error/10 border border-error/20 rounded text-xs text-error">
                  {module.errorMessage}
                </div>
            }

              <div className="mt-3 pt-3 border-t border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-xs text-text-secondary">
                    <Icon name="Activity" size={12} />
                    <span>CPU: {module.cpuUsage}%</span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-text-secondary">
                    <Icon name="Zap" size={12} />
                    <span>{module.requestsPerSecond} req/s</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {sortedAndFilteredModules?.length === 0 &&
        <div className="text-center py-8">
            <Icon name="Search" size={48} className="text-text-secondary mx-auto mb-3" />
            <p className="text-text-secondary">No modules found matching the current filters.</p>
            <Button
            variant="outline"
            size="sm"
            onClick={() => setFilterStatus('all')}
            className="mt-3">
            
              Clear Filters
            </Button>
          </div>
        }
      </div>
    </div>);

};

export default ModuleHealthGrid;