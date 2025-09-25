import React from 'react';
import Icon from '../../../components/AppIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const BookingStats = ({
  bookings = [],
  resources = [],
  selectedDate,
  className = ''
}) => {

  const totalBookings = bookings?.length;
  const confirmedBookings = bookings?.filter((b) => b?.status === 'confirmed')?.length;
  const pendingBookings = bookings?.filter((b) => b?.status === 'pending')?.length;
  const cancelledBookings = bookings?.filter((b) => b?.status === 'cancelled')?.length;

  const confirmationRate = totalBookings > 0 ? Math.round(confirmedBookings / totalBookings * 100) : 0;


  const today = new Date()?.toISOString()?.split('T')?.[0];
  const todayBookings = bookings?.filter((b) => b?.date === today);


  const resourceUtilization = resources?.map((resource) => {
    const resourceBookings = bookings?.filter((b) => b?.resourceId === resource?.id);
    const totalHours = resourceBookings?.reduce((total, booking) => {
      const start = new Date(`${booking.date}T${booking.startTime}`);
      const end = new Date(`${booking.date}T${booking.endTime}`);
      return total + (end - start) / (1000 * 60 * 60);
    }, 0);

    return {
      name: resource?.name,
      hours: totalHours,
      bookings: resourceBookings?.length,
      utilization: Math.round(totalHours / (12 * 30) * 100)
    };
  });


  const getWeeklyData = () => {
    const weekData = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date?.setDate(today?.getDate() - i);
      const dateStr = date?.toISOString()?.split('T')?.[0];

      const dayBookings = bookings?.filter((b) => b?.date === dateStr);

      weekData?.push({
        day: date?.toLocaleDateString('en-US', { weekday: 'short' }),
        bookings: dayBookings?.length,
        confirmed: dayBookings?.filter((b) => b?.status === 'confirmed')?.length,
        pending: dayBookings?.filter((b) => b?.status === 'pending')?.length
      });
    }

    return weekData;
  };


  const statusData = [
  { name: 'Confirmed', value: confirmedBookings, color: '#059669' },
  { name: 'Pending', value: pendingBookings, color: '#D97706' },
  { name: 'Cancelled', value: cancelledBookings, color: '#DC2626' }]?.
  filter((item) => item?.value > 0);


  const hourlyData = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 8;
    const hourStr = `${hour?.toString()?.padStart(2, '0')}:00`;
    const hourBookings = bookings?.filter((b) => {
      const startHour = parseInt(b?.startTime?.split(':')?.[0]);
      return startHour === hour;
    });

    return {
      hour: hour > 12 ? `${hour - 12}PM` : `${hour}AM`,
      bookings: hourBookings?.length
    };
  });

  const weeklyData = getWeeklyData();

  const StatCard = ({ icon, title, value, subtitle, trend, color = 'primary' }) =>
  <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <div className={`p-2 rounded-lg bg-${color}/10`}>
          <Icon name={icon} size={20} className={`text-${color}`} />
        </div>
        {trend &&
      <div className={`flex items-center space-x-1 text-xs ${
      trend > 0 ? 'text-success' : trend < 0 ? 'text-error' : 'text-text-secondary'}`
      }>
            <Icon
          name={trend > 0 ? 'TrendingUp' : trend < 0 ? 'TrendingDown' : 'Minus'}
          size={12} />
        
            <span>{Math.abs(trend)}%</span>
          </div>
      }
      </div>
      
      <div>
        <div className="text-2xl font-bold text-foreground mb-1">{value}</div>
        <div className="text-sm text-text-secondary">{title}</div>
        {subtitle &&
      <div className="text-xs text-text-secondary mt-1">{subtitle}</div>
      }
      </div>
    </div>;


  return (
    <div className={`space-y-6 ${className}`}>
      {}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon="Calendar"
          title="Total Bookings"
          value={totalBookings}
          subtitle="All time"
          trend={12}
          color="primary" />
        
        
        <StatCard
          icon="CheckCircle"
          title="Confirmed"
          value={confirmedBookings}
          subtitle={`${confirmationRate}% confirmation rate`}
          trend={8}
          color="success" />
        
        
        <StatCard
          icon="Clock"
          title="Pending"
          value={pendingBookings}
          subtitle="Awaiting confirmation"
          trend={-3}
          color="warning" />
        
        
        <StatCard
          icon="CalendarDays"
          title="Today's Bookings"
          value={todayBookings?.length}
          subtitle={new Date()?.toLocaleDateString()}
          trend={0}
          color="accent" />
        
      </div>
      {}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="TrendingUp" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Weekly Trend</h3>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis
                  dataKey="day"
                  stroke="var(--color-text-secondary)"
                  fontSize={12} />
                
                <YAxis
                  stroke="var(--color-text-secondary)"
                  fontSize={12} />
                
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }} />
                
                <Line
                  type="monotone"
                  dataKey="bookings"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }} />
                
                <Line
                  type="monotone"
                  dataKey="confirmed"
                  stroke="var(--color-success)"
                  strokeWidth={2}
                  strokeDasharray="5 5" />
                
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="PieChart" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Status Distribution</h3>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value">
                  
                  {statusData?.map((entry, index) =>
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                  )}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }} />
                
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex justify-center space-x-4 mt-4">
            {statusData?.map((item, index) =>
            <div key={index} className="flex items-center space-x-2">
                <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item?.color }} />
              
                <span className="text-sm text-text-secondary">
                  {item?.name} ({item?.value})
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      {}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="BarChart3" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Resource Utilization</h3>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={resourceUtilization}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis
                  dataKey="name"
                  stroke="var(--color-text-secondary)"
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={80} />
                
                <YAxis
                  stroke="var(--color-text-secondary)"
                  fontSize={12} />
                
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }} />
                
                <Bar
                  dataKey="utilization"
                  fill="var(--color-primary)"
                  radius={[4, 4, 0, 0]} />
                
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Clock" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Peak Hours</h3>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis
                  dataKey="hour"
                  stroke="var(--color-text-secondary)"
                  fontSize={12} />
                
                <YAxis
                  stroke="var(--color-text-secondary)"
                  fontSize={12} />
                
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }} />
                
                <Bar
                  dataKey="bookings"
                  fill="var(--color-accent)"
                  radius={[4, 4, 0, 0]} />
                
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Lightbulb" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Quick Insights</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="TrendingUp" size={16} className="text-success" />
              <span className="text-sm font-medium text-success">Most Popular</span>
            </div>
            <p className="text-sm text-text-secondary">
              {resourceUtilization?.sort((a, b) => b?.bookings - a?.bookings)?.[0]?.name || 'No data'} 
              is your most booked resource
            </p>
          </div>
          
          <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Clock" size={16} className="text-warning" />
              <span className="text-sm font-medium text-warning">Peak Time</span>
            </div>
            <p className="text-sm text-text-secondary">
              {hourlyData?.sort((a, b) => b?.bookings - a?.bookings)?.[0]?.hour || 'No data'} 
              is your busiest hour
            </p>
          </div>
          
          <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Target" size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">Efficiency</span>
            </div>
            <p className="text-sm text-text-secondary">
              {confirmationRate}% confirmation rate shows strong booking quality
            </p>
          </div>
        </div>
      </div>
    </div>);

};

export default BookingStats;