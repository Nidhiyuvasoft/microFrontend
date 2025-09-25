import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import BookingCalendar from './components/BookingCalendar';
import BookingForm from './components/BookingForm';
import ResourceCard from './components/ResourceCard';
import BookingList from './components/BookingList';
import BookingStats from './components/BookingStats';

const BookingInterface = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('calendar');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedResource, setSelectedResource] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [calendarViewMode, setCalendarViewMode] = useState('month');
  const [bookingToEdit, setBookingToEdit] = useState(null);


  const [resources] = useState([
  {
    id: 'room-001',
    name: 'Executive Conference Room',
    type: 'conference_room',
    location: 'Floor 12, Building A',
    capacity: 16,
    status: 'available',
    hourlyRate: 75,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
    description: 'Premium conference room with state-of-the-art AV equipment and city views.',
    amenities: ['4K Display', 'Video Conference', 'Whiteboard', 'Coffee Station'],
    minBookingHours: 1,
    maxBookingHours: 8,
    advanceNotice: 24,
    requiresApproval: true
  },
  {
    id: 'room-002',
    name: 'Innovation Lab',
    type: 'training_room',
    location: 'Floor 8, Building B',
    capacity: 24,
    status: 'available',
    hourlyRate: 50,
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
    description: 'Creative workspace designed for brainstorming and collaborative sessions.',
    amenities: ['Interactive Whiteboard', 'Flexible Seating', 'Projector', 'Sound System'],
    minBookingHours: 2,
    maxBookingHours: 6,
    advanceNotice: 12,
    requiresApproval: false
  },
  {
    id: 'room-003',
    name: 'Auditorium Alpha',
    type: 'auditorium',
    location: 'Ground Floor, Main Building',
    capacity: 150,
    status: 'busy',
    hourlyRate: 200,
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop',
    description: 'Large auditorium perfect for presentations, seminars, and company events.',
    amenities: ['Stage Lighting', 'Professional Sound', 'Live Streaming', 'Podium'],
    minBookingHours: 3,
    maxBookingHours: 12,
    advanceNotice: 72,
    requiresApproval: true
  },
  {
    id: 'room-004',
    name: 'Focus Pod 1',
    type: 'meeting_room',
    location: 'Floor 5, Building A',
    capacity: 4,
    status: 'available',
    hourlyRate: 25,
    image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=400&h=300&fit=crop',
    description: 'Intimate meeting space perfect for small team discussions and one-on-ones.',
    amenities: ['TV Display', 'Wireless Charging', 'Privacy Glass', 'Plants'],
    minBookingHours: 1,
    maxBookingHours: 4,
    advanceNotice: 2,
    requiresApproval: false
  },
  {
    id: 'room-005',
    name: 'Wellness Room',
    type: 'workspace',
    location: 'Floor 3, Building C',
    capacity: 8,
    status: 'maintenance',
    hourlyRate: 0,
    image: 'https://images.unsplash.com/photo-1571624436279-b272aff752b5?w=400&h=300&fit=crop',
    description: 'Quiet space for meditation, yoga, and wellness activities.',
    amenities: ['Yoga Mats', 'Sound System', 'Aromatherapy', 'Natural Light'],
    minBookingHours: 1,
    maxBookingHours: 3,
    advanceNotice: 24,
    requiresApproval: false
  },
  {
    id: 'room-006',
    name: 'Rooftop Terrace',
    type: 'facility',
    location: 'Rooftop, Building A',
    capacity: 50,
    status: 'available',
    hourlyRate: 100,
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&h=300&fit=crop',
    description: 'Open-air venue perfect for team events, celebrations, and networking.',
    amenities: ['Outdoor Seating', 'BBQ Grill', 'City Views', 'Weather Protection'],
    minBookingHours: 2,
    maxBookingHours: 8,
    advanceNotice: 48,
    requiresApproval: true
  }]
  );


  const [bookings, setBookings] = useState([
  {
    id: 'booking-001',
    title: 'Q4 Strategy Planning',
    description: 'Quarterly business review and strategic planning session for the executive team.',
    resourceId: 'room-001',
    date: '2024-09-25',
    startTime: '09:00',
    endTime: '12:00',
    email: 'sarah.johnson@company.com',
    phone: '+1 (555) 123-4567',
    attendees: 12,
    status: 'confirmed',
    priority: 'high',
    requirements: ['projector', 'catering', 'whiteboard'],
    isRecurring: false,
    createdAt: '2024-09-20T10:30:00Z'
  },
  {
    id: 'booking-002',
    title: 'Design Sprint Workshop',
    description: 'Five-day design sprint for the new mobile app project.',
    resourceId: 'room-002',
    date: '2024-09-26',
    startTime: '10:00',
    endTime: '16:00',
    email: 'mike.chen@company.com',
    phone: '+1 (555) 234-5678',
    attendees: 8,
    status: 'confirmed',
    priority: 'medium',
    requirements: ['whiteboard', 'projector'],
    isRecurring: true,
    recurringType: 'daily',
    recurringEnd: '2024-09-30',
    createdAt: '2024-09-18T14:15:00Z'
  },
  {
    id: 'booking-003',
    title: 'All Hands Meeting',
    description: 'Monthly company-wide meeting with leadership updates and Q&A session.',
    resourceId: 'room-003',
    date: '2024-09-27',
    startTime: '14:00',
    endTime: '16:00',
    email: 'hr@company.com',
    phone: '+1 (555) 345-6789',
    attendees: 120,
    status: 'pending',
    priority: 'high',
    requirements: ['video_conference', 'catering'],
    isRecurring: true,
    recurringType: 'monthly',
    recurringEnd: '2024-12-27',
    createdAt: '2024-09-15T09:00:00Z'
  },
  {
    id: 'booking-004',
    title: 'Client Presentation',
    description: 'Product demo and proposal presentation for potential enterprise client.',
    resourceId: 'room-001',
    date: '2024-09-24',
    startTime: '15:00',
    endTime: '17:00',
    email: 'sales@company.com',
    phone: '+1 (555) 456-7890',
    attendees: 6,
    status: 'confirmed',
    priority: 'urgent',
    requirements: ['projector', 'video_conference'],
    isRecurring: false,
    createdAt: '2024-09-22T11:45:00Z'
  },
  {
    id: 'booking-005',
    title: 'Team Standup',
    description: 'Daily development team standup meeting.',
    resourceId: 'room-004',
    date: '2024-09-24',
    startTime: '09:30',
    endTime: '10:00',
    email: 'dev-team@company.com',
    phone: '+1 (555) 567-8901',
    attendees: 4,
    status: 'confirmed',
    priority: 'low',
    requirements: [],
    isRecurring: true,
    recurringType: 'daily',
    recurringEnd: '2024-12-31',
    createdAt: '2024-09-01T08:00:00Z'
  },
  {
    id: 'booking-006',
    title: 'Yoga Session',
    description: 'Weekly team wellness yoga session.',
    resourceId: 'room-005',
    date: '2024-09-25',
    startTime: '17:30',
    endTime: '18:30',
    email: 'wellness@company.com',
    phone: '+1 (555) 678-9012',
    attendees: 8,
    status: 'cancelled',
    priority: 'low',
    requirements: [],
    isRecurring: true,
    recurringType: 'weekly',
    recurringEnd: '2024-12-25',
    createdAt: '2024-09-10T16:00:00Z'
  }]
  );


  const [availableSlots] = useState([
  {
    id: 'slot-001',
    resourceId: 'room-001',
    date: '2024-09-24',
    startTime: '08:00',
    endTime: '09:00'
  },
  {
    id: 'slot-002',
    resourceId: 'room-001',
    date: '2024-09-24',
    startTime: '13:00',
    endTime: '15:00'
  },
  {
    id: 'slot-003',
    resourceId: 'room-002',
    date: '2024-09-24',
    startTime: '08:00',
    endTime: '10:00'
  },
  {
    id: 'slot-004',
    resourceId: 'room-002',
    date: '2024-09-24',
    startTime: '16:00',
    endTime: '18:00'
  },
  {
    id: 'slot-005',
    resourceId: 'room-004',
    date: '2024-09-24',
    startTime: '10:00',
    endTime: '12:00'
  },
  {
    id: 'slot-006',
    resourceId: 'room-004',
    date: '2024-09-24',
    startTime: '14:00',
    endTime: '16:00'
  }]
  );

  const tabs = [
  { id: 'calendar', label: 'Calendar View', icon: 'Calendar' },
  { id: 'resources', label: 'Resources', icon: 'Building' },
  { id: 'bookings', label: 'My Bookings', icon: 'List' },
  { id: 'analytics', label: 'Analytics', icon: 'BarChart3' }];


  const handleDateSelect = (date) => {
    setSelectedDate(date);
    if (activeTab !== 'calendar') {
      setActiveTab('calendar');
    }
  };

  const handleResourceSelect = (resource) => {
    setSelectedResource(resource);
    setShowBookingForm(true);
  };

  const handleBookingSubmit = async (bookingData) => {
    try {

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setBookings((prev) => [...prev, bookingData]);
      setShowBookingForm(false);
      setSelectedResource(null);
      setBookingToEdit(null);


      console.log('Booking created successfully:', bookingData);
    } catch (error) {
      console.error('Failed to create booking:', error);
    }
  };

  const handleBookingEdit = (booking) => {
    setBookingToEdit(booking);
    setSelectedResource(resources?.find((r) => r?.id === booking?.resourceId));
    setShowBookingForm(true);
  };

  const handleBookingCancel = async (booking) => {
    try {

      await new Promise((resolve) => setTimeout(resolve, 500));

      setBookings((prev) =>
      prev?.map((b) =>
      b?.id === booking?.id ?
      { ...b, status: 'cancelled' } :
      b
      )
      );

      console.log('Booking cancelled:', booking?.id);
    } catch (error) {
      console.error('Failed to cancel booking:', error);
    }
  };

  const handleBookingView = (booking) => {

    console.log('Viewing booking:', booking);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'calendar':
        return (
          <div className="space-y-6">
            <BookingCalendar
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
              bookings={bookings}
              availableSlots={availableSlots}
              viewMode={calendarViewMode}
              onViewModeChange={setCalendarViewMode} />
            
            {selectedDate &&
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {resources?.filter((r) => r?.status !== 'maintenance')?.slice(0, 3)?.map((resource) =>
              <ResourceCard
                key={resource?.id}
                resource={resource}
                onSelect={handleResourceSelect}
                isSelected={selectedResource?.id === resource?.id}
                availableSlots={availableSlots}
                bookings={bookings}
                selectedDate={selectedDate} />

              )}
              </div>
            }
          </div>);


      case 'resources':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Available Resources</h2>
                <p className="text-text-secondary">Browse and book meeting rooms, facilities, and equipment</p>
              </div>
              <Button
                variant="default"
                iconName="Plus"
                iconPosition="left"
                onClick={() => setShowBookingForm(true)}>
                
                Quick Book
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources?.map((resource) =>
              <ResourceCard
                key={resource?.id}
                resource={resource}
                onSelect={handleResourceSelect}
                isSelected={selectedResource?.id === resource?.id}
                availableSlots={availableSlots}
                bookings={bookings}
                selectedDate={selectedDate} />

              )}
            </div>
          </div>);


      case 'bookings':
        return (
          <BookingList
            bookings={bookings}
            resources={resources}
            onEdit={handleBookingEdit}
            onCancel={handleBookingCancel}
            onView={handleBookingView} />);



      case 'analytics':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Booking Analytics</h2>
              <p className="text-text-secondary">Insights and trends for resource utilization and booking patterns</p>
            </div>
            
            <BookingStats
              bookings={bookings}
              resources={resources}
              selectedDate={selectedDate} />
            
          </div>);


      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} />
      
      <main className={`pt-16 transition-all duration-300 ${
      sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'}`
      }>
        <div className="p-6">
          {}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon name="Calendar" size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Booking Interface</h1>
                <p className="text-text-secondary">
                  Comprehensive booking management with real-time availability and resource optimization
                </p>
              </div>
            </div>
            
            {}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Building" size={16} className="text-primary" />
                  <span className="text-sm text-text-secondary">Resources</span>
                </div>
                <div className="text-2xl font-bold text-foreground mt-1">{resources?.length}</div>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Calendar" size={16} className="text-success" />
                  <span className="text-sm text-text-secondary">Active Bookings</span>
                </div>
                <div className="text-2xl font-bold text-foreground mt-1">
                  {bookings?.filter((b) => b?.status === 'confirmed')?.length}
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} className="text-warning" />
                  <span className="text-sm text-text-secondary">Pending</span>
                </div>
                <div className="text-2xl font-bold text-foreground mt-1">
                  {bookings?.filter((b) => b?.status === 'pending')?.length}
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Icon name="TrendingUp" size={16} className="text-accent" />
                  <span className="text-sm text-text-secondary">Utilization</span>
                </div>
                <div className="text-2xl font-bold text-foreground mt-1">78%</div>
              </div>
            </div>
          </div>

          {}
          <div className="mb-6">
            <div className="border-b border-border">
              <nav className="flex space-x-8">
                {tabs?.map((tab) =>
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab?.id ?
                  'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-foreground hover:border-border'}`
                  }>
                  
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                )}
              </nav>
            </div>
          </div>

          {}
          <div className="space-y-6">
            {renderTabContent()}
          </div>

          {}
          {showBookingForm &&
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
              <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <BookingForm
                selectedDate={selectedDate}
                selectedResource={selectedResource}
                onSubmit={handleBookingSubmit}
                onCancel={() => {
                  setShowBookingForm(false);
                  setSelectedResource(null);
                  setBookingToEdit(null);
                }}
                availableSlots={availableSlots}
                resources={resources} />
              
              </div>
            </div>
          }

          {}
          <div className="fixed bottom-4 right-4 bg-card border border-border rounded-lg p-3 shadow-lg">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-xs text-text-secondary">Booking Module Active</span>
            </div>
          </div>
        </div>
      </main>
    </div>);

};

export default BookingInterface;