import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConfigurationHistory = ({
  history = [],
  onRestore,
  onCompare,
  onViewDetails,
  className = ''
}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [viewMode, setViewMode] = useState('list');

  const mockHistory = [
  {
    id: 'config-001',
    version: '1.2.3',
    timestamp: '2024-09-24T10:30:00Z',
    author: 'Sarah Chen',
    environment: 'production',
    type: 'deployment',
    status: 'success',
    changes: [
    'Updated module-auth remote URL',
    'Increased timeout configuration',
    'Added new environment variables'],

    rollbackAvailable: true,
    size: '2.4KB'
  },
  {
    id: 'config-002',
    version: '1.2.2',
    timestamp: '2024-09-24T09:15:00Z',
    author: 'Mike Rodriguez',
    environment: 'staging',
    type: 'configuration',
    status: 'success',
    changes: [
    'Modified booking module settings',
    'Updated API endpoints'],

    rollbackAvailable: true,
    size: '2.1KB'
  },
  {
    id: 'config-003',
    version: '1.2.1',
    timestamp: '2024-09-24T08:45:00Z',
    author: 'Alex Thompson',
    environment: 'development',
    type: 'hotfix',
    status: 'failed',
    changes: [
    'Emergency security patch',
    'Fixed authentication module'],

    rollbackAvailable: false,
    size: '1.9KB'
  },
  {
    id: 'config-004',
    version: '1.2.0',
    timestamp: '2024-09-23T16:20:00Z',
    author: 'Sarah Chen',
    environment: 'production',
    type: 'release',
    status: 'success',
    changes: [
    'Major version update',
    'New analytics module integration',
    'Performance optimizations'],

    rollbackAvailable: true,
    size: '3.2KB'
  }];


  const historyData = history?.length > 0 ? history : mockHistory;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      time: date?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'text-success bg-success/10 border-success/20';
      case 'failed':
        return 'text-error bg-error/10 border-error/20';
      case 'pending':
        return 'text-warning bg-warning/10 border-warning/20';
      default:
        return 'text-text-secondary bg-muted border-border';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'deployment':
        return 'Rocket';
      case 'configuration':
        return 'Settings';
      case 'hotfix':
        return 'Zap';
      case 'release':
        return 'Package';
      default:
        return 'FileText';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'deployment':
        return 'text-primary bg-primary/10';
      case 'configuration':
        return 'text-accent bg-accent/10';
      case 'hotfix':
        return 'text-warning bg-warning/10';
      case 'release':
        return 'text-success bg-success/10';
      default:
        return 'text-text-secondary bg-muted';
    }
  };

  const handleItemSelect = (itemId) => {
    setSelectedItems((prev) => {
      if (prev?.includes(itemId)) {
        return prev?.filter((id) => id !== itemId);
      } else if (prev?.length < 2) {
        return [...prev, itemId];
      } else {
        return [prev?.[1], itemId];
      }
    });
  };

  const handleCompare = () => {
    if (selectedItems?.length === 2 && onCompare) {
      onCompare(selectedItems);
    }
  };

  const TimelineView = () =>
  <div className="space-y-6">
      {historyData?.map((item, index) => {
      const formatted = formatDate(item?.timestamp);
      const isSelected = selectedItems?.includes(item?.id);

      return (
        <div key={item?.id} className="flex items-start space-x-4">
            {}
            <div className="flex flex-col items-center">
              <div className={`w-3 h-3 rounded-full border-2 ${
            item?.status === 'success' ? 'bg-success border-success' :
            item?.status === 'failed' ? 'bg-error border-error' : 'bg-warning border-warning'}`
            }></div>
              {index < historyData?.length - 1 &&
            <div className="w-0.5 h-16 bg-border mt-2"></div>
            }
            </div>
            {}
            <div className={`flex-1 bg-card border rounded-lg p-4 ${
          isSelected ? 'border-primary bg-primary/5' : 'border-border'}`
          }>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getTypeColor(item?.type)}`}>
                      <Icon name={getTypeIcon(item?.type)} size={16} />
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-foreground">Version {item?.version}</h4>
                      <div className="flex items-center space-x-2 text-sm text-text-secondary">
                        <span>{item?.author}</span>
                        <span>•</span>
                        <span>{formatted?.date} at {formatted?.time}</span>
                        <span>•</span>
                        <span className="capitalize">{item?.environment}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1 mb-3">
                    {item?.changes?.map((change, changeIndex) =>
                  <div key={changeIndex} className="flex items-center space-x-2 text-sm">
                        <Icon name="GitCommit" size={12} className="text-text-secondary" />
                        <span className="text-foreground">{change}</span>
                      </div>
                  )}
                  </div>

                  <div className="flex items-center space-x-4 text-xs text-text-secondary">
                    <div className={`px-2 py-1 rounded-full border ${getStatusColor(item?.status)}`}>
                      {item?.status}
                    </div>
                    <span>Size: {item?.size}</span>
                    {item?.rollbackAvailable &&
                  <span className="text-success">Rollback available</span>
                  }
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleItemSelect(item?.id)}
                  className="rounded border-border" />
                
                  
                  <Button
                  variant="ghost"
                  size="sm"
                  iconName="Eye"
                  onClick={() => onViewDetails(item)} />
                
                  
                  {item?.rollbackAvailable &&
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="RotateCcw"
                  onClick={() => onRestore(item)} />

                }
                </div>
              </div>
            </div>
          </div>);

    })}
    </div>;


  const ListView = () =>
  <div className="space-y-2">
      {historyData?.map((item) => {
      const formatted = formatDate(item?.timestamp);
      const isSelected = selectedItems?.includes(item?.id);

      return (
        <div
          key={item?.id}
          className={`flex items-center space-x-4 p-4 bg-card border rounded-lg hover:bg-muted/30 transition-all duration-brand ${
          isSelected ? 'border-primary bg-primary/5' : 'border-border'}`
          }>
          
            <input
            type="checkbox"
            checked={isSelected}
            onChange={() => handleItemSelect(item?.id)}
            className="rounded border-border" />
          
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getTypeColor(item?.type)}`}>
              <Icon name={getTypeIcon(item?.type)} size={16} />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <span className="font-medium text-foreground">v{item?.version}</span>
                <div className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(item?.status)}`}>
                  {item?.status}
                </div>
                <span className="text-sm text-text-secondary capitalize">{item?.environment}</span>
              </div>
              <div className="text-sm text-text-secondary mt-1">
                {item?.author} • {formatted?.date} at {formatted?.time} • {item?.size}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
              variant="ghost"
              size="sm"
              iconName="Eye"
              onClick={() => onViewDetails(item)} />
            
              
              {item?.rollbackAvailable &&
            <Button
              variant="ghost"
              size="sm"
              iconName="RotateCcw"
              onClick={() => onRestore(item)} />

            }
            </div>
          </div>);

    })}
    </div>;


  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      {}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="History" size={20} className="text-primary" />
          <h3 className="font-semibold text-foreground">Configuration History</h3>
          {selectedItems?.length > 0 &&
          <span className="text-sm text-text-secondary">
              ({selectedItems?.length} selected)
            </span>
          }
        </div>

        <div className="flex items-center space-x-2">
          {selectedItems?.length === 2 &&
          <Button
            variant="outline"
            size="sm"
            iconName="GitCompare"
            onClick={handleCompare}>
            
              Compare
            </Button>
          }
          
          <div className="flex items-center bg-muted rounded-lg p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 rounded text-sm transition-all duration-brand ${
              viewMode === 'list' ? 'bg-background text-foreground shadow-sm' : 'text-text-secondary'}`
              }>
              
              <Icon name="List" size={16} />
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-3 py-1 rounded text-sm transition-all duration-brand ${
              viewMode === 'timeline' ? 'bg-background text-foreground shadow-sm' : 'text-text-secondary'}`
              }>
              
              <Icon name="GitBranch" size={16} />
            </button>
          </div>
        </div>
      </div>
      {}
      <div className="p-4">
        {viewMode === 'timeline' ? <TimelineView /> : <ListView />}
      </div>
    </div>);

};

export default ConfigurationHistory;