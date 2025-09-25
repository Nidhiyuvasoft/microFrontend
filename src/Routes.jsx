import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AnalyticsDashboard from './pages/analytics-dashboard';
import BookingInterface from './pages/booking-interface';
import MainDashboard from './pages/main-dashboard';
import ConfigurationCenter from './pages/configuration-center';
import AuthenticationPortal from './pages/authentication-portal';
import ModuleRegistry from './pages/module-registry';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        <Route path="/" element={<AnalyticsDashboard />} />
        <Route path="/analytics-dashboard" element={<AnalyticsDashboard />} />
        <Route path="/booking-interface" element={<BookingInterface />} />
        <Route path="/main-dashboard" element={<MainDashboard />} />
        <Route path="/configuration-center" element={<ConfigurationCenter />} />
        <Route path="/authentication-portal" element={<AuthenticationPortal />} />
        <Route path="/module-registry" element={<ModuleRegistry />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>);

};

export default Routes;