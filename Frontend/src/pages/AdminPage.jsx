import React, { useState, useEffect } from 'react';
import { adminAPI } from '../services/api';

function AdminPage() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [filter, setFilter] = useState('all'); // all, verified, unverified, qualified, unqualified
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getAllTeams();
      setTeams(response);
    } catch (err) {
      setError('Failed to fetch teams');
    } finally {
      setLoading(false);
    }
  };

  const handleQualify = async (teamId) => {
    try {
      await adminAPI.markQualified(teamId);
      setTeams(teams.map(team => 
        team._id === teamId ? { ...team, qualified: true } : team
      ));
      setSuccess('Team marked as qualified');
    } catch (err) {
      setError('Failed to qualify team');
    }
  };

  const handleSendCertificate = async (teamId) => {
    try {
      await adminAPI.sendCertificate(teamId);
      setSuccess('Certificate sent successfully');
    } catch (err) {
      setError('Failed to send certificate');
    }
  };

  const handleExportCSV = async () => {
    try {
      const blob = await adminAPI.exportCSV();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'teams.csv';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      setSuccess('CSV exported successfully');
    } catch (err) {
      setError('Failed to export CSV');
    }
  };

  const filteredTeams = teams.filter(team => {
    const matchesSearch = team.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         team.teamNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         team.college.toLowerCase().includes(searchTerm.toLowerCase());
    
    switch (filter) {
      case 'verified':
        return matchesSearch && team.isVerified;
      case 'unverified':
        return matchesSearch && !team.isVerified;
      case 'qualified':
        return matchesSearch && team.qualified;
      case 'unqualified':
        return matchesSearch && !team.qualified;
      default:
        return matchesSearch;
    }
  });

  const stats = {
    total: teams.length,
    verified: teams.filter(t => t.isVerified).length,
    qualified: teams.filter(t => t.qualified).length,
    unverified: teams.filter(t => !t.isVerified).length
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage team registrations and qualifications</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-indigo-600">{stats.total}</div>
            <div className="text-gray-600">Total Teams</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-green-600">{stats.verified}</div>
            <div className="text-gray-600">Verified</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-blue-600">{stats.qualified}</div>
            <div className="text-gray-600">Qualified</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-red-600">{stats.unverified}</div>
            <div className="text-gray-600">Unverified</div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Search teams..."
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              
              <select
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Teams</option>
                <option value="verified">Verified Only</option>
                <option value="unverified">Unverified Only</option>
                <option value="qualified">Qualified Only</option>
                <option value="unqualified">Unqualified Only</option>
              </select>
            </div>
            
            <button
              onClick={handleExportCSV}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Export CSV
            </button>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        {/* Teams Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Team Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Members
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    College
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTeams.map((team) => (
                  <tr key={team._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{team.teamName}</div>
                        <div className="text-sm text-indigo-600">{team.teamNumber}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        <div className="font-medium">{team.teamLeader.name}</div>
                        <div className="text-gray-500">{team.teamLeader.email}</div>
                        {team.members.map((member, index) => (
                          <div key={index} className="text-gray-500">
                            {member.name} - {member.email}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{team.college}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col space-y-1">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          team.isVerified 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {team.isVerified ? 'Verified' : 'Unverified'}
                        </span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          team.qualified 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {team.qualified ? 'Qualified' : 'Pending'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {!team.qualified && (
                          <button
                            onClick={() => handleQualify(team._id)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Qualify
                          </button>
                        )}
                        <button
                          onClick={() => handleSendCertificate(team._id)}
                          className="text-green-600 hover:text-green-900"
                        >
                          Send Certificate
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredTeams.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No teams found matching your criteria
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;