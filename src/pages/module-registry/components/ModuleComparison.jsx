import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ModuleComparison = ({ modules, selectedModules, onClose, onSelectModule }) => {
  const [comparisonMetrics] = useState([
  { key: 'version', label: 'Version', type: 'text' },
  { key: 'bundleSize', label: 'Bundle Size', type: 'size' },
  { key: 'loadTime', label: 'Load Time', type: 'time' },
  { key: 'uptime', label: 'Uptime', type: 'percentage' },
  { key: 'successRate', label: 'Success Rate', type: 'percentage' },
  { key: 'errorRate', label: 'Error Rate', type: 'percentage' },
  { key: 'memoryUsage', label: 'Memory Usage', type: 'size' },
  { key: 'dependencies', label: 'Dependencies', type: 'number' },
  { key: 'lastUpdated', label: 'Last Updated', type: 'date' }]
  );

  const getComparisonValue = (module, metric) => {
    const value = module[metric?.key];
    switch (metric?.type) {
      case 'percentage':
        return `${value}%`;
      case 'time':
        return `${value}ms`;
      case 'size':
        return value;
      case 'date':
        return new Date(value)?.toLocaleDateString();
      default:
        return value;
    }
  };

  const getBestValue = (metric) => {
    if (!selectedModules?.length) return null;

    const values = selectedModules?.map((module) => module[metric?.key]);

    switch (metric?.key) {
      case 'loadTime':case 'errorRate':
        return Math.min(...values);
      case 'uptime':case 'successRate':
        return Math.max(...values);
      case 'bundleSize':
        return Math.min(...values?.map((v) => parseFloat(v)));
      default:
        return null;
    }
  };

  const isBestValue = (module, metric) => {
    const bestValue = getBestValue(metric);
    if (bestValue === null) return false;

    const moduleValue = module[metric?.key];

    switch (metric?.key) {
      case 'bundleSize':
        return parseFloat(moduleValue) === bestValue;
      default:
        return moduleValue === bestValue;
    }
  };

  if (selectedModules?.length === 0) {
    return (
      <div className="brand-card p-8 text-center">
        <Icon name="BarChart3" size={48} className="text-text-secondary mx-auto mb-4" />
        <h3 className="font-inter font-semibold text-lg text-foreground mb-2">
          Module Comparison
        </h3>
        <p className="text-text-secondary mb-4">
          Select 2-4 modules to compare their features and performance metrics
        </p>
        <Button variant="outline" onClick={onClose}>
          Close Comparison
        </Button>
      </div>);

  }

  return (
    <div className="brand-card overflow-hidden">
      {}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="BarChart3" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-inter font-semibold text-lg text-foreground">
              Module Comparison
            </h3>
            <p className="text-sm text-text-secondary">
              Comparing {selectedModules?.length} modules
            </p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <Icon name="X" size={20} />
        </Button>
      </div>
      {}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4 font-medium text-foreground w-48">
                Metric
              </th>
              {selectedModules?.map((module) =>
              <th key={module.id} className="text-center p-4 min-w-48">
                  <div className="flex flex-col items-center space-y-2">
                    <Image
                    src={module.icon}
                    alt={`${module.name} icon`}
                    className="w-10 h-10 rounded-lg object-cover" />
                  
                    <div>
                      <div className="font-medium text-foreground">{module.name}</div>
                      <div className="text-xs text-text-secondary">{module.category}</div>
                    </div>
                    <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onSelectModule(module.id)}
                    iconName="X"
                    className="text-text-secondary hover:text-error" />
                  
                  </div>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {comparisonMetrics?.map((metric, index) =>
            <tr key={metric?.key} className={index % 2 === 0 ? 'bg-muted/30' : ''}>
                <td className="p-4 font-medium text-foreground">
                  {metric?.label}
                </td>
                {selectedModules?.map((module) =>
              <td key={module.id} className="p-4 text-center">
                    <div className={`inline-flex items-center px-2 py-1 rounded-md ${
                isBestValue(module, metric) ?
                'bg-success/10 text-success border border-success/20' : 'text-foreground'}`
                }>
                      {isBestValue(module, metric) &&
                  <Icon name="Crown" size={14} className="mr-1" />
                  }
                      <span className="font-mono text-sm">
                        {getComparisonValue(module, metric)}
                      </span>
                    </div>
                  </td>
              )}
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {}
      <div className="p-6 border-t border-border bg-muted/30">
        <h4 className="font-medium text-foreground mb-3">Comparison Summary</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <Icon name="Zap" size={16} className="text-success" />
            <span className="text-sm text-foreground">
              Fastest Load: {selectedModules?.find((m) => m?.loadTime === Math.min(...selectedModules?.map((mod) => mod?.loadTime)))?.name}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={16} className="text-primary" />
            <span className="text-sm text-foreground">
              Highest Uptime: {selectedModules?.find((m) => m?.uptime === Math.max(...selectedModules?.map((mod) => mod?.uptime)))?.name}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Package" size={16} className="text-accent" />
            <span className="text-sm text-foreground">
              Smallest Bundle: {selectedModules?.find((m) => parseFloat(m?.bundleSize) === Math.min(...selectedModules?.map((mod) => parseFloat(mod?.bundleSize))))?.name}
            </span>
          </div>
        </div>
      </div>
      {}
      <div className="flex items-center justify-between p-6 border-t border-border">
        <div className="text-sm text-text-secondary">
          Select up to 4 modules for comparison
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={onClose}>
            Close Comparison
          </Button>
          <Button
            variant="default"
            iconName="Download"
            iconPosition="left">
            
            Export Report
          </Button>
        </div>
      </div>
    </div>);

};

export default ModuleComparison;