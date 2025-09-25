import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExportPanel = ({ onExport, availableReports }) => {
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [selectedReports, setSelectedReports] = useState([]);
  const [dateRange, setDateRange] = useState('last30days');
  const [isExporting, setIsExporting] = useState(false);
  const [customDateRange, setCustomDateRange] = useState({
    startDate: '',
    endDate: ''
  });

  const exportFormats = [
  { value: 'pdf', label: 'PDF Report', icon: 'FileText', description: 'Formatted report with charts' },
  { value: 'csv', label: 'CSV Data', icon: 'Download', description: 'Raw data for analysis' },
  { value: 'json', label: 'JSON Export', icon: 'Code', description: 'Structured data format' },
  { value: 'xlsx', label: 'Excel Spreadsheet', icon: 'Sheet', description: 'Spreadsheet with multiple tabs' }];


  const dateRanges = [
  { value: 'today', label: 'Today' },
  { value: 'yesterday', label: 'Yesterday' },
  { value: 'last7days', label: 'Last 7 Days' },
  { value: 'last30days', label: 'Last 30 Days' },
  { value: 'last90days', label: 'Last 90 Days' },
  { value: 'custom', label: 'Custom Range' }];


  const handleReportToggle = (reportId) => {
    setSelectedReports((prev) =>
    prev?.includes(reportId) ?
    prev?.filter((id) => id !== reportId) :
    [...prev, reportId]
    );
  };

  const handleExport = async () => {
    if (selectedReports?.length === 0) {
      alert('Please select at least one report to export.');
      return;
    }

    setIsExporting(true);

    try {
      const exportConfig = {
        format: selectedFormat,
        reports: selectedReports,
        dateRange: dateRange === 'custom' ? customDateRange : dateRange,
        timestamp: new Date()?.toISOString()
      };

      await onExport(exportConfig);


      setTimeout(() => {
        setIsExporting(false);
        alert(`Export completed successfully! Your ${selectedFormat?.toUpperCase()} file has been downloaded.`);
      }, 2000);
    } catch (error) {
      setIsExporting(false);
      alert('Export failed. Please try again.');
    }
  };

  const getFormatIcon = (format) => {
    const formatData = exportFormats?.find((f) => f?.value === format);
    return formatData ? formatData?.icon : 'Download';
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-brand-sm">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 bg-accent/10 rounded-lg">
            <Icon name="Download" size={20} className="text-accent" />
          </div>
          <h3 className="font-inter font-semibold text-lg text-foreground">Export Reports</h3>
        </div>
        <p className="text-sm text-text-secondary">
          Generate and download comprehensive analytics reports in your preferred format.
        </p>
      </div>
      <div className="p-6 space-y-6">
        {}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">Export Format</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {exportFormats?.map((format) =>
            <button
              key={format?.value}
              onClick={() => setSelectedFormat(format?.value)}
              className={`flex items-start space-x-3 p-3 rounded-lg border transition-all duration-brand text-left ${
              selectedFormat === format?.value ?
              'border-primary bg-primary/5 text-primary' : 'border-border bg-background hover:bg-muted text-foreground'}`
              }>
              
                <Icon name={format?.icon} size={20} className="mt-0.5" />
                <div>
                  <div className="font-medium text-sm">{format?.label}</div>
                  <div className="text-xs opacity-75">{format?.description}</div>
                </div>
              </button>
            )}
          </div>
        </div>

        {}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Select Reports ({selectedReports?.length} selected)
          </label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {availableReports?.map((report) =>
            <label
              key={report?.id}
              className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted transition-all duration-brand cursor-pointer">
              
                <input
                type="checkbox"
                checked={selectedReports?.includes(report?.id)}
                onChange={() => handleReportToggle(report?.id)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary" />
              
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <Icon name={report?.icon} size={16} className="text-primary" />
                    <span className="font-medium text-sm text-foreground">{report?.name}</span>
                  </div>
                  <p className="text-xs text-text-secondary mt-1">{report?.description}</p>
                </div>
                <div className="text-xs text-text-secondary">
                  {report?.dataPoints} data points
                </div>
              </label>
            )}
          </div>
        </div>

        {}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">Date Range</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
            {dateRanges?.map((range) =>
            <button
              key={range?.value}
              onClick={() => setDateRange(range?.value)}
              className={`p-2 rounded text-sm font-medium transition-all duration-brand ${
              dateRange === range?.value ?
              'bg-primary text-primary-foreground' :
              'bg-muted text-text-secondary hover:bg-muted/80'}`
              }>
              
                {range?.label}
              </button>
            )}
          </div>

          {dateRange === 'custom' &&
          <div className="grid grid-cols-2 gap-3 mt-3">
              <div>
                <label className="block text-xs text-text-secondary mb-1">Start Date</label>
                <input
                type="date"
                value={customDateRange?.startDate}
                onChange={(e) => setCustomDateRange((prev) => ({ ...prev, startDate: e?.target?.value }))}
                className="w-full px-3 py-2 border border-border rounded-md text-sm bg-background text-foreground" />
              
              </div>
              <div>
                <label className="block text-xs text-text-secondary mb-1">End Date</label>
                <input
                type="date"
                value={customDateRange?.endDate}
                onChange={(e) => setCustomDateRange((prev) => ({ ...prev, endDate: e?.target?.value }))}
                className="w-full px-3 py-2 border border-border rounded-md text-sm bg-background text-foreground" />
              
              </div>
            </div>
          }
        </div>

        {}
        <div className="bg-muted rounded-lg p-4">
          <h4 className="font-medium text-sm text-foreground mb-2">Export Summary</h4>
          <div className="space-y-1 text-xs text-text-secondary">
            <div className="flex justify-between">
              <span>Format:</span>
              <span className="font-mono text-foreground">{selectedFormat?.toUpperCase()}</span>
            </div>
            <div className="flex justify-between">
              <span>Reports:</span>
              <span className="font-mono text-foreground">{selectedReports?.length} selected</span>
            </div>
            <div className="flex justify-between">
              <span>Date Range:</span>
              <span className="font-mono text-foreground">
                {dateRange === 'custom' ?
                `${customDateRange?.startDate} to ${customDateRange?.endDate}` :
                dateRanges?.find((r) => r?.value === dateRange)?.label
                }
              </span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Size:</span>
              <span className="font-mono text-foreground">
                {selectedReports?.length * 2.5}MB
              </span>
            </div>
          </div>
        </div>

        {}
        <Button
          onClick={handleExport}
          disabled={selectedReports?.length === 0 || isExporting}
          loading={isExporting}
          iconName={getFormatIcon(selectedFormat)}
          iconPosition="left"
          className="w-full">
          
          {isExporting ? 'Generating Export...' : `Export ${selectedFormat?.toUpperCase()} Report`}
        </Button>

        {}
        <div className="pt-4 border-t border-border">
          <h4 className="font-medium text-sm text-foreground mb-3">Quick Export</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              iconName="FileText"
              iconPosition="left"
              onClick={() => {
                setSelectedFormat('pdf');
                setSelectedReports(availableReports?.slice(0, 3)?.map((r) => r?.id));
                setDateRange('last30days');
              }}>
              
              Standard Report
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
              onClick={() => {
                setSelectedFormat('csv');
                setSelectedReports(availableReports?.map((r) => r?.id));
                setDateRange('last7days');
              }}>
              
              All Data CSV
            </Button>
          </div>
        </div>
      </div>
    </div>);

};

export default ExportPanel;