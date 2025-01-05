import React from 'react';
import { Home, Users, Calendar, FileText, Settings, LogOut, Activity, Pill, Stethoscope } from 'lucide-react';

interface SidebarProps {
  onNavigate: (page: 'dashboard' | 'patients' | 'appointments' | 'vitals' | 'medications' | 'records' | 'settings') => void;
  currentPage: string;
  darkMode: boolean;
}

export default function Sidebar({ onNavigate, currentPage, darkMode }: SidebarProps) {
  return (
    <div className={`${darkMode ? 'bg-gray-800 border-gray-700 text-gray-100' : 'bg-white border-gray-200 text-secondary-600'} border-r w-64 min-h-screen p-4`}>
      <div className="flex items-center gap-2 mb-8">
        <Stethoscope className="w-8 h-8 text-primary-600" />
        <div>
          <span className="text-xl font-bold text-primary-600">MedCare</span>
          <span className={`text-xs block ${darkMode ? 'text-gray-400' : 'text-secondary-500'}`}>Healthcare System</span>
        </div>
      </div>
      
      <nav className="space-y-1">
        {[
          { icon: Home, label: 'Dashboard', value: 'dashboard' },
          { icon: Users, label: 'Patients', value: 'patients' },
          { icon: Calendar, label: 'Appointments', value: 'appointments' },
          { icon: Activity, label: 'Vitals', value: 'vitals' },
          { icon: Pill, label: 'Medications', value: 'medications' },
          { icon: FileText, label: 'Records', value: 'records' },
          { icon: Settings, label: 'Settings', value: 'settings' },
        ].map(({ icon: Icon, label, value }) => (
          <button
            key={label}
            onClick={() => onNavigate(value as any)}
            className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${
              currentPage === value
                ? 'bg-primary-50 text-primary-700 font-medium'
                : darkMode 
                ? 'hover:bg-gray-700 text-gray-100'
                : 'hover:bg-gray-50 text-secondary-600'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className={`mt-8 pt-8 ${darkMode ? 'border-gray-700' : 'border-gray-200'} border-t`}>
        <div className="flex items-center gap-3 mb-6 px-3">
          <img
            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=40&h=40"
            alt="Doctor profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-secondary-900'}`}>Dr. Sarah Smith</p>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-secondary-500'}`}>Cardiologist</p>
          </div>
        </div>

        <button className={`flex items-center gap-3 w-full p-3 ${darkMode ? 'text-gray-100 hover:bg-gray-700' : 'text-secondary-600 hover:bg-gray-50'} rounded-lg transition-colors`}>
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}
