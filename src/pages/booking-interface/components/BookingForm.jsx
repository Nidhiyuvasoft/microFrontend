import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const BookingForm = ({
  selectedDate,
  selectedResource,
  onSubmit,
  onCancel,
  availableSlots = [],
  resources = [],
  className = ''
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    resourceId: selectedResource?.id || '',
    date: selectedDate ? selectedDate?.toISOString()?.split('T')?.[0] : '',
    startTime: '',
    endTime: '',
    attendees: '',
    email: '',
    phone: '',
    isRecurring: false,
    recurringType: 'weekly',
    recurringEnd: '',
    requirements: [],
    priority: 'medium'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [conflictWarning, setConflictWarning] = useState(null);

  const timeSlots = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'];


  const priorityOptions = [
  { value: 'low', label: 'Low Priority' },
  { value: 'medium', label: 'Medium Priority' },
  { value: 'high', label: 'High Priority' },
  { value: 'urgent', label: 'Urgent' }];


  const recurringOptions = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' }];


  const requirementOptions = [
  { value: 'projector', label: 'Projector' },
  { value: 'whiteboard', label: 'Whiteboard' },
  { value: 'video_conference', label: 'Video Conference Setup' },
  { value: 'catering', label: 'Catering' },
  { value: 'parking', label: 'Parking Space' },
  { value: 'accessibility', label: 'Accessibility Features' }];


  useEffect(() => {
    if (selectedDate) {
      setFormData((prev) => ({
        ...prev,
        date: selectedDate?.toISOString()?.split('T')?.[0]
      }));
    }
  }, [selectedDate]);

  useEffect(() => {
    if (selectedResource) {
      setFormData((prev) => ({
        ...prev,
        resourceId: selectedResource?.id
      }));
    }
  }, [selectedResource]);

  useEffect(() => {

    if (formData?.date && formData?.startTime && formData?.endTime && formData?.resourceId) {
      checkForConflicts();
    }
  }, [formData?.date, formData?.startTime, formData?.endTime, formData?.resourceId]);

  const checkForConflicts = () => {
    const conflicts = availableSlots?.filter((slot) =>
    slot?.resourceId === formData?.resourceId &&
    slot?.date === formData?.date && (
    formData?.startTime >= slot?.startTime && formData?.startTime < slot?.endTime ||
    formData?.endTime > slot?.startTime && formData?.endTime <= slot?.endTime ||
    formData?.startTime <= slot?.startTime && formData?.endTime >= slot?.endTime)
    );

    if (conflicts?.length > 0) {
      setConflictWarning(`Conflict detected with existing booking: ${conflicts?.[0]?.title}`);
    } else {
      setConflictWarning(null);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.title?.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData?.resourceId) {
      newErrors.resourceId = 'Please select a resource';
    }

    if (!formData?.date) {
      newErrors.date = 'Date is required';
    }

    if (!formData?.startTime) {
      newErrors.startTime = 'Start time is required';
    }

    if (!formData?.endTime) {
      newErrors.endTime = 'End time is required';
    }

    if (formData?.startTime && formData?.endTime && formData?.startTime >= formData?.endTime) {
      newErrors.endTime = 'End time must be after start time';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (formData?.isRecurring && !formData?.recurringEnd) {
      newErrors.recurringEnd = 'Recurring end date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));


    if (errors?.[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleRequirementChange = (requirement, checked) => {
    setFormData((prev) => ({
      ...prev,
      requirements: checked ?
      [...prev?.requirements, requirement] :
      prev?.requirements?.filter((r) => r !== requirement)
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const bookingData = {
        ...formData,
        id: Date.now()?.toString(),
        createdAt: new Date()?.toISOString(),
        status: 'confirmed'
      };

      await onSubmit(bookingData);
    } catch (error) {
      console.error('Booking submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resourceOptions = resources?.map((resource) => ({
    value: resource?.id,
    label: resource?.name,
    description: `${resource?.type} • Capacity: ${resource?.capacity}`
  }));

  const timeSlotOptions = timeSlots?.map((time) => ({
    value: time,
    label: time
  }));

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="CalendarPlus" size={20} className="text-primary" />
          <h2 className="text-xl font-semibold text-foreground">New Booking</h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconName="X"
          onClick={onCancel} />
        
      </div>
      {conflictWarning &&
      <div className="mb-6 p-4 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-warning" />
            <span className="text-sm text-warning font-medium">Scheduling Conflict</span>
          </div>
          <p className="text-sm text-warning/80 mt-1">{conflictWarning}</p>
        </div>
      }
      <form onSubmit={handleSubmit} className="space-y-6">
        {}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Basic Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Booking Title"
              type="text"
              placeholder="Enter booking title"
              value={formData?.title}
              onChange={(e) => handleInputChange('title', e?.target?.value)}
              error={errors?.title}
              required
              className="md:col-span-2" />
            

            <Input
              label="Description"
              type="text"
              placeholder="Brief description of the booking"
              value={formData?.description}
              onChange={(e) => handleInputChange('description', e?.target?.value)}
              className="md:col-span-2" />
            

            <Select
              label="Resource"
              options={resourceOptions}
              value={formData?.resourceId}
              onChange={(value) => handleInputChange('resourceId', value)}
              error={errors?.resourceId}
              required
              searchable />
            

            <Select
              label="Priority"
              options={priorityOptions}
              value={formData?.priority}
              onChange={(value) => handleInputChange('priority', value)} />
            
          </div>
        </div>

        {}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Date & Time</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Date"
              type="date"
              value={formData?.date}
              onChange={(e) => handleInputChange('date', e?.target?.value)}
              error={errors?.date}
              required />
            

            <Select
              label="Start Time"
              options={timeSlotOptions}
              value={formData?.startTime}
              onChange={(value) => handleInputChange('startTime', value)}
              error={errors?.startTime}
              required
              searchable />
            

            <Select
              label="End Time"
              options={timeSlotOptions}
              value={formData?.endTime}
              onChange={(value) => handleInputChange('endTime', value)}
              error={errors?.endTime}
              required
              searchable />
            
          </div>
        </div>

        {}
        <div className="space-y-4">
          <Checkbox
            label="Recurring Booking"
            description="Create a series of recurring bookings"
            checked={formData?.isRecurring}
            onChange={(e) => handleInputChange('isRecurring', e?.target?.checked)} />
          

          {formData?.isRecurring &&
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
              <Select
              label="Recurring Type"
              options={recurringOptions}
              value={formData?.recurringType}
              onChange={(value) => handleInputChange('recurringType', value)} />
            

              <Input
              label="End Date"
              type="date"
              value={formData?.recurringEnd}
              onChange={(e) => handleInputChange('recurringEnd', e?.target?.value)}
              error={errors?.recurringEnd}
              required />
            
            </div>
          }
        </div>

        {}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Contact Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="your.email@company.com"
              value={formData?.email}
              onChange={(e) => handleInputChange('email', e?.target?.value)}
              error={errors?.email}
              required />
            

            <Input
              label="Phone Number"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={formData?.phone}
              onChange={(e) => handleInputChange('phone', e?.target?.value)} />
            

            <Input
              label="Expected Attendees"
              type="number"
              placeholder="Number of attendees"
              value={formData?.attendees}
              onChange={(e) => handleInputChange('attendees', e?.target?.value)}
              min="1" />
            
          </div>
        </div>

        {}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Additional Requirements</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {requirementOptions?.map((requirement) =>
            <Checkbox
              key={requirement?.value}
              label={requirement?.label}
              checked={formData?.requirements?.includes(requirement?.value)}
              onChange={(e) => handleRequirementChange(requirement?.value, e?.target?.checked)} />

            )}
          </div>
        </div>

        {}
        <div className="flex items-center justify-end space-x-3 pt-6 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}>
            
            Cancel
          </Button>
          
          <Button
            type="submit"
            variant="default"
            loading={isSubmitting}
            iconName="Check"
            iconPosition="left"
            className="bg-success hover:bg-success/90">
            
            {isSubmitting ? 'Creating Booking...' : 'Create Booking'}
          </Button>
        </div>
      </form>
    </div>);

};

export default BookingForm;