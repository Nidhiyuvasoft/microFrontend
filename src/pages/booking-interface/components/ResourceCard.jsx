import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ResourceCard = ({
  resource,
  onSelect,
  isSelected = false,
  availableSlots = [],
  bookings = [],
  selectedDate,
  className = ''
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const getResourceIcon = (type) => {
    const iconMap = {
      'meeting_room': 'Users',
      'conference_room': 'Video',
      'training_room': 'GraduationCap',
      'auditorium': 'Mic',
      'workspace': 'Briefcase',
      'equipment': 'Settings',
      'vehicle': 'Car',
      'facility': 'Building'
    };
    return iconMap?.[type] || 'Package';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'text-success bg-success/10';
      case 'busy':
        return 'text-warning bg-warning/10';
      case 'maintenance':
        return 'text-error bg-error/10';
      default:
        return 'text-text-secondary bg-muted';
    }
  };

  const getUtilizationRate = () => {
    if (!selectedDate) return 0;

    const dateStr = selectedDate?.toISOString()?.split('T')?.[0];
    const dayBookings = bookings?.filter((booking) =>
    booking?.resourceId === resource?.id && booking?.date === dateStr
    );

    const totalHours = 12;
    const bookedHours = dayBookings?.reduce((total, booking) => {
      const start = new Date(`${booking.date}T${booking.startTime}`);
      const end = new Date(`${booking.date}T${booking.endTime}`);
      return total + (end - start) / (1000 * 60 * 60);
    }, 0);

    return Math.round(bookedHours / totalHours * 100);
  };

  const getNextAvailableSlot = () => {
    if (!selectedDate) return null;

    const dateStr = selectedDate?.toISOString()?.split('T')?.[0];
    const daySlots = availableSlots?.filter((slot) =>
    slot?.resourceId === resource?.id && slot?.date === dateStr
    );

    const now = new Date();
    const currentTime = now?.getHours() * 100 + now?.getMinutes();

    return daySlots?.find((slot) => {
      const slotTime = parseInt(slot?.startTime?.replace(':', ''));
      return slotTime > currentTime;
    });
  };

  const utilizationRate = getUtilizationRate();
  const nextSlot = getNextAvailableSlot();

  return (
    <div
      className={`bg-card border rounded-lg transition-all duration-200 hover:shadow-md ${
      isSelected ? 'border-primary ring-2 ring-primary/20' : 'border-border hover:border-primary/30'} ${
      className}`}>
      
      {}
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        <Image
          src={resource?.image || `https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop`}
          alt={resource?.name}
          className="w-full h-full object-cover" />
        
        
        {}
        <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(resource?.status)}`}>
          {resource?.status?.charAt(0)?.toUpperCase() + resource?.status?.slice(1)}
        </div>

        {}
        {selectedDate &&
        <div className="absolute bottom-3 left-3 bg-background/90 backdrop-blur-sm rounded-lg px-2 py-1">
            <div className="flex items-center space-x-2">
              <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                <div
                className={`h-full transition-all duration-300 ${
                utilizationRate > 80 ? 'bg-error' :
                utilizationRate > 60 ? 'bg-warning' : 'bg-success'}`
                }
                style={{ width: `${utilizationRate}%` }} />
              
              </div>
              <span className="text-xs font-medium text-foreground">
                {utilizationRate}%
              </span>
            </div>
          </div>
        }
      </div>
      {}
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Icon
              name={getResourceIcon(resource?.type)}
              size={20}
              className="text-primary" />
            
            <div>
              <h3 className="font-semibold text-foreground">{resource?.name}</h3>
              <p className="text-sm text-text-secondary">{resource?.location}</p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            iconName={showDetails ? 'ChevronUp' : 'ChevronDown'}
            onClick={() => setShowDetails(!showDetails)} />
          
        </div>

        {}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={16} className="text-text-secondary" />
            <span className="text-sm text-text-secondary">
              Capacity: {resource?.capacity}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-text-secondary" />
            <span className="text-sm text-text-secondary">
              {resource?.hourlyRate ? `$${resource?.hourlyRate}/hr` : 'Free'}
            </span>
          </div>
        </div>

        {}
        {nextSlot &&
        <div className="mb-4 p-3 bg-success/10 border border-success/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-success" />
              <span className="text-sm font-medium text-success">
                Next available: {nextSlot?.startTime} - {nextSlot?.endTime}
              </span>
            </div>
          </div>
        }

        {}
        {showDetails &&
        <div className="space-y-3 pt-3 border-t border-border">
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Description</h4>
              <p className="text-sm text-text-secondary">
                {resource?.description || "Professional space equipped with modern amenities for productive meetings and events."}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Amenities</h4>
              <div className="flex flex-wrap gap-1">
                {resource?.amenities?.map((amenity, index) =>
              <span
                key={index}
                className="px-2 py-1 bg-muted text-xs text-text-secondary rounded">
                
                    {amenity}
                  </span>
              ) ||
              <>
                    <span className="px-2 py-1 bg-muted text-xs text-text-secondary rounded">WiFi</span>
                    <span className="px-2 py-1 bg-muted text-xs text-text-secondary rounded">Projector</span>
                    <span className="px-2 py-1 bg-muted text-xs text-text-secondary rounded">Whiteboard</span>
                  </>
              }
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Booking Rules</h4>
              <ul className="text-sm text-text-secondary space-y-1">
                <li>• Minimum booking: {resource?.minBookingHours || 1} hour(s)</li>
                <li>• Maximum booking: {resource?.maxBookingHours || 8} hour(s)</li>
                <li>• Advance notice: {resource?.advanceNotice || 24} hours</li>
                {resource?.requiresApproval && <li>• Requires approval</li>}
              </ul>
            </div>
          </div>
        }

        {}
        <div className="flex items-center space-x-2 mt-4">
          <Button
            variant={isSelected ? "default" : "outline"}
            fullWidth
            iconName={isSelected ? "Check" : "Calendar"}
            iconPosition="left"
            onClick={() => onSelect(resource)}
            disabled={resource?.status === 'maintenance'}>
            
            {isSelected ? 'Selected' : 'Select Resource'}
          </Button>
          
          <Button
            variant="ghost"
            size="default"
            iconName="Info"
            onClick={() => setShowDetails(!showDetails)} />
          
        </div>
      </div>
    </div>);

};

export default ResourceCard;