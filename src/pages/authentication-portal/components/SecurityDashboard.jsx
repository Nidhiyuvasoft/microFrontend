import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SecurityDashboard = ({ user }) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');

  const securityMetrics = {
    loginAttempts: {
      successful: 24,
      failed: 2,
      blocked: 0
    },
    activeSessions: 3,
    securityScore: 85,
    lastSecurityScan: new Date(Date.now() - 3600000 * 2),
    mfaEnabled: false,
    passwordStrength: 'Strong',
    suspiciousActivity: 1
  };

  const recentActivity = [
  {
    id: 1,
    type: 'login_success',
    description: 'Successful login from Chrome',
    timestamp: new Date(Date.now() - 300000),
    location: 'San Francisco, CA',
    ipAddress: '192.168.1.100',
    riskLevel: 'low'
  },
  {
    id: 2,
    type: 'password_change',
    description: 'Password changed successfully',
    timestamp: new Date(Date.now() - 86400000),
    location: 'San Francisco, CA',
    ipAddress: '192.168.1.100',
    riskLevel: 'low'
  },
  {
    id: 3,
    type: 'login_failed',
    description: 'Failed login attempt',
    timestamp: new Date(Date.now() - 86400000 * 2),
    location: 'Unknown Location',
    ipAddress: '203.0.113.42',
    riskLevel: 'medium'
  },
  {
    id: 4,
    type: 'api_access',
    description: 'API key used for data access',
    timestamp: new Date(Date.now() - 86400000 * 3),
    location: 'San Francisco, CA',
    ipAddress: '192.168.1.100',
    riskLevel: 'low'
  }];


  const activeSessions = [
  {
    id: 1,
    device: 'Chrome on macOS',
    location: 'San Francisco, CA',
    ipAddress: '192.168.1.100',
    lastActive: new Date(Date.now() - 300000),
    current: true
  },
  {
    id: 2,
    device: 'Safari on iPhone',
    location: 'San Francisco, CA',
    ipAddress: '192.168.1.101',
    lastActive: new Date(Date.now() - 3600000),
    current: false
  },
  {
    id: 3,
    device: 'Firefox on Windows',
    location: 'New York, NY',
    ipAddress: '198.51.100.42',
    lastActive: new Date(Date.now() - 86400000),
    current: false
  }];


  const securityRecommendations = [
  {
    id: 1,
    title: 'Enable Two-Factor Authentication',
    description: 'Add an extra layer of security to your account',
    priority: 'high',
    action: 'Enable MFA'
  },
  {
    id: 2,
    title: 'Review API Key Permissions',
    description: 'Some API keys have broad permissions that could be restricted',
    priority: 'medium',
    action: 'Review Keys'
  },
  {
    id: 3,
    title: 'Update Recovery Email',
    description: 'Your recovery email hasn\'t been verified',
    priority: 'low',
    action: 'Verify Email'
  }];


  const getActivityIcon = (type) => {
    switch (type) {
      case 'login_success':
        return 'LogIn';
      case 'login_failed':
        return 'AlertTriangle';
      case 'password_change':
        return 'Key';
      case 'api_access':
        return 'Code';
      default:
        return 'Activity';
    }
  };

  const getActivityColor = (type, riskLevel) => {
    if (riskLevel === 'high') return 'text-error';
    if (riskLevel === 'medium') return 'text-warning';
    if (type === 'login_failed') return 'text-warning';
    return 'text-success';
  };

  const getRiskBadgeColor = (riskLevel) => {
    switch (riskLevel) {
      case 'high':
        return 'bg-error/10 text-error border-error/20';
      case 'medium':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'low':
        return 'bg-success/10 text-success border-success/20';
      default:
        return 'bg-muted text-text-secondary border-border';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-text-secondary';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Security Dashboard</h1>
          <p className="text-text-secondary">Monitor your account security and activity</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e?.target?.value)}
            className="px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
            
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left">
            
            Export Report
          </Button>
        </div>
      </div>
      {}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Security Score</h3>
            <Icon name="Shield" size={20} className="text-primary" />
          </div>
          <div className="text-3xl font-bold text-foreground mb-2">
            {securityMetrics?.securityScore}%
          </div>
          <p className="text-sm text-success">Good security posture</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Login Attempts</h3>
            <Icon name="LogIn" size={20} className="text-success" />
          </div>
          <div className="text-3xl font-bold text-foreground mb-2">
            {securityMetrics?.loginAttempts?.successful}
          </div>
          <p className="text-sm text-text-secondary">
            {securityMetrics?.loginAttempts?.failed} failed attempts
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Active Sessions</h3>
            <Icon name="Monitor" size={20} className="text-primary" />
          </div>
          <div className="text-3xl font-bold text-foreground mb-2">
            {securityMetrics?.activeSessions}
          </div>
          <p className="text-sm text-text-secondary">Across all devices</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Suspicious Activity</h3>
            <Icon name="AlertTriangle" size={20} className="text-warning" />
          </div>
          <div className="text-3xl font-bold text-foreground mb-2">
            {securityMetrics?.suspiciousActivity}
          </div>
          <p className="text-sm text-warning">Requires attention</p>
        </div>
      </div>
      {}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Security Recommendations</h3>
        <div className="space-y-4">
          {securityRecommendations?.map((recommendation) =>
          <div key={recommendation?.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-4">
                <div className={`w-2 h-2 rounded-full ${
              recommendation?.priority === 'high' ? 'bg-error' :
              recommendation?.priority === 'medium' ? 'bg-warning' : 'bg-success'}`
              }></div>
                <div>
                  <h4 className="font-medium text-foreground">{recommendation?.title}</h4>
                  <p className="text-sm text-text-secondary">{recommendation?.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`text-sm font-medium ${getPriorityColor(recommendation?.priority)}`}>
                  {recommendation?.priority?.toUpperCase()}
                </span>
                <Button variant="outline" size="sm">
                  {recommendation?.action}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
            <Button variant="ghost" size="sm" iconName="ExternalLink">
              View All
            </Button>
          </div>
          
          <div className="space-y-4">
            {recentActivity?.map((activity) =>
            <div key={activity?.id} className="flex items-start space-x-4 p-3 hover:bg-muted rounded-lg transition-colors">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              activity?.riskLevel === 'high' ? 'bg-error/10' :
              activity?.riskLevel === 'medium' ? 'bg-warning/10' : 'bg-success/10'}`
              }>
                  <Icon
                  name={getActivityIcon(activity?.type)}
                  size={16}
                  className={getActivityColor(activity?.type, activity?.riskLevel)} />
                
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground text-sm">{activity?.description}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-text-secondary">{activity?.location}</span>
                    <span className="text-xs text-text-secondary">•</span>
                    <span className="text-xs text-text-secondary">{activity?.ipAddress}</span>
                  </div>
                  <p className="text-xs text-text-secondary mt-1">
                    {activity?.timestamp?.toLocaleDateString()} {activity?.timestamp?.toLocaleTimeString()}
                  </p>
                </div>
                
                <span className={`px-2 py-1 text-xs rounded-full border ${getRiskBadgeColor(activity?.riskLevel)}`}>
                  {activity?.riskLevel}
                </span>
              </div>
            )}
          </div>
        </div>

        {}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Active Sessions</h3>
            <Button variant="ghost" size="sm" iconName="LogOut" className="text-error">
              End All
            </Button>
          </div>
          
          <div className="space-y-4">
            {activeSessions?.map((session) =>
            <div key={session?.id} className="flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="Monitor" size={16} className="text-primary" />
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-foreground text-sm">{session?.device}</p>
                      {session?.current &&
                    <span className="px-2 py-1 text-xs bg-success/10 text-success rounded-full">
                          Current
                        </span>
                    }
                    </div>
                    <p className="text-xs text-text-secondary">{session?.location}</p>
                    <p className="text-xs text-text-secondary">
                      Last active: {session?.lastActive?.toLocaleString()}
                    </p>
                  </div>
                </div>
                
                {!session?.current &&
              <Button variant="ghost" size="sm" iconName="X" className="text-error">
                    End
                  </Button>
              }
              </div>
            )}
          </div>
        </div>
      </div>
    </div>);

};

export default SecurityDashboard;