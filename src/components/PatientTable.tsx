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

const SortIcon = ({ field, sortField, sortDirection }: { 
  field: SortField; 
  sortField: SortField; 
  sortDirection: SortDirection 
}) => {
  if (sortField !== field) return null;
  return sortDirection === 'asc' ? (
    <ChevronUp className="w-4 h-4" />
  ) : (
    <ChevronDown className="w-4 h-4" />
  );
};

export default function PatientTable({ patients: initialPatients, onPatientClick }: PatientTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('lastVisit');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const filteredPatients = initialPatients
    .filter(patient => {
      const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.id.includes(searchTerm);
      const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const modifier = sortDirection === 'asc' ? 1 : -1;
      if (sortField === 'name') {
        return a.name.localeCompare(b.name) * modifier;
      }
      if (sortField === 'id') {
        return a.id.localeCompare(b.id) * modifier;
      }
      if (sortField === 'condition') {
        return a.condition.localeCompare(b.condition) * modifier;
      }
      if (sortField === 'status') {
        return a.status.localeCompare(b.status) * modifier;
      }
      if (sortField === 'lastVisit') {
        return (new Date(a.lastVisit).getTime() - new Date(b.lastVisit).getTime()) * modifier;
      }
      return 0;
    });

  const paginatedPatients = filteredPatients.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search patients..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="w-5 h-5 text-secondary-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Status</option>
            <option value="Stable">Stable</option>
            <option value="Critical">Critical</option>
            <option value="Recovering">Recovering</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto" style={{ maxHeight: 'calc(100vh - 300px)' }}>
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center gap-1">
                  Patient
                  <SortIcon field="name" sortField={sortField} sortDirection={sortDirection} />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('id')}
              >
                <div className="flex items-center gap-1">
                  ID
                  <SortIcon field="id" sortField={sortField} sortDirection={sortDirection} />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('condition')}
              >
                <div className="flex items-center gap-1">
                  Condition
                  <SortIcon field="condition" sortField={sortField} sortDirection={sortDirection} />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center gap-1">
                  Status
                  <SortIcon field="status" sortField={sortField} sortDirection={sortDirection} />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('lastVisit')}
              >
                <div className="flex items-center gap-1">
                  Last Visit
                  <SortIcon field="lastVisit" sortField={sortField} sortDirection={sortDirection} />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedPatients.map((patient) => (
              <tr 
                key={patient.id} 
                className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                onClick={() => onPatientClick?.(patient)}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={patient.image}
                      alt={patient.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-sm font-medium text-secondary-900 dark:text-white">{patient.name}</div>
                      <div className="text-sm text-secondary-500 dark:text-gray-400">{patient.age} years • {patient.gender}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-secondary-900 dark:text-white">#{patient.id.padStart(6, '0')}</td>
                <td className="px-6 py-4 text-sm text-secondary-900 dark:text-white">{patient.condition}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    patient.status === 'Stable'
                      ? 'bg-green-50 text-green-700 border border-green-100 dark:bg-green-900 dark:text-green-200'
                      : patient.status === 'Critical'
                      ? 'bg-red-50 text-red-700 border border-red-100 dark:bg-red-900 dark:text-red-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-100 dark:bg-amber-900 dark:text-amber-200'
                  }`}>
                    {patient.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-secondary-900 dark:text-white">
                  {format(new Date(patient.lastVisit), 'MMM d, yyyy')}
                </td>
                <td className="px-6 py-4">
                  <button className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-700">
        <div className="text-sm text-secondary-600 dark:text-gray-400">
          Showing {paginatedPatients.length} of {filteredPatients.length} patients
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 text-sm text-secondary-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(p => p + 1)}
            disabled={currentPage * ITEMS_PER_PAGE >= filteredPatients.length}
            className="px-3 py-1.5 text-sm text-secondary-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
