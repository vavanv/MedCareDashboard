import React from 'react';
import { FileText, Search, Filter, Download, Upload, Clock, Tag, Folder } from 'lucide-react';

const records = [
  {
    id: '1',
    title: 'Blood Test Results',
    patient: 'Sarah Johnson',
    type: 'Lab Report',
    date: '2024-03-15',
    department: 'Hematology',
    size: '2.4 MB',
    status: 'Final'
  },
  {
    id: '2',
    title: 'X-Ray Report',
    patient: 'Michael Chen',
    type: 'Radiology',
    date: '2024-03-14',
    department: 'Radiology',
    size: '8.1 MB',
    status: 'Preliminary'
  },
  {
    id: '3',
    title: 'Post-Surgery Notes',
    patient: 'Emily Davis',
    type: 'Clinical Notes',
    date: '2024-03-13',
    department: 'Surgery',
    size: '1.1 MB',
    status: 'Final'
  }
];

export default function Records() {
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">Medical Records</h1>
            <p className="text-secondary-600 dark:text-gray-400">Access and manage patient medical records</p>
          </div>

          <div className="flex gap-3">
            <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-secondary-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
              <Upload className="w-4 h-4" />
              <span>Upload</span>
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-secondary-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { 
              label: 'Total Records', 
              value: '1,234', 
              icon: FileText, 
              trend: '+28 this month', 
              color: 'bg-primary-500' 
            },
            { 
              label: 'Recent Uploads', 
              value: '48', 
              icon: Upload, 
              trend: 'Last 7 days', 
              color: 'bg-primary-500' 
            },
            { 
              label: 'Pending Review', 
              value: '12', 
              icon: Clock, 
              trend: 'Requires attention', 
              color: 'bg-amber-500' 
            },
            { 
              label: 'Categories', 
              value: '8', 
              icon: Tag, 
              trend: 'Active categories', 
              color: 'bg-green-500' 
            }
          ].map(({ label, value, icon: Icon, trend, color }) => (
            <div key={label} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className={`${color} bg-opacity-10 p-2 rounded-lg`}>
                  <Icon className={`w-5 h-5 ${color.replace('bg-', 'text-')}`} />
                </div>
                <span className="text-secondary-600 dark:text-gray-400">{label}</span>
              </div>
              <p className="text-2xl font-semibold text-secondary-900 dark:text-white">{value}</p>
              <p className="text-sm text-secondary-500 dark:text-gray-400 mt-1">{trend}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
              <h2 className="font-semibold text-secondary-900 dark:text-white mb-4">Categories</h2>
              <div className="space-y-2">
                {[
                  { name: 'Lab Reports', count: 156 },
                  { name: 'Clinical Notes', count: 89 },
                  { name: 'Radiology', count: 64 },
                  { name: 'Prescriptions', count: 212 },
                  { name: 'Surgery Records', count: 45 },
                  { name: 'Discharge Summaries', count: 78 }
                ].map(category => (
                  <button
                    key={category.name}
                    className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-left"
                  >
                    <div className="flex items-center gap-2">
                      <Folder className="w-4 h-4 text-secondary-400" />
                      <span className="text-secondary-900 dark:text-white">{category.name}</span>
                    </div>
                    <span className="text-sm text-secondary-500 dark:text-gray-400">{category.count}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Records List */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Search records..."
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                    />
                    <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                  <select className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option value="all">All Types</option>
                    <option value="lab">Lab Reports</option>
                    <option value="clinical">Clinical Notes</option>
                    <option value="radiology">Radiology</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Patient</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {records.map((record) => (
                      <tr key={record.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-secondary-400" />
                            <div>
                              <div className="text-sm font-medium text-secondary-900 dark:text-white">{record.title}</div>
                              <div className="text-sm text-secondary-500 dark:text-gray-400">{record.department}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-secondary-900 dark:text-white">{record.patient}</td>
                        <td className="px-6 py-4 text-sm text-secondary-900 dark:text-white">{record.type}</td>
                        <td className="px-6 py-4 text-sm text-secondary-900 dark:text-white">{record.date}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs ${
                            record.status === 'Final'
                              ? 'bg-green-50 text-green-700 border border-green-100 dark:bg-green-900 dark:text-green-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-100 dark:bg-amber-900 dark:text-amber-200'
                          }`}>
                            {record.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
