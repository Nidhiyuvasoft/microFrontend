import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const UserProfile = ({ user, onUpdateProfile, onLogout, onDeleteAccount }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || user?.email?.split('@')?.[0],
    lastName: user?.lastName || '',
    email: user?.email,
    role: user?.role,
    company: user?.company || 'MicroFed Enterprise',
    bio: user?.bio || '',
    location: user?.location || '',
    website: user?.website || '',
    notifications: {
      email: user?.notifications?.email ?? true,
      security: user?.notifications?.security ?? true,
      updates: user?.notifications?.updates ?? false,
      marketing: user?.notifications?.marketing ?? false
    }
  });
  const [activeTab, setActiveTab] = useState('profile');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;

    if (name?.startsWith('notifications.')) {
      const notificationKey = name?.split('.')?.[1];
      setFormData((prev) => ({
        ...prev,
        notifications: {
          ...prev?.notifications,
          [notificationKey]: checked
        }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSave = () => {
    onUpdateProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || user?.email?.split('@')?.[0],
      lastName: user?.lastName || '',
      email: user?.email,
      role: user?.role,
      company: user?.company || 'MicroFed Enterprise',
      bio: user?.bio || '',
      location: user?.location || '',
      website: user?.website || '',
      notifications: {
        email: user?.notifications?.email ?? true,
        security: user?.notifications?.security ?? true,
        updates: user?.notifications?.updates ?? false,
        marketing: user?.notifications?.marketing ?? false
      }
    });
    setIsEditing(false);
  };

  const tabs = [
  { id: 'profile', label: 'Profile', icon: 'User' }];


  const securityEvents = [
  {
    id: 1,
    type: 'login',
    description: 'Successful login',
    timestamp: new Date(Date.now() - 300000),
    location: 'San Francisco, CA',
    device: 'Chrome on macOS'
  },
  {
    id: 2,
    type: 'password_change',
    description: 'Password changed',
    timestamp: new Date(Date.now() - 86400000 * 2),
    location: 'San Francisco, CA',
    device: 'Chrome on macOS'
  },
  {
    id: 3,
    type: 'login',
    description: 'Successful login',
    timestamp: new Date(Date.now() - 86400000 * 3),
    location: 'New York, NY',
    device: 'Firefox on Windows'
  }];


  const apiKeys = [
  {
    id: 1,
    name: 'Production API',
    key: 'mf_prod_••••••••••••••••••••••••••••••••',
    created: new Date(Date.now() - 86400000 * 30),
    lastUsed: new Date(Date.now() - 3600000),
    permissions: ['read', 'write']
  },
  {
    id: 2,
    name: 'Development API',
    key: 'mf_dev_••••••••••••••••••••••••••••••••',
    created: new Date(Date.now() - 86400000 * 15),
    lastUsed: new Date(Date.now() - 86400000),
    permissions: ['read']
  }];


  const renderProfileTab = () =>
  <div className="space-y-6">
      <div className="flex items-center space-x-6">
        <div className="relative">
          <Image
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`}
          alt="Profile Avatar"
          className="w-20 h-20 rounded-full bg-muted" />
        
          {isEditing &&
        <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors">
              <Icon name="Camera" size={16} />
            </button>
        }
        </div>
        
        <div className="flex-1">
          <h2 className="text-xl font-bold text-foreground">
            {formData?.firstName} {formData?.lastName}
          </h2>
          <p className="text-text-secondary">{formData?.role}</p>
          <p className="text-sm text-text-secondary">{formData?.company}</p>
        </div>
        
        <div className="flex space-x-2">
          {!isEditing ?
        <Button
          variant="outline"
          onClick={() => setIsEditing(true)}
          iconName="Edit"
          iconPosition="left">
          
              Edit Profile
            </Button> :

        <>
              <Button
            variant="outline"
            onClick={handleCancel}
            iconName="X"
            iconPosition="left">
            
                Cancel
              </Button>
              <Button
            variant="default"
            onClick={handleSave}
            iconName="Save"
            iconPosition="left">
            
                Save Changes
              </Button>
            </>
        }
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
        label="First Name"
        name="firstName"
        value={formData?.firstName}
        onChange={handleInputChange}
        disabled={!isEditing} />
      
        
        <Input
        label="Last Name"
        name="lastName"
        value={formData?.lastName}
        onChange={handleInputChange}
        disabled={!isEditing} />
      
        
        <Input
        label="Email Address"
        name="email"
        type="email"
        value={formData?.email}
        onChange={handleInputChange}
        disabled
        description="Email cannot be changed" />
      
        
        <Input
        label="Company"
        name="company"
        value={formData?.company}
        onChange={handleInputChange}
        disabled={!isEditing} />
      
        
        <Input
        label="Location"
        name="location"
        value={formData?.location}
        onChange={handleInputChange}
        disabled={!isEditing}
        placeholder="City, Country" />
      
        
        <Input
        label="Website"
        name="website"
        type="url"
        value={formData?.website}
        onChange={handleInputChange}
        disabled={!isEditing}
        placeholder="https://yourwebsite.com" />
      
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
        <textarea
        name="bio"
        value={formData?.bio}
        onChange={handleInputChange}
        disabled={!isEditing}
        rows={4}
        className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
        placeholder="Tell us about yourself..." />
      
      </div>
    </div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Account Settings</h1>
        </div>
        
        <Button
          variant="outline"
          onClick={onLogout}
          iconName="LogOut"
          iconPosition="left"
          className="text-error hover:text-error">
          
          Sign Out
        </Button>
      </div>
      <div className="bg-card border border-border rounded-lg">
        <div className="p-6">
          {activeTab === 'profile' && renderProfileTab()}
        </div>
      </div>
    </div>);

};

export default UserProfile;