import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import UserProfile from './components/UserProfile';
import SecurityDashboard from './components/SecurityDashboard';
import RoleBasedAccess from './components/RoleBasedAccess';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const AuthenticationPortal = () => {
  const [currentView, setCurrentView] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const savedUser = localStorage.getItem('microfed_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
        setCurrentView('profile');
      } catch (error) {
        localStorage.removeItem('microfed_user');
      }
    }
  }, []);

  const handleLogin = async (credentials) => {
    setIsLoading(true);


    await new Promise((resolve) => setTimeout(resolve, 1500));

    const userData = {
      id: Date.now(),
      email: credentials?.email,
      role: credentials?.role,
      firstName: credentials?.email?.split('@')?.[0]?.split('.')?.[0],
      lastName: credentials?.email?.split('@')?.[0]?.split('.')?.[1] || '',
      company: 'MicroFed Enterprise',
      loginTime: new Date(),
      provider: credentials?.provider || 'email',
      permissions: getRolePermissions(credentials?.role),
      notifications: {
        email: true,
        security: true,
        updates: false,
        marketing: false
      }
    };

    setUser(userData);
    setIsAuthenticated(true);
    setCurrentView('profile');


    if (credentials?.rememberMe) {
      localStorage.setItem('microfed_user', JSON.stringify(userData));
    }

    setIsLoading(false);
  };

  const handleRegister = async (registrationData) => {
    setIsLoading(true);


    await new Promise((resolve) => setTimeout(resolve, 2000));

    const userData = {
      id: Date.now(),
      email: registrationData?.email,
      firstName: registrationData?.firstName,
      lastName: registrationData?.lastName,
      role: registrationData?.role,
      company: registrationData?.company,
      loginTime: new Date(),
      provider: 'email',
      permissions: getRolePermissions(registrationData?.role),
      notifications: {
        email: true,
        security: true,
        updates: registrationData?.subscribeNewsletter,
        marketing: registrationData?.subscribeNewsletter
      }
    };

    setUser(userData);
    setIsAuthenticated(true);
    setCurrentView('profile');
    localStorage.setItem('microfed_user', JSON.stringify(userData));

    setIsLoading(false);
  };

  const handleForgotPassword = async (email) => {
    setIsLoading(true);


    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsLoading(false);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setCurrentView('login');
    localStorage.removeItem('microfed_user');
  };

  const handleUpdateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('microfed_user', JSON.stringify(updatedUser));
  };

  const handleRoleChange = (newRole) => {
    const updatedUser = {
      ...user,
      role: newRole,
      permissions: getRolePermissions(newRole)
    };
    setUser(updatedUser);
    localStorage.setItem('microfed_user', JSON.stringify(updatedUser));
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      handleLogout();
    }
  };

  const getRolePermissions = (role) => {
    const permissions = {
      'Senior React Developer': ['code_access', 'debug_tools', 'performance_metrics', 'module_testing'],
      'Technical Architect': ['architecture_docs', 'system_design', 'security_config', 'deployment_strategies'],
      'Engineering Manager': ['team_management', 'project_planning', 'resource_allocation', 'performance_dashboards'],
      'Enterprise Stakeholder': ['executive_dashboards', 'business_metrics', 'roi_analysis', 'strategic_planning']
    };
    return permissions?.[role] || [];
  };

  const navigationTabs = [
  { id: 'profile', label: 'Profile', icon: 'User' },
  { id: 'security', label: 'Security', icon: 'Shield' },
  { id: 'access', label: 'Access Control', icon: 'Lock' }];


  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md">
            {currentView === 'login' &&
            <LoginForm
              onLogin={handleLogin}
              onSwitchToRegister={() => setCurrentView('register')}
              onForgotPassword={() => setCurrentView('forgot-password')}
              isLoading={isLoading} />

            }
            
            {currentView === 'register' &&
            <RegisterForm
              onRegister={handleRegister}
              onSwitchToLogin={() => setCurrentView('login')}
              isLoading={isLoading} />

            }
            
            {currentView === 'forgot-password' &&
            <ForgotPasswordForm
              onBackToLogin={() => setCurrentView('login')}
              onResetRequest={handleForgotPassword}
              isLoading={isLoading} />

            }
          </div>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} />
      
      <main className={`pt-16 transition-all duration-brand ${
      sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-72'}`
      }>
        <div className="p-6">
          {}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <Icon name="Shield" size={24} className="text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    Welcome back, {user?.firstName}!
                  </h1>
                  <p className="text-text-secondary">
                    Logged in as {user?.role} • Last login: {user?.loginTime?.toLocaleString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{user?.company}</p>
                  <p className="text-xs text-text-secondary">
                    {user?.permissions?.length} permissions active
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => navigate('/main-dashboard')}
                  iconName="LayoutDashboard"
                  iconPosition="left">
                  
                  Go to Dashboard
                </Button>
              </div>
            </div>
          </div>

          {}
          <div className="bg-card border border-border rounded-lg mb-8">
            <div className="border-b border-border">
              <nav className="flex space-x-8 px-6">
                {navigationTabs?.map((tab) =>
                <button
                  key={tab?.id}
                  onClick={() => setCurrentView(tab?.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                  currentView === tab?.id ?
                  'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-foreground'}`
                  }>
                  
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                )}
              </nav>
            </div>
          </div>

          {}
          <div className="space-y-8">
            {currentView === 'profile' &&
            <UserProfile
              user={user}
              onUpdateProfile={handleUpdateProfile}
              onLogout={handleLogout}
              onDeleteAccount={handleDeleteAccount} />

            }
            
            {currentView === 'security' &&
            <SecurityDashboard user={user} />
            }
            
            {currentView === 'access' &&
            <RoleBasedAccess
              user={user}
              onRoleChange={handleRoleChange} />

            }
          </div>
        </div>
      </main>
    </div>);

};

export default AuthenticationPortal;