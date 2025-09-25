import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const PerformanceMetrics = ({ metrics }) => {
  const performanceData = [
  { name: 'Auth Portal', performance: 98, loadTime: 1.2 },
  { name: 'Booking', performance: 95, loadTime: 1.8 },
  { name: 'Analytics', performance: 92, loadTime: 2.1 },
  { name: 'Registry', performance: 97, loadTime: 1.5 },
  { name: 'Config', performance: 99, loadTime: 0.9 }];


  const memoryUsage = [
  { name: 'Used', value: 68, color: '#2563EB' },
  { name: 'Available', value: 32, color: '#E2E8F0' }];


  const networkData = [
  { time: '10:25', requests: 145, latency: 23 },
  { time: '10:26', requests: 167, latency: 28 },
  { time: '10:27', requests: 134, latency: 19 },
  { time: '10:28', requests: 189, latency: 31 },
  { time: '10:29', requests: 156, latency: 25 },
  { time: '10:30', requests: 178, latency: 27 },
  { time: '10:31', requests: 142, latency: 22 },
  { time: '10:32', requests: 163, latency: 26 }];


  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center">
            <Icon name="Activity" size={16} className="text-white" />
          </div>
          <div>
            <h3 className="font-inter font-semibold text-foreground">Performance Observatory</h3>
            <p className="text-sm text-text-secondary">Real-time system metrics</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse-subtle"></div>
          <span className="text-sm text-text-secondary">Live</span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Module Performance</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }} />
                
                <YAxis
                  tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }} />
                
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }} />
                
                <Bar dataKey="performance" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Memory Usage</h4>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={memoryUsage}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value">
                  
                  {memoryUsage?.map((entry, index) =>
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                  )}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }} />
                
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">68%</div>
            <div className="text-sm text-text-secondary">Memory Utilized</div>
          </div>
        </div>

        {}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="font-medium text-foreground">Network Activity</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={networkData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis
                  dataKey="time"
                  tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }} />
                
                <YAxis
                  tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }} />
                
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }} />
                
                <Line
                  type="monotone"
                  dataKey="requests"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }} />
                
                <Line
                  type="monotone"
                  dataKey="latency"
                  stroke="var(--color-accent)"
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 4 }} />
                
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <div className="text-2xl font-bold text-success">99.9%</div>
          <div className="text-xs text-text-secondary">System Uptime</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">1.6s</div>
          <div className="text-xs text-text-secondary">Avg Load Time</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-accent">163</div>
          <div className="text-xs text-text-secondary">Requests/min</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-warning">26ms</div>
          <div className="text-xs text-text-secondary">Avg Latency</div>
        </div>
      </div>
    </div>);

};

export default PerformanceMetrics;