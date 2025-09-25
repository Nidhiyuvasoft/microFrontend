import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const UserEngagementChart = ({ data, title }) => {
  const [chartType, setChartType] = useState('bar');
  const [timeframe, setTimeframe] = useState('daily');

  const colors = ['#2563EB', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#EC4899', '#14B8A6'];

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
                {entry?.value?.toLocaleString()}
              </span>
            </div>
          )}
        </div>);

    }
    return null;
  };

  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0];
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-brand-lg">
          <div className="flex items-center space-x-2 text-sm">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: data?.payload?.fill }} />
            
            <span className="text-text-secondary">{data?.name}:</span>
            <span className="font-mono font-medium text-foreground">
              {data?.value?.toLocaleString()} ({(data?.value / data?.payload?.total * 100)?.toFixed(1)}%)
            </span>
          </div>
        </div>);

    }
    return null;
  };

  const renderBarChart = () =>
  <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
        <XAxis
        dataKey="period"
        stroke="var(--color-text-secondary)"
        fontSize={12} />
      
        <YAxis
        stroke="var(--color-text-secondary)"
        fontSize={12} />
      
        <Tooltip content={<CustomTooltip />} />
        <Legend
        wrapperStyle={{ fontSize: '12px' }}
        iconType="rect" />
      
        <Bar dataKey="pageViews" fill={colors?.[0]} name="Page Views" radius={[2, 2, 0, 0]} />
        <Bar dataKey="uniqueUsers" fill={colors?.[1]} name="Unique Users" radius={[2, 2, 0, 0]} />
        <Bar dataKey="sessions" fill={colors?.[2]} name="Sessions" radius={[2, 2, 0, 0]} />
        <Bar dataKey="bounceRate" fill={colors?.[3]} name="Bounce Rate %" radius={[2, 2, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>;


  const pieData = data?.reduce((acc, item) => {
    acc.pageViews += item?.pageViews;
    acc.uniqueUsers += item?.uniqueUsers;
    acc.sessions += item?.sessions;
    return acc;
  }, { pageViews: 0, uniqueUsers: 0, sessions: 0 });

  const pieChartData = [
  { name: 'Page Views', value: pieData?.pageViews, fill: colors?.[0] },
  { name: 'Unique Users', value: pieData?.uniqueUsers, fill: colors?.[1] },
  { name: 'Sessions', value: pieData?.sessions, fill: colors?.[2] }]?.
  map((item) => ({ ...item, total: pieData?.pageViews + pieData?.uniqueUsers + pieData?.sessions }));

  const renderPieChart = () =>
  <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
        data={pieChartData}
        cx="50%"
        cy="50%"
        outerRadius={120}
        innerRadius={60}
        paddingAngle={2}
        dataKey="value">
        
          {pieChartData?.map((entry, index) =>
        <Cell key={`cell-${index}`} fill={entry?.fill} />
        )}
        </Pie>
        <Tooltip content={<CustomPieTooltip />} />
        <Legend
        wrapperStyle={{ fontSize: '12px' }}
        iconType="circle" />
      
      </PieChart>
    </ResponsiveContainer>;


  const totalMetrics = data?.reduce((acc, item) => {
    acc.pageViews += item?.pageViews;
    acc.uniqueUsers += item?.uniqueUsers;
    acc.sessions += item?.sessions;
    acc.avgSessionDuration += item?.avgSessionDuration;
    return acc;
  }, { pageViews: 0, uniqueUsers: 0, sessions: 0, avgSessionDuration: 0 });

  const avgSessionDuration = Math.round(totalMetrics?.avgSessionDuration / data?.length);

  return (
    <div className="bg-card border border-border rounded-lg shadow-brand-sm">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-inter font-semibold text-lg text-foreground">{title}</h3>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
              <button
                onClick={() => setChartType('bar')}
                className={`p-1.5 rounded text-xs transition-all duration-brand ${
                chartType === 'bar' ? 'bg-primary text-primary-foreground' : 'text-text-secondary hover:text-foreground'}`
                }>
                
                <Icon name="BarChart3" size={14} />
              </button>
              <button
                onClick={() => setChartType('pie')}
                className={`p-1.5 rounded text-xs transition-all duration-brand ${
                chartType === 'pie' ? 'bg-primary text-primary-foreground' : 'text-text-secondary hover:text-foreground'}`
                }>
                
                <Icon name="PieChart" size={14} />
              </button>
            </div>

            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e?.target?.value)}
              className="text-xs bg-background border border-border rounded px-2 py-1 text-foreground">
              
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{totalMetrics?.pageViews?.toLocaleString()}</div>
            <div className="text-xs text-text-secondary">Total Page Views</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{totalMetrics?.uniqueUsers?.toLocaleString()}</div>
            <div className="text-xs text-text-secondary">Unique Users</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{totalMetrics?.sessions?.toLocaleString()}</div>
            <div className="text-xs text-text-secondary">Total Sessions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{avgSessionDuration}s</div>
            <div className="text-xs text-text-secondary">Avg Session Duration</div>
          </div>
        </div>
      </div>
      <div className="p-6">
        {chartType === 'bar' ? renderBarChart() : renderPieChart()}
      </div>
    </div>);

};

export default UserEngagementChart;