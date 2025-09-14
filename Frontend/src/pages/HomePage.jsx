import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Hackathon Portal
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-indigo-100">
              Register your team, verify your email, and track your progress
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Register Team
              </Link>
              <Link
                to="/status"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors"
              >
                Check Status
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Simple steps to get your team registered and verified
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">1. Register</h3>
              <p className="text-gray-600">
                Fill out your team information including team leader and members
              </p>
            </div>

            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✉️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">2. Verify</h3>
              <p className="text-gray-600">
                Check your email for OTP and verify your team registration
              </p>
            </div>

            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">3. Track</h3>
              <p className="text-gray-600">
                Monitor your team status and qualification progress
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Quick Actions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              to="/register"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-center">
                <div className="text-3xl mb-3">🚀</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Register Team</h3>
                <p className="text-gray-600 text-sm">
                  Start your hackathon journey by registering your team
                </p>
              </div>
            </Link>

            <Link
              to="/verify"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-center">
                <div className="text-3xl mb-3">✅</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Verify Email</h3>
                <p className="text-gray-600 text-sm">
                  Verify your team using the OTP sent to your email
                </p>
              </div>
            </Link>

            <Link
              to="/status"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-center">
                <div className="text-3xl mb-3">📈</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Check Status</h3>
                <p className="text-gray-600 text-sm">
                  View your team's registration and qualification status
                </p>
              </div>
            </Link>

            <Link
              to="/admin/login"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-center">
                <div className="text-3xl mb-3">👨‍💼</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Admin Login</h3>
                <p className="text-gray-600 text-sm">
                  Access admin dashboard for team management
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Requirements Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Registration Requirements
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Team Structure</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Minimum 2 members, maximum 3 members
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  One team leader required
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  All members must have VITAP student email
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Registration Process</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Fill out team information
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Verify email with OTP
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Wait for qualification review
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Receive confirmation
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2024 Hackathon Portal. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;