import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BookingCalendar = ({
  selectedDate,
  onDateSelect,
  bookings = [],
  availableSlots = [],
  viewMode = 'month',
  onViewModeChange,
  className = ''
}) => {
  const [currentDate, setCurrentDate] = useState(selectedDate || new Date());
  const [hoveredDate, setHoveredDate] = useState(null);

  const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];


  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date) => {
    const year = date?.getFullYear();
    const month = date?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay?.getDate();
    const startingDayOfWeek = firstDay?.getDay();

    const days = [];


    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days?.push({
        date: prevDate,
        isCurrentMonth: false,
        isToday: false,
        hasBookings: false,
        availability: 'unavailable'
      });
    }


    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateStr = date?.toISOString()?.split('T')?.[0];
      const dayBookings = bookings?.filter((booking) =>
      booking?.date === dateStr
      );
      const daySlots = availableSlots?.filter((slot) =>
      slot?.date === dateStr
      );

      days?.push({
        date,
        isCurrentMonth: true,
        isToday: date?.toDateString() === new Date()?.toDateString(),
        hasBookings: dayBookings?.length > 0,
        bookingCount: dayBookings?.length,
        availableCount: daySlots?.length,
        availability: daySlots?.length > 0 ? 'available' : 'unavailable'
      });
    }


    const totalCells = Math.ceil(days?.length / 7) * 7;
    for (let day = 1; days?.length < totalCells; day++) {
      const nextDate = new Date(year, month + 1, day);
      days?.push({
        date: nextDate,
        isCurrentMonth: false,
        isToday: false,
        hasBookings: false,
        availability: 'unavailable'
      });
    }

    return days;
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate?.setMonth(currentDate?.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const navigateToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    onDateSelect(today);
  };

  const handleDateClick = (dayInfo) => {
    if (dayInfo?.availability === 'available') {
      onDateSelect(dayInfo?.date);
    }
  };

  const getDateClasses = (dayInfo) => {
    const baseClasses = "relative w-full h-12 flex items-center justify-center text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer";

    if (!dayInfo?.isCurrentMonth) {
      return `${baseClasses} text-text-secondary/40 hover:bg-muted/50`;
    }

    if (dayInfo?.isToday) {
      return `${baseClasses} bg-primary text-primary-foreground ring-2 ring-primary/20`;
    }

    if (selectedDate && dayInfo?.date?.toDateString() === selectedDate?.toDateString()) {
      return `${baseClasses} bg-accent text-accent-foreground ring-2 ring-accent/20`;
    }

    if (dayInfo?.availability === 'available') {
      return `${baseClasses} text-foreground hover:bg-muted border border-border hover:border-primary/30`;
    }

    return `${baseClasses} text-text-secondary/60 bg-muted/30 cursor-not-allowed`;
  };

  const renderMonthView = () => {
    const days = getDaysInMonth(currentDate);

    return (
      <div className="space-y-4">
        {}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-semibold text-foreground">
              {months?.[currentDate?.getMonth()]} {currentDate?.getFullYear()}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={navigateToToday}
              className="text-primary hover:text-primary/80">
              
              Today
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronLeft"
              onClick={() => navigateMonth(-1)} />
            
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronRight"
              onClick={() => navigateMonth(1)} />
            
          </div>
        </div>
        {}
        <div className="grid grid-cols-7 gap-1">
          {weekDays?.map((day) =>
          <div key={day} className="h-10 flex items-center justify-center">
              <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">
                {day}
              </span>
            </div>
          )}
        </div>
        {}
        <div className="grid grid-cols-7 gap-1">
          {days?.map((dayInfo, index) =>
          <div
            key={index}
            className={getDateClasses(dayInfo)}
            onClick={() => handleDateClick(dayInfo)}
            onMouseEnter={() => setHoveredDate(dayInfo?.date)}
            onMouseLeave={() => setHoveredDate(null)}>
            
              <span className="relative z-10">
                {dayInfo?.date?.getDate()}
              </span>
              
              {}
              {dayInfo?.hasBookings &&
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-0.5">
                  {Array.from({ length: Math.min(dayInfo?.bookingCount, 3) })?.map((_, i) =>
              <div
                key={i}
                className="w-1 h-1 bg-warning rounded-full" />

              )}
                  {dayInfo?.bookingCount > 3 &&
              <div className="w-1 h-1 bg-warning rounded-full opacity-60" />
              }
                </div>
            }

              {}
              {dayInfo?.availability === 'available' &&
            <div className="absolute top-1 right-1 w-2 h-2 bg-success rounded-full" />
            }
            </div>
          )}
        </div>
        {}
        <div className="flex items-center justify-center space-x-6 pt-4 border-t border-border">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full" />
            <span className="text-xs text-text-secondary">Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded-full" />
            <span className="text-xs text-text-secondary">Has Bookings</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-muted border border-border rounded-full" />
            <span className="text-xs text-text-secondary">Unavailable</span>
          </div>
        </div>
      </div>);

  };

  const renderWeekView = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek?.setDate(currentDate?.getDate() - currentDate?.getDay());

    const weekDates = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date?.setDate(startOfWeek?.getDate() + i);
      return date;
    });

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">
            Week of {startOfWeek?.toLocaleDateString()}
          </h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronLeft"
              onClick={() => {
                const newDate = new Date(currentDate);
                newDate?.setDate(currentDate?.getDate() - 7);
                setCurrentDate(newDate);
              }} />
            
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronRight"
              onClick={() => {
                const newDate = new Date(currentDate);
                newDate?.setDate(currentDate?.getDate() + 7);
                setCurrentDate(newDate);
              }} />
            
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {weekDates?.map((date, index) => {
            const dateStr = date?.toISOString()?.split('T')?.[0];
            const dayBookings = bookings?.filter((booking) => booking?.date === dateStr);
            const daySlots = availableSlots?.filter((slot) => slot?.date === dateStr);

            return (
              <div
                key={index}
                className="bg-card border border-border rounded-lg p-3 min-h-[120px]">
                
                <div className="text-center mb-2">
                  <div className="text-xs text-text-secondary font-medium">
                    {weekDays?.[date?.getDay()]}
                  </div>
                  <div className={`text-lg font-semibold ${
                  date?.toDateString() === new Date()?.toDateString() ?
                  'text-primary' : 'text-foreground'}`
                  }>
                    {date?.getDate()}
                  </div>
                </div>
                <div className="space-y-1">
                  {dayBookings?.slice(0, 3)?.map((booking, i) =>
                  <div
                    key={i}
                    className="text-xs bg-warning/10 text-warning px-2 py-1 rounded truncate">
                    
                      {booking?.title}
                    </div>
                  )}
                  {dayBookings?.length > 3 &&
                  <div className="text-xs text-text-secondary text-center">
                      +{dayBookings?.length - 3} more
                    </div>
                  }
                </div>
              </div>);

          })}
        </div>
      </div>);

  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      {}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={20} className="text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Calendar</h2>
        </div>
        
        <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
          <Button
            variant={viewMode === 'month' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('month')}>
            
            Month
          </Button>
          <Button
            variant={viewMode === 'week' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('week')}>
            
            Week
          </Button>
        </div>
      </div>

      {}
      {viewMode === 'month' ? renderMonthView() : renderWeekView()}
    </div>);

};

export default BookingCalendar;