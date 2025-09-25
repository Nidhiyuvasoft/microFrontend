import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ModuleFilters = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  sortBy,
  onSortChange,
  onClearFilters
}) => {
  const categories = [
  { value: 'all', label: 'All Categories', count: 12 },
  { value: 'authentication', label: 'Authentication', count: 3 },
  { value: 'booking', label: 'Booking & Scheduling', count: 2 },
  { value: 'analytics', label: 'Analytics & Reporting', count: 2 },
  { value: 'communication', label: 'Communication', count: 2 },
  { value: 'configuration', label: 'Configuration', count: 1 },
  { value: 'utilities', label: 'Utilities', count: 2 }];


  const statusFilters = [
  { value: 'all', label: 'All Status', icon: 'Circle' },
  { value: 'healthy', label: 'Healthy', icon: 'CheckCircle' },
  { value: 'warning', label: 'Warning', icon: 'AlertTriangle' },
  { value: 'error', label: 'Error', icon: 'XCircle' },
  { value: 'inactive', label: 'Inactive', icon: 'Pause' }];


  const sortOptions = [
  { value: 'name', label: 'Name A-Z' },
  { value: 'status', label: 'Status' },
  { value: 'uptime', label: 'Uptime' },
  { value: 'loadTime', label: 'Load Time' },
  { value: 'lastUpdated', label: 'Last Updated' }];


  const hasActiveFilters = searchTerm || selectedCategory !== 'all' || selectedStatus !== 'all' || sortBy !== 'name';

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      {}
      <div className="mb-6">
        <Input
          type="search"
          placeholder="Search modules by name, description, or category..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e?.target?.value)}
          className="w-full" />
        
      </div>
      {}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {}
        <div>
          <h3 className="font-medium text-sm text-foreground mb-3">Category</h3>
          <div className="space-y-2">
            {categories?.map((category) =>
            <button
              key={category?.value}
              onClick={() => onCategoryChange(category?.value)}
              className={`flex items-center justify-between w-full px-3 py-2 rounded-md text-sm transition-all duration-brand ${
              selectedCategory === category?.value ?
              'bg-primary text-primary-foreground' :
              'text-text-secondary hover:text-foreground hover:bg-muted'}`
              }>
              
                <span>{category?.label}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
              selectedCategory === category?.value ?
              'bg-primary-foreground/20 text-primary-foreground' :
              'bg-muted text-text-secondary'}`
              }>
                  {category?.count}
                </span>
              </button>
            )}
          </div>
        </div>

        {}
        <div>
          <h3 className="font-medium text-sm text-foreground mb-3">Status</h3>
          <div className="space-y-2">
            {statusFilters?.map((status) =>
            <button
              key={status?.value}
              onClick={() => onStatusChange(status?.value)}
              className={`flex items-center w-full px-3 py-2 rounded-md text-sm transition-all duration-brand ${
              selectedStatus === status?.value ?
              'bg-primary text-primary-foreground' :
              'text-text-secondary hover:text-foreground hover:bg-muted'}`
              }>
              
                <Icon name={status?.icon} size={16} className="mr-2" />
                <span>{status?.label}</span>
              </button>
            )}
          </div>
        </div>

        {}
        <div>
          <h3 className="font-medium text-sm text-foreground mb-3">Sort By</h3>
          <div className="space-y-2">
            {sortOptions?.map((option) =>
            <button
              key={option?.value}
              onClick={() => onSortChange(option?.value)}
              className={`flex items-center justify-between w-full px-3 py-2 rounded-md text-sm transition-all duration-brand ${
              sortBy === option?.value ?
              'bg-primary text-primary-foreground' :
              'text-text-secondary hover:text-foreground hover:bg-muted'}`
              }>
              
                <span>{option?.label}</span>
                {sortBy === option?.value &&
              <Icon name="Check" size={16} />
              }
              </button>
            )}
          </div>
        </div>
      </div>
      {}
      {hasActiveFilters &&
      <div className="mt-6 pt-4 border-t border-border">
          <Button
          variant="outline"
          size="sm"
          onClick={onClearFilters}
          iconName="X"
          iconPosition="left">
          
            Clear All Filters
          </Button>
        </div>
      }
    </div>);

};

export default ModuleFilters;