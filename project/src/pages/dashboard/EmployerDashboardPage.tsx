import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useJobs } from '../../context/JobContext';
import { 
  PlusCircle, 
  Edit, 
  Trash2, 
  Clock, 
  Users, 
  CheckCircle, 
  XCircle,
  BarChart
} from 'lucide-react';

const EmployerDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { getUserJobs } = useJobs();
  const [activeTab, setActiveTab] = useState<'jobs' | 'applications' | 'analytics'>('jobs');
  
  const jobs = getUserJobs();
  
  // Status badge colors
  const statusColors: Record<string, string> = {
    active: 'bg-green-100 text-green-800',
    draft: 'bg-gray-100 text-gray-800',
    filled: 'bg-blue-100 text-blue-800',
    closed: 'bg-red-100 text-red-800'
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dashboard Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Employer Dashboard</h1>
            <p className="mt-2 text-gray-600">Manage your job listings and review applications</p>
          </div>
          <div>
            <Link
              to="/post-job"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              Post New Job
            </Link>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Active Jobs</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{jobs.filter(j => j.status === 'active').length}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Applications</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">27</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Positions Filled</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{jobs.filter(j => j.status === 'filled').length}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Dashboard Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('jobs')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'jobs'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Your Jobs
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'applications'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Applications
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'analytics'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Analytics
            </button>
          </nav>
        </div>
        
        {/* Tab Content */}
        {activeTab === 'jobs' && (
          <div>
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              {jobs.length === 0 ? (
                <div className="px-4 py-12 text-center">
                  <div className="mx-auto h-12 w-12 text-gray-400">
                    <PlusCircle className="h-12 w-12" />
                  </div>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No jobs posted yet</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Get started by posting your first job listing.
                  </p>
                  <div className="mt-6">
                    <Link
                      to="/post-job"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <PlusCircle className="h-5 w-5 mr-2" />
                      Post New Job
                    </Link>
                  </div>
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {jobs.map((job) => (
                    <li key={job.id}>
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <p className="text-lg font-medium text-blue-600 truncate">{job.title}</p>
                            <span
                              className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                statusColors[job.status]
                              }`}
                            >
                              {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                            </span>
                          </div>
                          <div className="flex space-x-2">
                            <Link
                              to={`/jobs/${job.id}`}
                              className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              View
                            </Link>
                            <button
                              className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <p className="flex items-center text-sm text-gray-500">
                              <Users className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                              {Math.floor(Math.random() * 20)} applications
                            </p>
                            <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                              <MapPin className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                              {job.location}
                            </p>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                            <Clock className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                            <p>
                              Posted on{' '}
                              {new Date(job.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'applications' && (
          <div>
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Recent Applications</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Review and manage applications for your job listings
                </p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Applicant
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Job Position
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Applied On
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="relative px-6 py-3"
                      >
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {/* In a real app, this would be populated with actual application data */}
                    {[1, 2, 3].map((_, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                              <Users className="h-6 w-6 text-gray-400" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {["Alex Johnson", "Jamie Smith", "Pat Wilson"][index]}
                              </div>
                              <div className="text-sm text-gray-500">
                                {["alex@example.com", "jamie@example.com", "pat@example.com"][index]}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {["Frontend Developer", "Backend Engineer", "UX/UI Designer"][index]}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(Date.now() - index * 86400000).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              ["bg-yellow-100 text-yellow-800", "bg-blue-100 text-blue-800", "bg-green-100 text-green-800"][index]
                            }`}
                          >
                            {["Pending", "Reviewed", "Shortlisted"][index]}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-3">
                            View
                          </button>
                          <button className="text-green-600 hover:text-green-900 mr-3">
                            Accept
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'analytics' && (
          <div>
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Job Performance Analytics</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Insights and statistics about your job listings
                </p>
              </div>
              
              <div className="px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Total Views
                        </dt>
                        <dd className="mt-1 text-3xl font-semibold text-gray-900">
                          845
                        </dd>
                        <dd className="mt-2 text-sm text-green-600">
                          +7.2% from last week
                        </dd>
                      </dl>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Application Rate
                        </dt>
                        <dd className="mt-1 text-3xl font-semibold text-gray-900">
                          12.4%
                        </dd>
                        <dd className="mt-2 text-sm text-red-600">
                          -2.1% from last week
                        </dd>
                      </dl>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Avg. Time to Fill
                        </dt>
                        <dd className="mt-1 text-3xl font-semibold text-gray-900">
                          18 days
                        </dd>
                        <dd className="mt-2 text-sm text-green-600">
                          -3 days from last month
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-900">Most Popular Jobs</h3>
                  <div className="mt-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Frontend Developer</p>
                          <p className="text-sm text-gray-500">Posted 15 days ago</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">178 views</p>
                          <p className="text-sm text-gray-500">12 applications</p>
                        </div>
                      </div>
                      <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                      </div>
                    </div>
                    
                    <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">UX/UI Designer</p>
                          <p className="text-sm text-gray-500">Posted 10 days ago</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">142 views</p>
                          <p className="text-sm text-gray-500">8 applications</p>
                        </div>
                      </div>
                      <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '55%' }}></div>
                      </div>
                    </div>
                    
                    <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Backend Engineer</p>
                          <p className="text-sm text-gray-500">Posted 20 days ago</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">103 views</p>
                          <p className="text-sm text-gray-500">7 applications</p>
                        </div>
                      </div>
                      <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '40%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployerDashboardPage;