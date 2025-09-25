import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConfigurationEditor = ({
  configuration,
  onSave,
  onValidate,
  isReadOnly = false,
  title = "Configuration Editor"
}) => {
  const [config, setConfig] = useState('');
  const [errors, setErrors] = useState([]);
  const [isValid, setIsValid] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const [lineNumbers, setLineNumbers] = useState([]);

  useEffect(() => {
    if (configuration) {
      const formatted = JSON.stringify(configuration, null, 2);
      setConfig(formatted);
      updateLineNumbers(formatted);
    }
  }, [configuration]);

  const updateLineNumbers = (text) => {
    const lines = text?.split('\n');
    setLineNumbers(lines?.map((_, index) => index + 1));
  };

  const handleConfigChange = (e) => {
    const value = e?.target?.value;
    setConfig(value);
    setIsDirty(true);
    updateLineNumbers(value);
    validateConfiguration(value);
  };

  const validateConfiguration = (configText) => {
    try {
      JSON.parse(configText);
      setErrors([]);
      setIsValid(true);
      if (onValidate) {
        onValidate(true, []);
      }
    } catch (error) {
      const errorInfo = {
        line: getErrorLine(error?.message),
        message: error?.message,
        type: 'syntax'
      };
      setErrors([errorInfo]);
      setIsValid(false);
      if (onValidate) {
        onValidate(false, [errorInfo]);
      }
    }
  };

  const getErrorLine = (errorMessage) => {
    const match = errorMessage?.match(/line (\d+)/i);
    return match ? parseInt(match?.[1]) : 1;
  };

  const handleSave = () => {
    if (isValid && onSave) {
      try {
        const parsedConfig = JSON.parse(config);
        onSave(parsedConfig);
        setIsDirty(false);
      } catch (error) {
        console.error('Failed to save configuration:', error);
      }
    }
  };

  const formatConfiguration = () => {
    try {
      const parsed = JSON.parse(config);
      const formatted = JSON.stringify(parsed, null, 2);
      setConfig(formatted);
      updateLineNumbers(formatted);
    } catch (error) {

    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {}
      <div className="flex items-center justify-between p-4 border-b border-border bg-muted/50">
        <div className="flex items-center space-x-3">
          <Icon name="FileCode" size={20} className="text-primary" />
          <h3 className="font-semibold text-foreground">{title}</h3>
          {isDirty &&
          <div className="flex items-center space-x-1 text-warning">
              <Icon name="Circle" size={8} className="fill-current" />
              <span className="text-xs">Unsaved changes</span>
            </div>
          }
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="Wand2"
            onClick={formatConfiguration}
            disabled={!isValid}>
            
            Format
          </Button>
          
          {!isReadOnly &&
          <Button
            variant="default"
            size="sm"
            iconName="Save"
            onClick={handleSave}
            disabled={!isValid || !isDirty}>
            
              Save
            </Button>
          }
        </div>
      </div>
      {}
      <div className="relative">
        <div className="flex">
          {}
          <div className="bg-muted/30 px-3 py-4 text-xs font-mono text-text-secondary border-r border-border min-w-[60px]">
            {lineNumbers?.map((num) =>
            <div key={num} className="leading-6 text-right">
                {num}
              </div>
            )}
          </div>

          {}
          <div className="flex-1 relative">
            <textarea
              value={config}
              onChange={handleConfigChange}
              readOnly={isReadOnly}
              className={`w-full h-96 p-4 font-mono text-sm bg-background text-foreground resize-none border-none outline-none leading-6 ${
              isReadOnly ? 'cursor-not-allowed opacity-75' : ''}`
              }
              placeholder="Enter JSON configuration..."
              spellCheck={false} />
            
            
            {}
            <div className="absolute top-2 right-2">
              {isValid ?
              <div className="flex items-center space-x-1 text-success bg-success/10 px-2 py-1 rounded text-xs">
                  <Icon name="CheckCircle" size={14} />
                  <span>Valid JSON</span>
                </div> :

              <div className="flex items-center space-x-1 text-error bg-error/10 px-2 py-1 rounded text-xs">
                  <Icon name="XCircle" size={14} />
                  <span>Invalid JSON</span>
                </div>
              }
            </div>
          </div>
        </div>

        {}
        {errors?.length > 0 &&
        <div className="border-t border-border bg-error/5 p-4">
            <div className="space-y-2">
              {errors?.map((error, index) =>
            <div key={index} className="flex items-start space-x-2 text-sm">
                  <Icon name="AlertCircle" size={16} className="text-error mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-error font-medium">Line {error?.line}: </span>
                    <span className="text-foreground">{error?.message}</span>
                  </div>
                </div>
            )}
            </div>
          </div>
        }
      </div>
      {}
      <div className="flex items-center justify-between p-3 border-t border-border bg-muted/30 text-xs text-text-secondary">
        <div className="flex items-center space-x-4">
          <span>Lines: {lineNumbers?.length}</span>
          <span>Characters: {config?.length}</span>
          <span>Size: {(new Blob([config])?.size / 1024)?.toFixed(2)} KB</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <span>JSON</span>
          <Icon name="FileCode" size={14} />
        </div>
      </div>
    </div>);

};

export default ConfigurationEditor;