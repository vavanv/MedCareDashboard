import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, Filter, MoreVertical } from 'lucide-react';
import { format } from 'date-fns';
import { Patient } from '../types';

interface PatientTableProps {
  patients: Patient[];
  onPatientClick?: (patient: Patient) => void;
}

type SortField = 'name' | 'id' | 'condition' | 'status' | 'lastVisit';
type SortDirection = 'asc' | 'desc';

const ITEMS_PER_PAGE = 10;

export default function PatientTable({ patients: initialPatients, onPatientClick }: PatientTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('lastVisit');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const sortPatients = (a: Patient, b: Patient) => {
    const direction = sortDirection === 'asc' ? 1 : -1;
    
    switch (sortField) {
      case 'name':
        return direction * a.name.localeCompare(b.name);
      case 'id':
        return direction * a.id.localeCompare(b.id);
      case 'condition':
        return direction * a.condition.localeCompare(b.condition);
      case 'status':
        return direction * a.status.localeCompare(b.status);
      case 'lastVisit':
        return direction * new Date(a.lastVisit).getTime() - new Date(b.lastVisit).getTime();
      default:
        return 0;
    }
  };

  const filteredPatients = initialPatients
    .filter(patient => 
      (statusFilter === 'all' || patient.status === statusFilter) &&
      (patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       patient.id.includes(searchTerm) ||
       patient.condition.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort(sortPatients);

  // Pagination logic
  const totalPages = Math.ceil(filteredPatients.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedPatients = filteredPatients.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
  };

  const statusColors = {
    Stable: 'bg-green-50 text-green-700 border-green-100 dark:bg-green-900 dark:text-green-200',
    Critical: 'bg-red-50 text-red-700 border-red-100 dark:bg-red-900 dark:text-red-200',
    Recovering: 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900 dark:text-amber-200'
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Search and Filter Section */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="Stable">Stable</option>
              <option value="Critical">Critical</option>
              <option value="Recovering">Recovering</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center gap-1">
                  Patient
                  <SortIcon field="name" />
                </div>
              </th>
              {/* ... rest of table headers ... */}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedPatients.map((patient) => (
              <tr 
                key={patient.id} 
                className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                onClick={() => onPatientClick?.(patient)}
              >
                {/* ... rest of table rows ... */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-700">
        <div className="text-sm text-secondary-600 dark:text-gray-400">
          Showing {startIndex + 1} to {Math.min(endIndex, filteredPatients.length)} of {filteredPatients.length} patients
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-700 text-secondary-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 rounded-lg ${
                page === currentPage
                  ? 'bg-primary-600 text-white'
                  : 'border border-gray-200 dark:border-gray-700 text-secondary-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-700 text-secondary-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
