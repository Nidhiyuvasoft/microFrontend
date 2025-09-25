import React from 'react';
import Icon from '../../../components/AppIcon';

const ModuleStats = ({ modules }) => {
  const totalModules = modules?.length;
  const healthyModules = modules?.filter((m) => m?.status === 'healthy')?.length;
  const warningModules = modules?.filter((m) => m?.status === 'warning')?.length;
  const errorModules = modules?.filter((m) => m?.status === 'error')?.length;
  const inactiveModules = modules?.filter((m) => m?.status === 'inactive')?.length;

  const averageUptime = modules?.reduce((acc, module) => acc + module.uptime, 0) / totalModules;
  const averageLoadTime = modules?.reduce((acc, module) => acc + module.loadTime, 0) / totalModules;

  const stats = [
  {
    label: 'Total Modules',
    value: totalModules,
    icon: 'Package',
    color: 'text-foreground',
    bgColor: 'bg-muted'
  },
  {
    label: 'Healthy',
    value: healthyModules,
    icon: 'CheckCircle',
    color: 'text-success',
    bgColor: 'bg-success/10'
  },
  {
    label: 'Warning',
    value: warningModules,
    icon: 'AlertTriangle',
    color: 'text-warning',
    bgColor: 'bg-warning/10'
  },
  {
    label: 'Error',
    value: errorModules,
    icon: 'XCircle',
    color: 'text-error',
    bgColor: 'bg-error/10'
  },
  {
    label: 'Inactive',
    value: inactiveModules,
    icon: 'Pause',
    color: 'text-text-secondary',
    bgColor: 'bg-muted'
  },
  {
    label: 'Avg Uptime',
    value: `${averageUptime?.toFixed(1)}%`,
    icon: 'TrendingUp',
    color: 'text-accent',
    bgColor: 'bg-accent/10'
  },
  {
    label: 'Avg Load Time',
    value: `${averageLoadTime?.toFixed(0)}ms`,
    icon: 'Zap',
    color: 'text-primary',
    bgColor: 'bg-primary/10'
  }];


  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
      {stats?.map((stat, index) =>
      <div
        key={index}
        className="brand-card p-4 text-center hover:shadow-brand-md transition-all duration-brand">
        
          <div className={`w-12 h-12 ${stat?.bgColor} rounded-lg flex items-center justify-center mx-auto mb-3`}>
            <Icon name={stat?.icon} size={20} className={stat?.color} />
          </div>
          <div className="text-lg font-bold text-foreground mb-1">{stat?.value}</div>
          <div className="text-xs text-text-secondary">{stat?.label}</div>
        </div>
      )}
    </div>);

};

export default ModuleStats;