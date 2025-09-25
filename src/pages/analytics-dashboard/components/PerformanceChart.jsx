import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import Icon from '../../../components/AppIcon';


const PerformanceChart = ({ title, data, metrics, timeRange, onTimeRangeChange }) => {
  const [chartType, setChartType] = useState('line');
  const [selectedMetrics, setSelectedMetrics] = useState(metrics?.slice(0, 3));

  const colors = ['#2563EB', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

  const timeRanges = [
  { value: '1h', label: '1 Hour' },
  { value: '24h', label: '24 Hours' },
  { value: '7d', label: '7 Days' },
  { value: '30d', label: '30 Days' },
  { value: '90d', label: '90 Days' }];


  const toggleMetric = (metric) => {
    setSelectedMetrics((prev) =>
    prev?.includes(metric) ?
    prev?.filter((m) => m !== metric) :
    [...prev, metric]
    );
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-brand-lg">
          <p className="font-medium text-sm text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) =>
          <div key={index} className="flex items-center space-x-2 text-xs">
              <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry?.color }} />
            
              <span className="text-text-secondary">{entry?.dataKey}:</span>
              <span className="font-mono font-medium text-foreground">
                {entry?.value}
                {entry?.dataKey?.includes('Time') ? 'ms' :
              entry?.dataKey?.includes('Size') ? 'KB' :
              entry?.dataKey?.includes('Score') ? '%' : ''}
              </span>
            </div>
          )}
        </div>);

    }
    return null;
  };

  const renderChart = () => {
    const ChartComponent = chartType === 'area' ? AreaChart : LineChart;

    return (
      <ResponsiveContainer width="100%" height={300}>
        <ChartComponent data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis
            dataKey="timestamp"
            stroke="var(--color-text-secondary)"
            fontSize={12}
            tickFormatter={(value) => new Date(value)?.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit'
            })} />
          
          <YAxis
            stroke="var(--color-text-secondary)"
            fontSize={12} />
          
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: '12px' }}
            iconType="circle" />
          
          
          {selectedMetrics?.map((metric, index) => {
            const color = colors?.[index % colors?.length];

            if (chartType === 'area') {
              return (
                <Area
                  key={metric}
                  type="monotone"
                  dataKey={metric}
                  stroke={color}
                  fill={color}
                  fillOpacity={0.1}
                  strokeWidth={2} />);


            } else {
              return (
                <Line
                  key={metric}
                  type="monotone"
                  dataKey={metric}
                  stroke={color}
                  strokeWidth={2}
                  dot={{ fill: color, strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: color, strokeWidth: 2 }} />);


            }
          })}
        </ChartComponent>
      </ResponsiveContainer>);

  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-brand-sm">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-inter font-semibold text-lg text-foreground">{title}</h3>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
              <button
                onClick={() => setChartType('line')}
                className={`p-1.5 rounded text-xs transition-all duration-brand ${
                chartType === 'line' ? 'bg-primary text-primary-foreground' : 'text-text-secondary hover:text-foreground'}`
                }>
                
                <Icon name="TrendingUp" size={14} />
              </button>
              <button
                onClick={() => setChartType('area')}
                className={`p-1.5 rounded text-xs transition-all duration-brand ${
                chartType === 'area' ? 'bg-primary text-primary-foreground' : 'text-text-secondary hover:text-foreground'}`
                }>
                
                <Icon name="AreaChart" size={14} />
              </button>
            </div>

            <select
              value={timeRange}
              onChange={(e) => onTimeRangeChange(e?.target?.value)}
              className="text-xs bg-background border border-border rounded px-2 py-1 text-foreground">
              
              {timeRanges?.map((range) =>
              <option key={range?.value} value={range?.value}>
                  {range?.label}
                </option>
              )}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {metrics?.map((metric, index) =>
          <button
            key={metric}
            onClick={() => toggleMetric(metric)}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-brand ${
            selectedMetrics?.includes(metric) ?
            'bg-primary text-primary-foreground' :
            'bg-muted text-text-secondary hover:bg-muted/80'}`
            }>
            
              <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: selectedMetrics?.includes(metric) ? 'currentColor' : colors?.[index % colors?.length] }} />
            
              <span>{metric}</span>
            </button>
          )}
        </div>
      </div>
      <div className="p-6">
        {renderChart()}
      </div>
    </div>);

};

export default PerformanceChart;