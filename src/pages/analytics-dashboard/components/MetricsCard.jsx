import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ title, value, change, changeType, icon, description, trend }) => {
  const getChangeColor = (type) => {
    switch (type) {
      case 'positive':
        return 'text-success';
      case 'negative':
        return 'text-error';
      case 'neutral':
        return 'text-text-secondary';
      default:
        return 'text-text-secondary';
    }
  };

  const getChangeIcon = (type) => {
    switch (type) {
      case 'positive':
        return 'TrendingUp';
      case 'negative':
        return 'TrendingDown';
      case 'neutral':
        return 'Minus';
      default:
        return 'Minus';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-brand-sm hover:shadow-brand-md transition-all duration-brand">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon name={icon} size={20} className="text-primary" />
            </div>
            <h3 className="font-inter font-semibold text-sm text-text-secondary uppercase tracking-wide">
              {title}
            </h3>
          </div>
          
          <div className="mb-3">
            <div className="text-3xl font-inter font-bold text-foreground mb-1">
              {value}
            </div>
            <p className="text-sm text-text-secondary">{description}</p>
          </div>

          {change &&
          <div className="flex items-center space-x-2">
              <div className={`flex items-center space-x-1 ${getChangeColor(changeType)}`}>
                <Icon name={getChangeIcon(changeType)} size={16} />
                <span className="text-sm font-medium">{change}</span>
              </div>
              <span className="text-xs text-text-secondary">vs last period</span>
            </div>
          }
        </div>

        {trend &&
        <div className="ml-4">
            <div className="w-16 h-8 bg-muted rounded flex items-center justify-center">
              <div className="text-xs text-text-secondary">📈</div>
            </div>
          </div>
        }
      </div>
    </div>);

};

export default MetricsCard;