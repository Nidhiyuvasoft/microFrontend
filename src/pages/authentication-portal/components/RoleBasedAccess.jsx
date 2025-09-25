import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const RoleBasedAccess = ({ user, onRoleChange }) => {
  const [selectedRole, setSelectedRole] = useState(user?.role);

  const roles = [
  {
    id: 'senior-developer',
    name: 'Senior React Developer',
    description: 'Experienced developers seeking to master micro-frontend architecture',
    permissions: [
    'View all modules',
    'Access development tools',
    'Download source code',
    'View technical documentation',
    'Access performance metrics',
    'Test module configurations'],

    features: [
    'Code repository access',
    'Advanced debugging tools',
    'Performance profiling',
    'Module hot-swapping',
    'Error boundary testing'],

    color: 'primary'
  },
  {
    id: 'technical-architect',
    name: 'Technical Architect',
    description: 'System designers responsible for frontend architecture decisions',
    permissions: [
    'All Senior Developer permissions',
    'Architecture documentation',
    'System design patterns',
    'Scalability analysis',
    'Security configurations',
    'Deployment strategies'],

    features: [
    'Architecture diagrams',
    'Scalability reports',
    'Security audit tools',
    'Performance benchmarks',
    'Integration patterns'],

    color: 'accent'
  },
  {
    id: 'engineering-manager',
    name: 'Engineering Manager',
    description: 'Leaders evaluating micro-frontend strategies for team scalability',
    permissions: [
    'Team management features',
    'Project planning tools',
    'Resource allocation',
    'Performance dashboards',
    'Cost analysis',
    'ROI calculations'],

    features: [
    'Team productivity metrics',
    'Resource planning',
    'Budget analysis',
    'Timeline management',
    'Risk assessment'],

    color: 'warning'
  },
  {
    id: 'enterprise-stakeholder',
    name: 'Enterprise Stakeholder',
    description: 'Business leaders understanding the value of modular frontend architecture',
    permissions: [
    'Executive dashboards',
    'Business metrics',
    'ROI analysis',
    'Strategic planning',
    'Vendor evaluation',
    'Compliance reports'],

    features: [
    'Executive summaries',
    'Business impact analysis',
    'Strategic roadmaps',
    'Compliance tracking',
    'Vendor comparisons'],

    color: 'success'
  }];


  const moduleAccess = {
    'senior-developer': {
      'main-dashboard': { access: 'full', features: ['Development mode', 'Debug tools', 'Performance metrics'] },
      'module-registry': { access: 'full', features: ['Source code', 'Hot reload', 'Testing tools'] },
      'authentication-portal': { access: 'full', features: ['Security testing', 'Token management'] },
      'booking-interface': { access: 'full', features: ['Form validation', 'State management'] },
      'analytics-dashboard': { access: 'full', features: ['Data visualization', 'Custom charts'] },
      'configuration-center': { access: 'full', features: ['Runtime config', 'Environment management'] }
    },
    'technical-architect': {
      'main-dashboard': { access: 'full', features: ['Architecture view', 'System health', 'Scalability metrics'] },
      'module-registry': { access: 'full', features: ['Dependency analysis', 'Bundle optimization'] },
      'authentication-portal': { access: 'full', features: ['Security architecture', 'SSO integration'] },
      'booking-interface': { access: 'full', features: ['System integration', 'API design'] },
      'analytics-dashboard': { access: 'full', features: ['Performance analysis', 'System metrics'] },
      'configuration-center': { access: 'full', features: ['Infrastructure config', 'Deployment automation'] }
    },
    'engineering-manager': {
      'main-dashboard': { access: 'full', features: ['Team metrics', 'Project status', 'Resource utilization'] },
      'module-registry': { access: 'limited', features: ['Team assignments', 'Progress tracking'] },
      'authentication-portal': { access: 'limited', features: ['User management', 'Access control'] },
      'booking-interface': { access: 'full', features: ['Business logic', 'User experience'] },
      'analytics-dashboard': { access: 'full', features: ['Business metrics', 'Team performance'] },
      'configuration-center': { access: 'limited', features: ['Environment overview', 'Deployment status'] }
    },
    'enterprise-stakeholder': {
      'main-dashboard': { access: 'full', features: ['Executive summary', 'Business KPIs', 'Strategic metrics'] },
      'module-registry': { access: 'view', features: ['Module overview', 'Business impact'] },
      'authentication-portal': { access: 'view', features: ['Security overview', 'Compliance status'] },
      'booking-interface': { access: 'full', features: ['Business workflows', 'User satisfaction'] },
      'analytics-dashboard': { access: 'full', features: ['Business intelligence', 'ROI analysis'] },
      'configuration-center': { access: 'view', features: ['System overview', 'Operational status'] }
    }
  };

  const currentRole = roles?.find((role) => role?.id === selectedRole?.toLowerCase()?.replace(/\s+/g, '-'));
  const currentAccess = moduleAccess?.[selectedRole?.toLowerCase()?.replace(/\s+/g, '-')] || {};

  const getAccessColor = (access) => {
    switch (access) {
      case 'full':
        return 'text-success';
      case 'limited':
        return 'text-warning';
      case 'view':
        return 'text-primary';
      default:
        return 'text-text-secondary';
    }
  };

  const getAccessIcon = (access) => {
    switch (access) {
      case 'full':
        return 'CheckCircle';
      case 'limited':
        return 'AlertCircle';
      case 'view':
        return 'Eye';
      default:
        return 'XCircle';
    }
  };

  const handleRoleSwitch = (newRole) => {
    setSelectedRole(newRole);
    onRoleChange(newRole);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground mb-2">Role-Based Access Control</h1>
        <p className="text-text-secondary">
          Experience different permission levels and feature access based on your role
        </p>
      </div>
      {}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 bg-${currentRole?.color}/10 rounded-full flex items-center justify-center`}>
              <Icon name="User" size={24} className={`text-${currentRole?.color}`} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Current Role: {user?.role}</h2>
              <p className="text-text-secondary">{currentRole?.description}</p>
            </div>
          </div>
          
          <Button
            variant="outline"
            iconName="RefreshCw"
            iconPosition="left">
            
            Switch Role
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-foreground mb-3">Permissions</h3>
            <ul className="space-y-2">
              {currentRole?.permissions?.map((permission, index) =>
              <li key={index} className="flex items-center space-x-2">
                  <Icon name="Check" size={16} className="text-success" />
                  <span className="text-sm text-foreground">{permission}</span>
                </li>
              )}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-3">Special Features</h3>
            <ul className="space-y-2">
              {currentRole?.features?.map((feature, index) =>
              <li key={index} className="flex items-center space-x-2">
                  <Icon name="Star" size={16} className="text-primary" />
                  <span className="text-sm text-foreground">{feature}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      {}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Available Roles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {roles?.map((role) =>
          <div
            key={role?.id}
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
            selectedRole === role?.name ?
            `border-${role?.color} bg-${role?.color}/5` :
            'border-border hover:border-border/80'}`
            }
            onClick={() => handleRoleSwitch(role?.name)}>
            
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-foreground">{role?.name}</h4>
                {selectedRole === role?.name &&
              <Icon name="CheckCircle" size={20} className={`text-${role?.color}`} />
              }
              </div>
              <p className="text-sm text-text-secondary mb-3">{role?.description}</p>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-text-secondary">
                  {role?.permissions?.length} permissions
                </span>
                <span className="text-xs text-text-secondary">•</span>
                <span className="text-xs text-text-secondary">
                  {role?.features?.length} special features
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      {}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Module Access Matrix</h3>
        <div className="space-y-4">
          {Object.entries(currentAccess)?.map(([module, access]) =>
          <div key={module} className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 bg-${currentRole?.color}/10 rounded-lg flex items-center justify-center`}>
                  <Icon name="Package" size={20} className={`text-${currentRole?.color}`} />
                </div>
                <div>
                  <h4 className="font-medium text-foreground capitalize">
                    {module.replace(/-/g, ' ')}
                  </h4>
                  <div className="flex items-center space-x-2 mt-1">
                    {access?.features?.map((feature, index) =>
                  <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        {feature}
                      </span>
                  )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Icon
                name={getAccessIcon(access?.access)}
                size={20}
                className={getAccessColor(access?.access)} />
              
                <span className={`font-medium capitalize ${getAccessColor(access?.access)}`}>
                  {access?.access} Access
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      {}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Access Level Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-foreground">Module</th>
                {roles?.map((role) =>
                <th key={role?.id} className="text-center py-3 px-4 font-medium text-foreground">
                    {role?.name?.split(' ')?.[0]}
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {Object.keys(moduleAccess?.['senior-developer'])?.map((module) =>
              <tr key={module} className="border-b border-border/50">
                  <td className="py-3 px-4 font-medium text-foreground capitalize">
                    {module.replace(/-/g, ' ')}
                  </td>
                  {roles?.map((role) => {
                  const access = moduleAccess?.[role?.id]?.[module]?.access || 'none';
                  return (
                    <td key={role?.id} className="text-center py-3 px-4">
                        <Icon
                        name={getAccessIcon(access)}
                        size={16}
                        className={getAccessColor(access)} />
                      
                      </td>);

                })}
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>);

};

export default RoleBasedAccess;