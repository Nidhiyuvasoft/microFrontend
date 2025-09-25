import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DeploymentSimulator = ({
  isOpen,
  onClose,
  configuration,
  onDeploy,
  environment = 'staging'
}) => {
  const [simulationStep, setSimulationStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState(null);
  const [logs, setLogs] = useState([]);

  const simulationSteps = [
  { id: 0, name: 'Validation', description: 'Validating configuration syntax and structure' },
  { id: 1, name: 'Dependencies', description: 'Checking module dependencies and compatibility' },
  { id: 2, name: 'Security', description: 'Running security scans and vulnerability checks' },
  { id: 3, name: 'Performance', description: 'Analyzing performance impact and bundle size' },
  { id: 4, name: 'Integration', description: 'Testing module integration and communication' },
  { id: 5, name: 'Deployment', description: 'Simulating deployment to target environment' }];


  const mockResults = {
    validation: { status: 'passed', issues: 0, warnings: 1 },
    dependencies: { status: 'passed', conflicts: 0, updates: 2 },
    security: { status: 'passed', vulnerabilities: 0, score: 98 },
    performance: { status: 'warning', bundleSize: '2.4MB', loadTime: '1.2s' },
    integration: { status: 'passed', tests: 24, failures: 0 },
    deployment: { status: 'passed', duration: '45s', rollback: true }
  };

  useEffect(() => {
    if (isRunning && simulationStep < simulationSteps?.length) {
      const timer = setTimeout(() => {
        const step = simulationSteps?.[simulationStep];
        const stepResult = mockResults?.[step?.name?.toLowerCase()];

        addLog(`✓ ${step?.name} completed - ${stepResult?.status}`, stepResult?.status);

        if (simulationStep === simulationSteps?.length - 1) {
          setIsRunning(false);
          setResults(mockResults);
          addLog('🎉 Simulation completed successfully', 'success');
        } else {
          setSimulationStep((prev) => prev + 1);
        }
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isRunning, simulationStep]);

  const addLog = (message, type = 'info') => {
    const timestamp = new Date()?.toLocaleTimeString();
    setLogs((prev) => [...prev, { message, type, timestamp }]);
  };

  const startSimulation = () => {
    setIsRunning(true);
    setSimulationStep(0);
    setResults(null);
    setLogs([]);
    addLog('🚀 Starting deployment simulation...', 'info');
  };

  const resetSimulation = () => {
    setIsRunning(false);
    setSimulationStep(0);
    setResults(null);
    setLogs([]);
  };

  const handleDeploy = () => {
    if (onDeploy) {
      onDeploy(configuration, environment);
    }
    onClose();
  };

  const getStepStatus = (stepIndex) => {
    if (stepIndex < simulationStep) return 'completed';
    if (stepIndex === simulationStep && isRunning) return 'running';
    return 'pending';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'passed':case 'success':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'error':case 'failed':
        return 'text-error';
      default:
        return 'text-text-secondary';
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
              <h2 className="text-xl font-semibold text-foreground">Deployment Simulator</h2>
              <p className="text-sm text-text-secondary">Environment: {environment}</p>
            </div>
          </div>
          
          <Button variant="ghost" size="sm" iconName="X" onClick={onClose} />
        </div>

        <div className="flex h-[600px]">
          {}
          <div className="w-1/3 border-r border-border p-6">
            <h3 className="font-medium text-foreground mb-4">Simulation Steps</h3>
            <div className="space-y-3">
              {simulationSteps?.map((step, index) => {
                const status = getStepStatus(index);
                return (
                  <div key={step?.id} className="flex items-start space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                    status === 'completed' ?
                    'bg-success text-white' :
                    status === 'running' ? 'bg-primary text-white animate-pulse' : 'bg-muted text-text-secondary'}`
                    }>
                      {status === 'completed' ?
                      <Icon name="Check" size={12} /> :
                      status === 'running' ?
                      <Icon name="Loader2" size={12} className="animate-spin" /> :

                      index + 1
                      }
                    </div>
                    <div className="flex-1">
                      <div className={`font-medium text-sm ${
                      status === 'completed' ? 'text-success' :
                      status === 'running' ? 'text-primary' : 'text-text-secondary'}`
                      }>
                        {step?.name}
                      </div>
                      <div className="text-xs text-text-secondary mt-1">
                        {step?.description}
                      </div>
                    </div>
                  </div>);

              })}
            </div>
          </div>

          {}
          <div className="flex-1 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-foreground">Simulation Results</h3>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="RotateCcw"
                  onClick={resetSimulation}
                  disabled={isRunning}>
                  
                  Reset
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  iconName="Play"
                  onClick={startSimulation}
                  disabled={isRunning}
                  loading={isRunning}>
                  
                  Run Simulation
                </Button>
              </div>
            </div>

            {}
            <div className="bg-background border border-border rounded-lg h-80 overflow-y-auto p-4 font-mono text-sm">
              {logs?.length === 0 ?
              <div className="text-text-secondary text-center py-8">
                  Click "Run Simulation" to start the deployment test
                </div> :

              <div className="space-y-1">
                  {logs?.map((log, index) =>
                <div key={index} className="flex items-start space-x-2">
                      <span className="text-text-secondary text-xs">{log?.timestamp}</span>
                      <span className={getStatusColor(log?.type)}>{log?.message}</span>
                    </div>
                )}
                </div>
              }
            </div>

            {}
            {results &&
            <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                <h4 className="font-medium text-foreground mb-3">Summary</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Total Issues:</span>
                      <span className="text-warning font-medium">1 warning</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Security Score:</span>
                      <span className="text-success font-medium">98/100</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Bundle Size:</span>
                      <span className="text-foreground font-medium">2.4MB</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Load Time:</span>
                      <span className="text-foreground font-medium">1.2s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Tests Passed:</span>
                      <span className="text-success font-medium">24/24</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Rollback Ready:</span>
                      <span className="text-success font-medium">Yes</span>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>

        {}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="text-sm text-text-secondary">
            Simulation results are for testing purposes only
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="default"
              iconName="Rocket"
              onClick={handleDeploy}
              disabled={!results || isRunning}>
              
              Deploy to {environment}
            </Button>
          </div>
        </div>
      </div>
    </div>);

};

export default DeploymentSimulator;