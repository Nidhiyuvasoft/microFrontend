import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ModuleTestSandbox = ({ module, isOpen, onClose, onTest }) => {
  const [testConfig, setTestConfig] = useState({
    environment: 'development',
    timeout: 5000,
    retries: 3,
    mockData: true
  });
  const [testResults, setTestResults] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const environments = [
  { value: 'development', label: 'Development' },
  { value: 'staging', label: 'Staging' },
  { value: 'production', label: 'Production' }];


  const testScenarios = [
  {
    id: 'load',
    name: 'Module Loading',
    description: 'Test module initialization and loading performance',
    icon: 'Download'
  },
  {
    id: 'api',
    name: 'API Integration',
    description: 'Verify API endpoints and data communication',
    icon: 'Globe'
  },
  {
    id: 'ui',
    name: 'UI Rendering',
    description: 'Test component rendering and user interactions',
    icon: 'Monitor'
  },
  {
    id: 'error',
    name: 'Error Handling',
    description: 'Simulate errors and test fallback mechanisms',
    icon: 'AlertTriangle'
  }];


  const handleRunTest = async (scenarioId) => {
    setIsRunning(true);
    setTestResults(null);


    await new Promise((resolve) => setTimeout(resolve, 2000));

    const mockResults = {
      load: {
        status: 'passed',
        duration: 1250,
        details: 'Module loaded successfully in 1.25 seconds',
        metrics: {
          bundleSize: '245KB',
          loadTime: '1.25s',
          memoryUsage: '12MB'
        }
      },
      api: {
        status: 'passed',
        duration: 850,
        details: 'All API endpoints responding correctly',
        metrics: {
          endpoints: '8/8 passed',
          avgResponse: '85ms',
          errorRate: '0%'
        }
      },
      ui: {
        status: 'warning',
        duration: 1100,
        details: 'UI rendered with minor accessibility warnings',
        metrics: {
          components: '15/15 rendered',
          accessibility: '92%',
          performance: '95%'
        }
      },
      error: {
        status: 'passed',
        duration: 950,
        details: 'Error boundaries functioning correctly',
        metrics: {
          scenarios: '5/5 handled',
          recovery: '100%',
          fallbacks: 'Active'
        }
      }
    };

    setTestResults(mockResults?.[scenarioId]);
    setIsRunning(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'passed':
        return 'text-success bg-success/10 border-success/20';
      case 'warning':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'failed':
        return 'text-error bg-error/10 border-error/20';
      default:
        return 'text-text-secondary bg-muted border-border';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-brand-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="TestTube" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="font-inter font-semibold text-lg text-foreground">
                Module Test Sandbox
              </h2>
              <p className="text-sm text-text-secondary">Testing: {module?.name}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="flex h-[calc(90vh-80px)]">
          {}
          <div className="w-1/3 border-r border-border p-6 overflow-y-auto">
            <h3 className="font-medium text-foreground mb-4">Test Configuration</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Environment
                </label>
                <select
                  value={testConfig?.environment}
                  onChange={(e) => setTestConfig((prev) => ({ ...prev, environment: e?.target?.value }))}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground">
                  
                  {environments?.map((env) =>
                  <option key={env.value} value={env.value}>{env.label}</option>
                  )}
                </select>
              </div>

              <Input
                label="Timeout (ms)"
                type="number"
                value={testConfig?.timeout}
                onChange={(e) => setTestConfig((prev) => ({ ...prev, timeout: parseInt(e?.target?.value) }))} />
              

              <Input
                label="Retry Attempts"
                type="number"
                value={testConfig?.retries}
                onChange={(e) => setTestConfig((prev) => ({ ...prev, retries: parseInt(e?.target?.value) }))} />
              

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="mockData"
                  checked={testConfig?.mockData}
                  onChange={(e) => setTestConfig((prev) => ({ ...prev, mockData: e?.target?.checked }))}
                  className="rounded border-border" />
                
                <label htmlFor="mockData" className="text-sm text-foreground">
                  Use Mock Data
                </label>
              </div>
            </div>

            {}
            <div className="mt-8">
              <h3 className="font-medium text-foreground mb-4">Test Scenarios</h3>
              <div className="space-y-2">
                {testScenarios?.map((scenario) =>
                <div
                  key={scenario?.id}
                  className="p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Icon name={scenario?.icon} size={16} className="text-primary" />
                        <span className="font-medium text-sm text-foreground">
                          {scenario?.name}
                        </span>
                      </div>
                      <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRunTest(scenario?.id)}
                      disabled={isRunning}
                      loading={isRunning}>
                      
                        Run
                      </Button>
                    </div>
                    <p className="text-xs text-text-secondary">{scenario?.description}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {}
          <div className="flex-1 p-6 overflow-y-auto">
            <h3 className="font-medium text-foreground mb-4">Test Results</h3>
            
            {!testResults && !isRunning &&
            <div className="flex flex-col items-center justify-center h-64 text-center">
                <Icon name="TestTube" size={48} className="text-text-secondary mb-4" />
                <p className="text-text-secondary">Select a test scenario to begin testing</p>
              </div>
            }

            {isRunning &&
            <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="animate-spin mb-4">
                  <Icon name="Loader" size={32} className="text-primary" />
                </div>
                <p className="text-foreground">Running test scenario...</p>
                <p className="text-text-secondary text-sm">This may take a few moments</p>
              </div>
            }

            {testResults &&
            <div className="space-y-6">
                {}
                <div className={`p-4 rounded-lg border ${getStatusColor(testResults?.status)}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Icon
                      name={testResults?.status === 'passed' ? 'CheckCircle' :
                      testResults?.status === 'warning' ? 'AlertTriangle' : 'XCircle'}
                      size={20} />
                    
                      <span className="font-medium capitalize">{testResults?.status}</span>
                    </div>
                    <span className="text-sm font-mono">{testResults?.duration}ms</span>
                  </div>
                  <p className="text-sm">{testResults?.details}</p>
                </div>

                {}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(testResults?.metrics)?.map(([key, value]) =>
                <div key={key} className="p-3 bg-muted rounded-lg">
                      <div className="text-sm text-text-secondary capitalize">
                        {key?.replace(/([A-Z])/g, ' $1')?.trim()}
                      </div>
                      <div className="font-mono text-lg text-foreground">{value}</div>
                    </div>
                )}
                </div>

                {}
                <div>
                  <h4 className="font-medium text-foreground mb-2">Test Log</h4>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                    <div className="text-text-secondary">[{new Date()?.toISOString()}] Test started</div>
                    <div className="text-primary">[{new Date()?.toISOString()}] Loading module configuration</div>
                    <div className="text-success">[{new Date()?.toISOString()}] Module loaded successfully</div>
                    <div className="text-success">[{new Date()?.toISOString()}] Test completed: {testResults?.status}</div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>

        {}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="text-sm text-text-secondary">
            Test environment: {testConfig?.environment}
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button
              variant="default"
              onClick={() => onTest(module?.id)}
              iconName="Download"
              iconPosition="left">
              
              Export Results
            </Button>
          </div>
        </div>
      </div>
    </div>);

};

export default ModuleTestSandbox;