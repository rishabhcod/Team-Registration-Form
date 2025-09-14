import React, { useState } from 'react';
import { teamAPI } from '../services/api';

function StatusPage() {
  const [teamNumber, setTeamNumber] = useState('');
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setTeam(null);
    setLoading(true);

    try {
      const response = await teamAPI.getTeamStatus(teamNumber);
      setTeam(response);
    } catch (err) {
      setError(err.response?.data?.error || 'Team not found');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Check Team Status
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your team number to view registration status
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="teamNumber" className="block text-sm font-medium text-gray-700">
              Team Number
            </label>
            <input
              id="teamNumber"
              type="text"
              required
              className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Enter your team number (e.g., HTX1234)"
              value={teamNumber}
              onChange={(e) => setTeamNumber(e.target.value.toUpperCase())}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Checking...' : 'Check Status'}
            </button>
          </div>
        </form>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {team && (
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Team Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Team Name</label>
                <p className="text-lg font-semibold text-gray-900">{team.teamName}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500">Team Number</label>
                <p className="text-lg font-semibold text-indigo-600">{team.teamNumber}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500">College</label>
                <p className="text-gray-900">{team.college}</p>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-3 text-gray-800">Team Members</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium text-gray-900">{team.teamLeader.name}</p>
                    <p className="text-sm text-gray-600">{team.teamLeader.email}</p>
                  </div>
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">Leader</span>
                </div>
                
                {team.members.map((member, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium text-gray-900">{member.name}</p>
                      <p className="text-sm text-gray-600">{member.email}</p>
                    </div>
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">Member</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-center p-4 rounded-lg border-2 border-gray-200">
                <div className="text-2xl mb-2">
                  {team.isVerified ? '✅' : '❌'}
                </div>
                <p className="font-semibold text-gray-900">Email Verification</p>
                <p className="text-sm text-gray-600">
                  {team.isVerified ? 'Verified' : 'Pending'}
                </p>
              </div>
              
              <div className="text-center p-4 rounded-lg border-2 border-gray-200">
                <div className="text-2xl mb-2">
                  {team.qualified ? '🎉' : '⏳'}
                </div>
                <p className="font-semibold text-gray-900">Qualification Status</p>
                <p className="text-sm text-gray-600">
                  {team.qualified ? 'Qualified' : 'Pending Review'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StatusPage;