import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkOperations = ({ selectedModules, onBulkAction, onClearSelection }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(null);

  const bulkActions = [
  {
    id: 'enable',
    label: 'Enable Selected',
    icon: 'Play',
    variant: 'default',
    description: 'Enable all selected modules'
  },
  {
    id: 'disable',
    label: 'Disable Selected',
    icon: 'Pause',
    variant: 'outline',
    description: 'Disable all selected modules'
  },
  {
    id: 'update',
    label: 'Update All',
    icon: 'RefreshCw',
    variant: 'outline',
    description: 'Update selected modules to latest version'
  },
  {
    id: 'restart',
    label: 'Restart Selected',
    icon: 'RotateCcw',
    variant: 'outline',
    description: 'Restart all selected modules'
  },
  {
    id: 'configure',
    label: 'Bulk Configure',
    icon: 'Settings',
    variant: 'outline',
    description: 'Apply configuration to selected modules'
  },
  {
    id: 'export',
    label: 'Export Config',
    icon: 'Download',
    variant: 'ghost',
    description: 'Export configuration of selected modules'
  }];


  const handleBulkAction = async (actionId) => {
    if (['disable', 'restart']?.includes(actionId)) {
      setShowConfirmation(actionId);
      return;
    }

    setIsProcessing(true);


    await new Promise((resolve) => setTimeout(resolve, 2000));

    onBulkAction(actionId, selectedModules);
    setIsProcessing(false);
  };

  const confirmAction = async () => {
    setIsProcessing(true);


    await new Promise((resolve) => setTimeout(resolve, 2000));

    onBulkAction(showConfirmation, selectedModules);
    setShowConfirmation(null);
    setIsProcessing(false);
  };

  if (selectedModules?.length === 0) {
    return null;
  }

  return (
    <>
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
        <div className="bg-card border border-border rounded-lg shadow-brand-xl p-4 min-w-96">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="CheckSquare" size={16} className="text-primary" />
              </div>
              <div>
                <div className="font-medium text-foreground">
                  {selectedModules?.length} module{selectedModules?.length > 1 ? 's' : ''} selected
                </div>
                <div className="text-xs text-text-secondary">
                  Choose a bulk operation to apply
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearSelection}
              iconName="X"
              className="text-text-secondary hover:text-foreground" />
            
          </div>

          <div className="grid grid-cols-2 gap-2">
            {bulkActions?.map((action) =>
            <Button
              key={action?.id}
              variant={action?.variant}
              size="sm"
              onClick={() => handleBulkAction(action?.id)}
              disabled={isProcessing}
              loading={isProcessing}
              iconName={action?.icon}
              iconPosition="left"
              className="justify-start"
              title={action?.description}>
              
                {action?.label}
              </Button>
            )}
          </div>

          {}
          <div className="mt-4 pt-4 border-t border-border">
            <div className="text-xs text-text-secondary mb-2">Selected Modules:</div>
            <div className="flex flex-wrap gap-1">
              {selectedModules?.slice(0, 5)?.map((module) =>
              <span
                key={module.id}
                className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-md">
                
                  {module.name}
                </span>
              )}
              {selectedModules?.length > 5 &&
              <span className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-md">
                  +{selectedModules?.length - 5} more
                </span>
              }
            </div>
          </div>
        </div>
      </div>
      {}
      {showConfirmation &&
      <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg shadow-brand-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Icon name="AlertTriangle" size={20} className="text-warning" />
                </div>
                <div>
                  <h3 className="font-inter font-semibold text-lg text-foreground">
                    Confirm Bulk Action
                  </h3>
                  <p className="text-sm text-text-secondary">
                    This action cannot be undone
                  </p>
                </div>
              </div>

              <p className="text-sm text-foreground mb-6">
                Are you sure you want to {showConfirmation} {selectedModules?.length} module{selectedModules?.length > 1 ? 's' : ''}? 
                This will affect the following modules:
              </p>

              <div className="bg-muted rounded-lg p-3 mb-6 max-h-32 overflow-y-auto">
                {selectedModules?.map((module) =>
              <div key={module.id} className="flex items-center space-x-2 py-1">
                    <Icon name="Package" size={14} className="text-text-secondary" />
                    <span className="text-sm text-foreground">{module.name}</span>
                  </div>
              )}
              </div>

              <div className="flex items-center justify-end space-x-2">
                <Button
                variant="outline"
                onClick={() => setShowConfirmation(null)}
                disabled={isProcessing}>
                
                  Cancel
                </Button>
                <Button
                variant="destructive"
                onClick={confirmAction}
                loading={isProcessing}
                iconName={showConfirmation === 'disable' ? 'Pause' : 'RotateCcw'}
                iconPosition="left">
                
                  {showConfirmation === 'disable' ? 'Disable' : 'Restart'} Modules
                </Button>
              </div>
            </div>
          </div>
        </div>
      }
    </>);

};

export default BulkOperations;