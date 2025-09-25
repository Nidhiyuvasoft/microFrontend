import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const BookingList = ({
  bookings = [],
  resources = [],
  onEdit,
  onCancel,
  onView,
  className = ''
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewMode, setViewMode] = useState('list');

  const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'pending', label: 'Pending' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'completed', label: 'Completed' }];


  const sortOptions = [
  { value: 'date', label: 'Date' },
  { value: 'title', label: 'Title' },
  { value: 'resource', label: 'Resource' },
  { value: 'status', label: 'Status' }];


  const filteredAndSortedBookings = useMemo(() => {
    let filtered = bookings?.filter((booking) => {
      const matchesSearch = booking?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      booking?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      booking?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase());

      const matchesStatus = statusFilter === 'all' || booking?.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    filtered?.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case 'date':
          aValue = new Date(`${a.date}T${a.startTime}`);
          bValue = new Date(`${b.date}T${b.startTime}`);
          break;
        case 'title':
          aValue = a?.title?.toLowerCase();
          bValue = b?.title?.toLowerCase();
          break;
        case 'resource':
          const aResource = resources?.find((r) => r?.id === a?.resourceId);
          const bResource = resources?.find((r) => r?.id === b?.resourceId);
          aValue = aResource?.name?.toLowerCase() || '';
          bValue = bResource?.name?.toLowerCase() || '';
          break;
        case 'status':
          aValue = a?.status;
          bValue = b?.status;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [bookings, searchTerm, statusFilter, sortBy, sortOrder, resources]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'text-success bg-success/10 border-success/20';
      case 'pending':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'cancelled':
        return 'text-error bg-error/10 border-error/20';
      case 'completed':
        return 'text-text-secondary bg-muted border-border';
      default:
        return 'text-text-secondary bg-muted border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return 'CheckCircle';
      case 'pending':
        return 'Clock';
      case 'cancelled':
        return 'XCircle';
      case 'completed':
        return 'Check';
      default:
        return 'Circle';
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date?.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (timeStr) => {
    const [hours, minutes] = timeStr?.split(':');
    const date = new Date();
    date?.setHours(parseInt(hours), parseInt(minutes));
    return date?.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getResourceName = (resourceId) => {
    const resource = resources?.find((r) => r?.id === resourceId);
    return resource?.name || 'Unknown Resource';
  };

  const isUpcoming = (booking) => {
    const bookingDateTime = new Date(`${booking.date}T${booking.startTime}`);
    return bookingDateTime > new Date();
  };

  const BookingCard = ({ booking }) =>
  <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-semibold text-foreground">{booking?.title}</h3>
            {isUpcoming(booking) &&
          <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                Upcoming
              </span>
          }
          </div>
          <p className="text-sm text-text-secondary mb-2">
            {getResourceName(booking?.resourceId)}
          </p>
          {booking?.description &&
        <p className="text-sm text-text-secondary line-clamp-2">
              {booking?.description}
            </p>
        }
        </div>
        
        <div className={`px-2 py-1 rounded-full border text-xs font-medium ${getStatusColor(booking?.status)}`}>
          <div className="flex items-center space-x-1">
            <Icon name={getStatusIcon(booking?.status)} size={12} />
            <span>{booking?.status?.charAt(0)?.toUpperCase() + booking?.status?.slice(1)}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={16} className="text-text-secondary" />
          <span className="text-sm text-text-secondary">
            {formatDate(booking?.date)}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={16} className="text-text-secondary" />
          <span className="text-sm text-text-secondary">
            {formatTime(booking?.startTime)} - {formatTime(booking?.endTime)}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Icon name="Mail" size={16} className="text-text-secondary" />
          <span className="text-sm text-text-secondary truncate">
            {booking?.email}
          </span>
        </div>
        
        {booking?.attendees &&
      <div className="flex items-center space-x-2">
            <Icon name="Users" size={16} className="text-text-secondary" />
            <span className="text-sm text-text-secondary">
              {booking?.attendees} attendees
            </span>
          </div>
      }
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="text-xs text-text-secondary">
          Created: {new Date(booking.createdAt)?.toLocaleDateString()}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
          variant="ghost"
          size="sm"
          iconName="Eye"
          onClick={() => onView(booking)}>
          
            View
          </Button>
          
          {booking?.status !== 'cancelled' && booking?.status !== 'completed' &&
        <>
              <Button
            variant="ghost"
            size="sm"
            iconName="Edit"
            onClick={() => onEdit(booking)}>
            
                Edit
              </Button>
              
              <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={() => onCancel(booking)}
            className="text-error hover:text-error/80">
            
                Cancel
              </Button>
            </>
        }
        </div>
      </div>
    </div>;


  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      {}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="List" size={20} className="text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Bookings</h2>
          <span className="px-2 py-1 bg-muted text-text-secondary text-sm rounded-full">
            {filteredAndSortedBookings?.length}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            iconName="List"
            onClick={() => setViewMode('list')} />
          
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            iconName="Grid3X3"
            onClick={() => setViewMode('grid')} />
          
        </div>
      </div>
      {}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Input
          type="search"
          placeholder="Search bookings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e?.target?.value)} />
        
        
        <Select
          options={statusOptions}
          value={statusFilter}
          onChange={setStatusFilter}
          placeholder="Filter by status" />
        
        
        <Select
          options={sortOptions}
          value={sortBy}
          onChange={setSortBy}
          placeholder="Sort by" />
        
        
        <Button
          variant="outline"
          iconName={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'}
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
          
          {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
        </Button>
      </div>
      {}
      {filteredAndSortedBookings?.length === 0 ?
      <div className="text-center py-12">
          <Icon name="Calendar" size={48} className="text-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No bookings found</h3>
          <p className="text-text-secondary">
            {searchTerm || statusFilter !== 'all' ? 'Try adjusting your search or filter criteria' : 'Create your first booking to get started'
          }
          </p>
        </div> :

      <div className={`${
      viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'}`
      }>
          {filteredAndSortedBookings?.map((booking) =>
        <BookingCard key={booking?.id} booking={booking} />
        )}
        </div>
      }
    </div>);

};

export default BookingList;