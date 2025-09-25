import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ className = '' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const primaryNavItems = [
  { path: '/main-dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { path: '/module-registry', label: 'Modules', icon: 'Package' },
  { path: '/authentication-portal', label: 'Auth Portal', icon: 'Shield' },
  { path: '/booking-interface', label: 'Booking', icon: 'Calendar' },
  { path: '/analytics-dashboard', label: 'Analytics', icon: 'BarChart3' }];


  const secondaryNavItems = [
  { path: '/configuration-center', label: 'Configuration', icon: 'Settings' }];


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => location?.pathname === path;

  const Logo = () =>
  <div className="flex items-center space-x-3">
      <div className="relative">
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
          <div className="w-4 h-4 bg-white rounded-sm opacity-90"></div>
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-conversion-accent rounded-full animate-pulse-subtle"></div>
      </div>
      <div className="flex flex-col">
        <span className="font-inter font-bold text-lg text-foreground leading-none">
          MicroFed
        </span>
        <span className="font-inter font-medium text-xs text-text-secondary leading-none">
          Enterprise
        </span>
      </div>
    </div>;


  return (
    <header
      className={`fixed top-0 left-0 right-0 z-header bg-background/95 backdrop-blur-brand border-b border-border transition-all duration-brand ${
      isScrolled ? 'shadow-brand-sm' : ''} ${
      className}`}>
      
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {}
          <div
            className="flex-shrink-0 cursor-pointer"
            onClick={() => handleNavigation('/main-dashboard')}>
            
            <Logo />
          </div>

          {}
          <nav className="hidden lg:flex items-center space-x-1">
            {primaryNavItems?.map((item) =>
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-brand ${
              isActivePath(item?.path) ?
              'bg-primary text-primary-foreground shadow-brand-sm' :
              'text-text-secondary hover:text-foreground hover:bg-muted'}`
              }>
              
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </button>
            )}

            {}
            <div className="relative group">
              <button className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-text-secondary hover:text-foreground hover:bg-muted transition-all duration-brand">
                <Icon name="MoreHorizontal" size={16} />
                <span>More</span>
              </button>
              
              {}
              <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-md shadow-brand-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-brand">
                <div className="py-1">
                  {secondaryNavItems?.map((item) =>
                  <button
                    key={item?.path}
                    onClick={() => handleNavigation(item?.path)}
                    className={`flex items-center space-x-2 w-full px-3 py-2 text-sm text-left transition-all duration-brand ${
                    isActivePath(item?.path) ?
                    'bg-accent text-accent-foreground' :
                    'text-popover-foreground hover:bg-muted'}`
                    }>
                    
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.label}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </nav>

          {}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              iconName="Github"
              iconPosition="left"
              onClick={() => window.open('https://github.com', '_blank')}
              className="text-text-secondary hover:text-foreground">
              
              GitHub
            </Button>
            <Button
              variant="default"
              size="sm"
              iconName="Rocket"
              iconPosition="left"
              className="bg-cta hover:bg-cta/90 text-white animate-pulse-subtle">
              
              Get Started
            </Button>
          </div>

          {}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-text-secondary hover:text-foreground hover:bg-muted transition-all duration-brand">
              
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>

        {}
        {isMobileMenuOpen &&
        <div className="lg:hidden border-t border-border bg-background">
            <div className="py-4 space-y-1">
              {[...primaryNavItems, ...secondaryNavItems]?.map((item) =>
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`flex items-center space-x-3 w-full px-4 py-3 text-left rounded-md transition-all duration-brand ${
              isActivePath(item?.path) ?
              'bg-primary text-primary-foreground' :
              'text-text-secondary hover:text-foreground hover:bg-muted'}`
              }>
              
                  <Icon name={item?.icon} size={20} />
                  <span className="font-medium">{item?.label}</span>
                </button>
            )}
              
              {}
              <div className="pt-4 space-y-2 border-t border-border">
                <Button
                variant="outline"
                fullWidth
                iconName="Github"
                iconPosition="left"
                onClick={() => window.open('https://github.com', '_blank')}>
                
                  GitHub Repository
                </Button>
                <Button
                variant="default"
                fullWidth
                iconName="Rocket"
                iconPosition="left"
                className="bg-cta hover:bg-cta/90 text-white">
                
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        }
      </div>
    </header>);

};

export default Header;