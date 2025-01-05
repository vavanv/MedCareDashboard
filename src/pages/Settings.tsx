import React from 'react';
import { User, Bell, Shield, Key, Globe, Palette, HelpCircle, Mail } from 'lucide-react';

export default function Settings() {
  return (
    <div className="p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">Settings</h1>
          <p className="text-secondary-600 dark:text-gray-400">Manage your account and application preferences</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          {/* Profile Section */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=120&h=120"
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 dark:border-gray-700"
              />
              <div>
                <h2 className="text-xl font-semibold text-secondary-900 dark:text-white">Dr. Sarah Smith</h2>
                <p className="text-secondary-600 dark:text-gray-400">Cardiologist</p>
                <button className="mt-2 text-sm text-primary-600 hover:text-primary-700 font-medium">
                  Change Profile Photo
                </button>
              </div>
            </div>
          </div>

          {/* Settings Sections */}
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {/* Personal Information */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary-50 dark:bg-primary-900 rounded-lg">
                  <User className="w-5 h-5 text-primary-600 dark:text-primary-200" />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary-900 dark:text-white">Personal Information</h3>
                  <p className="text-sm text-secondary-600 dark:text-gray-400">Update your personal details and information</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'Full Name', value: 'Dr. Sarah Smith', type: 'text' },
                  { label: 'Email', value: 'sarah.smith@hospital.com', type: 'email' },
                  { label: 'Phone', value: '+1 (555) 123-4567', type: 'tel' },
                  { label: 'Department', value: 'Cardiology', type: 'text' }
                ].map(({ label, value, type }) => (
                  <div key={label}>
                    <label className="block text-sm font-medium text-secondary-700 dark:text-gray-300 mb-1">
                      {label}
                    </label>
                    <input
                      type={type}
                      defaultValue={value}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                ))}
                <button className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                  Save Changes
                </button>
              </div>
            </div>

            {/* Notifications */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary-50 dark:bg-primary-900 rounded-lg">
                  <Bell className="w-5 h-5 text-primary-600 dark:text-primary-200" />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary-900 dark:text-white">Notifications</h3>
                  <p className="text-sm text-secondary-600 dark:text-gray-400">Configure how you receive notifications</p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { label: 'Email Notifications', checked: true },
                  { label: 'Push Notifications', checked: true },
                  { label: 'SMS Alerts', checked: false },
                  { label: 'Critical Patient Updates', checked: true }
                ].map(({ label, checked }) => (
                  <label key={label} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      defaultChecked={checked}
                      className="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-700"
                    />
                    <span className="text-secondary-900 dark:text-white">{label}</span>
                  </label>
                ))}
                <button className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                  Save Preferences
                </button>
              </div>
            </div>

            {/* Privacy & Security */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary-50 dark:bg-primary-900 rounded-lg">
                  <Shield className="w-5 h-5 text-primary-600 dark:text-primary-200" />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary-900 dark:text-white">Privacy & Security</h3>
                  <p className="text-sm text-secondary-600 dark:text-gray-400">Manage your security preferences and data privacy</p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { label: 'Two-Factor Authentication', checked: true },
                  { label: 'Login Alerts', checked: true },
                  { label: 'Data Sharing', checked: false }
                ].map(({ label, checked }) => (
                  <label key={label} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      defaultChecked={checked}
                      className="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-700"
                    />
                    <span className="text-secondary-900 dark:text-white">{label}</span>
                  </label>
                ))}
                <button className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: HelpCircle, title: 'Help Center', description: 'Get help and support' },
            { icon: Mail, title: 'Contact Support', description: 'Reach out to our team' },
            { icon: Globe, title: 'Language', description: 'Change your language' },
            { icon: Palette, title: 'Appearance', description: 'Customize the interface' }
          ].map(({ icon: Icon, title, description }) => (
            <button
              key={title}
              className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="p-2 bg-primary-50 dark:bg-primary-900 rounded-lg">
                <Icon className="w-5 h-5 text-primary-600 dark:text-primary-200" />
              </div>
              <div className="text-left">
                <h3 className="font-medium text-secondary-900 dark:text-white">{title}</h3>
                <p className="text-sm text-secondary-600 dark:text-gray-400">{description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
