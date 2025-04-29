import React from 'react';
import JobSearch from '../../components/jobs/JobSearch';
import JobList from '../../components/jobs/JobList';

const JobsPage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Browse Jobs</h1>
          <p className="text-lg text-gray-600">
            Discover opportunities that match your skills and interests
          </p>
        </div>
        
        <div className="mb-8">
          <JobSearch />
        </div>
        
        <div>
          <JobList />
        </div>
      </div>
    </div>
  );
};

export default JobsPage;