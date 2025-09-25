import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ModuleDependencyGraph = ({ onNodeClick }) => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [viewMode, setViewMode] = useState('dependency');

  const modules = [
  {
    id: 'host-shell',
    name: 'Host Shell',
    type: 'core',
    position: { x: 400, y: 50 },
    status: 'healthy',
    connections: ['auth-portal', 'module-registry', 'config-center']
  },
  {
    id: 'auth-portal',
    name: 'Auth Portal',
    type: 'service',
    position: { x: 200, y: 150 },
    status: 'healthy',
    connections: ['booking-interface', 'analytics-dashboard']
  },
  {
    id: 'module-registry',
    name: 'Module Registry',
    type: 'service',
    position: { x: 400, y: 150 },
    status: 'healthy',
    connections: ['config-center']
  },
  {
    id: 'config-center',
    name: 'Config Center',
    type: 'service',
    position: { x: 600, y: 150 },
    status: 'warning',
    connections: ['booking-interface', 'analytics-dashboard']
  },
  {
    id: 'booking-interface',
    name: 'Booking Interface',
    type: 'application',
    position: { x: 300, y: 250 },
    status: 'healthy',
    connections: ['analytics-dashboard']
  },
  {
    id: 'analytics-dashboard',
    name: 'Analytics Dashboard',
    type: 'application',
    position: { x: 500, y: 250 },
    status: 'healthy',
    connections: []
  }];


  const getNodeColor = (type, status) => {
    const baseColors = {
      core: 'from-primary to-accent',
      service: 'from-brand-secondary to-success',
      application: 'from-conversion-accent to-warning'
    };

    if (status === 'error') return 'from-error to-error/80';
    if (status === 'warning') return 'from-warning to-warning/80';

    return baseColors?.[type] || 'from-text-secondary to-muted';
  };

  const getConnectionPath = (from, to) => {
    const fromModule = modules?.find((m) => m?.id === from);
    const toModule = modules?.find((m) => m?.id === to);

    if (!fromModule || !toModule) return '';

    const x1 = fromModule?.position?.x + 50;
    const y1 = fromModule?.position?.y + 25;
    const x2 = toModule?.position?.x + 50;
    const y2 = toModule?.position?.y + 25;


    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    const controlX = midX + (y2 - y1) * 0.2;
    const controlY = midY - (x2 - x1) * 0.2;

    return `M ${x1} ${y1} Q ${controlX} ${controlY} ${x2} ${y2}`;
  };

  const handleNodeClick = (module) => {
    setSelectedNode(module.id === selectedNode ? null : module.id);
    onNodeClick && onNodeClick(module);
  };

  const getModuleDetails = (moduleId) => {
    const details = {
      'host-shell': { version: '2.1.0', size: '45KB', loadTime: '120ms' },
      'auth-portal': { version: '1.8.3', size: '78KB', loadTime: '156ms' },
      'module-registry': { version: '1.5.2', size: '34KB', loadTime: '89ms' },
      'config-center': { version: '1.9.1', size: '52KB', loadTime: '67ms' },
      'booking-interface': { version: '2.3.0', size: '125KB', loadTime: '234ms' },
      'analytics-dashboard': { version: '1.7.4', size: '98KB', loadTime: '312ms' }
    };
    return details?.[moduleId] || { version: '1.0.0', size: '0KB', loadTime: '0ms' };
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-brand-primary to-primary rounded-lg flex items-center justify-center">
            <Icon name="GitBranch" size={16} className="text-white" />
          </div>
          <div>
            <h3 className="font-inter font-semibold text-foreground">Module Dependency Graph</h3>
            <p className="text-sm text-text-secondary">Interactive system architecture visualization</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex bg-muted rounded-lg p-1">
            {[
            { mode: 'dependency', label: 'Dependencies', icon: 'GitBranch' },
            { mode: 'communication', label: 'Communication', icon: 'MessageSquare' },
            { mode: 'performance', label: 'Performance', icon: 'Zap' }]?.
            map((option) =>
            <button
              key={option?.mode}
              onClick={() => setViewMode(option?.mode)}
              className={`flex items-center space-x-1 px-3 py-1 rounded-md text-xs font-medium transition-all duration-brand ${
              viewMode === option?.mode ?
              'bg-primary text-primary-foreground' :
              'text-text-secondary hover:text-foreground'}`
              }>
              
                <Icon name={option?.icon} size={12} />
                <span>{option?.label}</span>
              </button>
            )}
          </div>
          
          <Button variant="outline" size="sm" iconName="Maximize2" iconPosition="left">
            Fullscreen
          </Button>
        </div>
      </div>
      <div className="relative">
        {}
        <div className="relative bg-background-canvas rounded-lg border border-border p-8 min-h-[400px] overflow-hidden">
          {}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            {modules?.map((module) =>
            module.connections?.map((connectionId) =>
            <path
              key={`${module.id}-${connectionId}`}
              d={getConnectionPath(module.id, connectionId)}
              stroke="var(--color-border)"
              strokeWidth="2"
              fill="none"
              strokeDasharray={viewMode === 'communication' ? '5,5' : 'none'}
              className={`transition-all duration-brand ${
              selectedNode && (selectedNode === module.id || selectedNode === connectionId) ?
              'stroke-primary stroke-[3px]' :
              ''} ${
              viewMode === 'communication' ? 'module-connection-line' : ''}`} />

            )
            )}
          </svg>

          {}
          {modules?.map((module) => {
            const details = getModuleDetails(module.id);
            const isSelected = selectedNode === module.id;

            return (
              <div
                key={module.id}
                className={`absolute cursor-pointer transition-all duration-brand ${
                isSelected ? 'scale-110 z-20' : 'z-10'}`
                }
                style={{
                  left: `${module.position?.x}px`,
                  top: `${module.position?.y}px`,
                  transform: isSelected ? 'scale(1.1)' : 'scale(1)'
                }}
                onClick={() => handleNodeClick(module)}>
                
                <div className={`relative w-24 h-12 bg-gradient-to-r ${getNodeColor(module.type, module.status)} rounded-lg shadow-brand-md hover:shadow-brand-lg transition-all duration-brand`}>
                  <div className="absolute inset-0 bg-white/10 rounded-lg"></div>
                  <div className="relative p-2 text-center">
                    <div className="text-xs font-semibold text-white truncate">{module.name}</div>
                    <div className="text-xs text-white/80">{module.type}</div>
                  </div>
                  
                  {}
                  <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                  module.status === 'healthy' ? 'bg-success' :
                  module.status === 'warning' ? 'bg-warning' :
                  module.status === 'error' ? 'bg-error' : 'bg-text-secondary'} ${
                  module.status === 'healthy' ? 'animate-pulse-subtle' : ''}`}></div>
                </div>
                {}
                {isSelected &&
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-popover border border-border rounded-lg shadow-brand-lg p-3 min-w-[200px] z-30">
                    <div className="text-sm font-medium text-foreground mb-2">{module.name}</div>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Version:</span>
                        <span className="font-mono text-foreground">{details?.version}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Bundle Size:</span>
                        <span className="font-mono text-foreground">{details?.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Load Time:</span>
                        <span className="font-mono text-foreground">{details?.loadTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Status:</span>
                        <span className={`font-medium capitalize ${
                      module.status === 'healthy' ? 'text-success' :
                      module.status === 'warning' ? 'text-warning' :
                      module.status === 'error' ? 'text-error' : 'text-text-secondary'}`
                      }>{module.status}</span>
                      </div>
                    </div>
                  </div>
                }
              </div>);

          })}
        </div>

        {}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-2 bg-gradient-to-r from-primary to-accent rounded"></div>
              <span className="text-xs text-text-secondary">Core Module</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-2 bg-gradient-to-r from-brand-secondary to-success rounded"></div>
              <span className="text-xs text-text-secondary">Service Module</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-2 bg-gradient-to-r from-conversion-accent to-warning rounded"></div>
              <span className="text-xs text-text-secondary">Application Module</span>
            </div>
          </div>
          
          <div className="text-xs text-text-secondary">
            Click nodes to view details • {modules?.length} modules loaded
          </div>
        </div>
      </div>
    </div>);

};

export default ModuleDependencyGraph;