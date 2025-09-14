import React, { useState } from 'react';
import { teamAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [formData, setFormData] = useState({
    teamName: '',
    teamLeader: {
      name: '',
      email: ''
    },
    members: [
      { name: '', email: '' }
    ],
    college: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('teamLeader.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        teamLeader: {
          ...prev.teamLeader,
          [field]: value
        }
      }));
    } else if (name.startsWith('members.')) {
      const [_, index, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        members: prev.members.map((member, i) => 
          i === parseInt(index) ? { ...member, [field]: value } : member
        )
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const addMember = () => {
    if (formData.members.length < 2) {
      setFormData(prev => ({
        ...prev,
        members: [...prev.members, { name: '', email: '' }]
      }));
    }
  };

  const removeMember = (index) => {
    setFormData(prev => ({
      ...prev,
      members: prev.members.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Filter out empty members
      const filteredMembers = formData.members.filter(member => 
        member.name.trim() && member.email.trim()
      );

      const teamData = {
        ...formData,
        members: filteredMembers
      };

      const response = await teamAPI.registerTeam(teamData);
      setSuccess(`Team registered successfully! Your team number is: ${response.teamNumber}. Please check your email for OTP verification.`);
      
      // Redirect to verify page after 3 seconds
      setTimeout(() => {
        navigate('/verify');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">Team Registration</h1>
      
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

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Team Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Team Name *</label>
          <input 
            type="text" 
            name="teamName"
            className="input" 
            placeholder="Enter team name" 
            value={formData.teamName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Team Leader */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Team Leader *</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
              <input 
                type="text" 
                name="teamLeader.name"
                className="input" 
                placeholder="Enter team leader name" 
                value={formData.teamLeader.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
              <input 
                type="email" 
                name="teamLeader.email"
                className="input" 
                placeholder="Enter team leader email (@vitapstudent.ac.in)" 
                value={formData.teamLeader.email}
                onChange={handleChange}
                required
              />
              <p className="text-xs text-gray-500 mt-1">Must be a VITAP student email</p>
            </div>
          </div>
        </div>

        {/* Team Members */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Team Members (1-2 additional members)</h3>
            {formData.members.length < 2 && (
              <button
                type="button"
                onClick={addMember}
                className="bg-indigo-600 text-white px-3 py-1 rounded text-sm hover:bg-indigo-700"
              >
                + Add Member
              </button>
            )}
          </div>
          
          {formData.members.map((member, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input 
                  type="text" 
                  name={`members.${index}.name`}
                  className="input" 
                  placeholder="Enter member name" 
                  value={member.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  name={`members.${index}.email`}
                  className="input" 
                  placeholder="Enter member email (@vitapstudent.ac.in)" 
                  value={member.email}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => removeMember(index)}
                  className="bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* College */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">College *</label>
          <input 
            type="text" 
            name="college"
            className="input" 
            placeholder="Enter college name" 
            value={formData.college}
            onChange={handleChange}
            required
          />
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:opacity-50 font-semibold"
        >
          {loading ? 'Registering Team...' : 'Register Team'}
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;