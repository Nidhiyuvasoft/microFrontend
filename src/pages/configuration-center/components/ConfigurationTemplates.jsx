import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConfigurationTemplates = ({
  onApplyTemplate,
  onCreateTemplate,
  className = ''
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const templates = [
  {
    id: 'basic-setup',
    name: 'Basic Setup',
    description: 'Standard configuration for new micro-frontend modules',
    category: 'starter',
    author: 'MicroFed Team',
    downloads: 1250,
    rating: 4.8,
    tags: ['basic', 'starter', 'recommended'],
    preview: {
      modules: 3,
      environments: 2,
      features: ['Authentication', 'Routing', 'Error Handling']
    },
    config: {
      name: "basic-module",
      version: "1.0.0",
      remoteEntry: "./remoteEntry.js",
      exposes: {
        "./App": "./src/App"
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true }
      }
    }
  },
  {
    id: 'enterprise-auth',
    name: 'Enterprise Authentication',
    description: 'Complete authentication setup with SSO and role-based access',
    category: 'security',
    author: 'Security Team',
    downloads: 890,
    rating: 4.9,
    tags: ['auth', 'sso', 'rbac', 'enterprise'],
    preview: {
      modules: 5,
      environments: 3,
      features: ['SSO Integration', 'Role Management', 'Session Handling', 'MFA Support']
    },
    config: {
      name: "auth-module",
      version: "2.1.0",
      authentication: {
        provider: "okta",
        sso: true,
        mfa: true,
        sessionTimeout: 3600
      }
    }
  },
  {
    id: 'analytics-dashboard',
    name: 'Analytics Dashboard',
    description: 'Pre-configured analytics module with charts and reporting',
    category: 'analytics',
    author: 'Data Team',
    downloads: 650,
    rating: 4.7,
    tags: ['analytics', 'charts', 'reporting', 'dashboard'],
    preview: {
      modules: 4,
      environments: 2,
      features: ['Real-time Charts', 'Export Functions', 'Custom Metrics', 'Alerts']
    },
    config: {
      name: "analytics-module",
      version: "1.5.0",
      analytics: {
        provider: "custom",
        realtime: true,
        exports: ["pdf", "csv", "json"]
      }
    }
  },
  {
    id: 'booking-system',
    name: 'Booking System',
    description: 'Complete booking interface with calendar and notifications',
    category: 'business',
    author: 'Product Team',
    downloads: 420,
    rating: 4.6,
    tags: ['booking', 'calendar', 'notifications', 'business'],
    preview: {
      modules: 6,
      environments: 3,
      features: ['Calendar Integration', 'Email Notifications', 'Conflict Resolution', 'Resource Management']
    },
    config: {
      name: "booking-module",
      version: "1.3.0",
      booking: {
        calendar: "google",
        notifications: true,
        conflicts: "auto-resolve"
      }
    }
  },
  {
    id: 'development-tools',
    name: 'Development Tools',
    description: 'Development environment with debugging and testing tools',
    category: 'development',
    author: 'DevOps Team',
    downloads: 780,
    rating: 4.5,
    tags: ['development', 'debugging', 'testing', 'devtools'],
    preview: {
      modules: 2,
      environments: 1,
      features: ['Hot Reload', 'Debug Console', 'Test Runner', 'Performance Monitor']
    },
    config: {
      name: "dev-tools",
      version: "1.0.0",
      development: {
        hotReload: true,
        debugging: true,
        testing: "jest"
      }
    }
  },
  {
    id: 'production-optimized',
    name: 'Production Optimized',
    description: 'Production-ready configuration with performance optimizations',
    category: 'production',
    author: 'Platform Team',
    downloads: 1100,
    rating: 4.9,
    tags: ['production', 'performance', 'optimization', 'cdn'],
    preview: {
      modules: 8,
      environments: 4,
      features: ['CDN Integration', 'Bundle Optimization', 'Caching Strategy', 'Monitoring']
    },
    config: {
      name: "production-module",
      version: "2.0.0",
      production: {
        cdn: "cloudfront",
        optimization: true,
        monitoring: "datadog"
      }
    }
  }];


  const categories = [
  { id: 'all', name: 'All Templates', icon: 'Grid3X3' },
  { id: 'starter', name: 'Starter', icon: 'Rocket' },
  { id: 'security', name: 'Security', icon: 'Shield' },
  { id: 'analytics', name: 'Analytics', icon: 'BarChart3' },
  { id: 'business', name: 'Business', icon: 'Briefcase' },
  { id: 'development', name: 'Development', icon: 'Code' },
  { id: 'production', name: 'Production', icon: 'Server' }];


  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredTemplates = templates?.filter((template) => {
    const matchesCategory = selectedCategory === 'all' || template?.category === selectedCategory;
    const matchesSearch = template?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    template?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    template?.tags?.some((tag) => tag?.toLowerCase()?.includes(searchQuery?.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (category) => {
    const colors = {
      starter: 'text-blue-600 bg-blue-50',
      security: 'text-red-600 bg-red-50',
      analytics: 'text-purple-600 bg-purple-50',
      business: 'text-green-600 bg-green-50',
      development: 'text-orange-600 bg-orange-50',
      production: 'text-gray-600 bg-gray-50'
    };
    return colors?.[category] || 'text-gray-600 bg-gray-50';
  };

  const handleApplyTemplate = (template) => {
    if (onApplyTemplate) {
      onApplyTemplate(template);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars?.push(<Icon key={i} name="Star" size={12} className="text-yellow-500 fill-current" />);
    }

    if (hasHalfStar) {
      stars?.push(<Icon key="half" name="StarHalf" size={12} className="text-yellow-500 fill-current" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars?.push(<Icon key={`empty-${i}`} name="Star" size={12} className="text-gray-300" />);
    }

    return stars;
  };

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      {}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Template" size={20} className="text-primary" />
          <h3 className="font-semibold text-foreground">Configuration Templates</h3>
        </div>

        <Button
          variant="default"
          size="sm"
          iconName="Plus"
          onClick={() => setIsCreating(true)}>
          
          Create Template
        </Button>
      </div>
      {}
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex-1 relative">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
            
          </div>
        </div>

        {}
        <div className="flex items-center space-x-2 overflow-x-auto">
          {categories?.map((category) =>
          <button
            key={category?.id}
            onClick={() => setSelectedCategory(category?.id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-brand ${
            selectedCategory === category?.id ?
            'bg-primary text-primary-foreground' :
            'text-text-secondary hover:text-foreground hover:bg-muted'}`
            }>
            
              <Icon name={category?.icon} size={16} />
              <span>{category?.name}</span>
            </button>
          )}
        </div>
      </div>
      {}
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTemplates?.map((template) =>
          <div
            key={template?.id}
            className={`bg-background border rounded-lg p-4 hover:shadow-brand-md transition-all duration-brand cursor-pointer ${
            selectedTemplate?.id === template?.id ? 'border-primary bg-primary/5' : 'border-border'}`
            }
            onClick={() => setSelectedTemplate(template)}>
            
              {}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">{template?.name}</h4>
                  <p className="text-sm text-text-secondary line-clamp-2">{template?.description}</p>
                </div>
                
                <div className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(template?.category)}`}>
                  {template?.category}
                </div>
              </div>

              {}
              <div className="flex items-center space-x-4 mb-3 text-xs text-text-secondary">
                <div className="flex items-center space-x-1">
                  <Icon name="Download" size={12} />
                  <span>{template?.downloads?.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  {renderStars(template?.rating)}
                  <span className="ml-1">{template?.rating}</span>
                </div>
              </div>

              {}
              <div className="space-y-2 mb-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-secondary">Modules:</span>
                  <span className="font-medium text-foreground">{template?.preview?.modules}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-secondary">Environments:</span>
                  <span className="font-medium text-foreground">{template?.preview?.environments}</span>
                </div>
              </div>

              {}
              <div className="mb-3">
                <div className="text-xs text-text-secondary mb-1">Features:</div>
                <div className="flex flex-wrap gap-1">
                  {template?.preview?.features?.slice(0, 2)?.map((feature, index) =>
                <span key={index} className="px-2 py-1 bg-muted text-xs rounded">
                      {feature}
                    </span>
                )}
                  {template?.preview?.features?.length > 2 &&
                <span className="px-2 py-1 bg-muted text-xs rounded">
                      +{template?.preview?.features?.length - 2} more
                    </span>
                }
                </div>
              </div>

              {}
              <div className="flex flex-wrap gap-1 mb-3">
                {template?.tags?.slice(0, 3)?.map((tag) =>
              <span key={tag} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                    #{tag}
                  </span>
              )}
              </div>

              {}
              <div className="flex items-center space-x-2">
                <Button
                variant="outline"
                size="sm"
                fullWidth
                iconName="Eye"
                onClick={(e) => {
                  e?.stopPropagation();

                }}>
                
                  Preview
                </Button>
                
                <Button
                variant="default"
                size="sm"
                fullWidth
                iconName="Download"
                onClick={(e) => {
                  e?.stopPropagation();
                  handleApplyTemplate(template);
                }}>
                
                  Apply
                </Button>
              </div>
            </div>
          )}
        </div>

        {filteredTemplates?.length === 0 &&
        <div className="text-center py-12">
            <Icon name="Search" size={48} className="text-text-secondary mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No templates found</h3>
            <p className="text-text-secondary">Try adjusting your search or category filter</p>
          </div>
        }
      </div>
    </div>);

};

export default ConfigurationTemplates;