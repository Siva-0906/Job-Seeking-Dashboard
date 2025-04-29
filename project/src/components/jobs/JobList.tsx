import React from 'react';
import JobCard from './JobCard';
import { useJobs } from '../../context/JobContext';
import { FileSearch } from 'lucide-react';

const JobList: React.FC = () => {
  const { filteredJobs, isLoading } = useJobs();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-pulse flex flex-col space-y-4 w-full">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-200 h-48 rounded-lg w-full"></div>
          ))}
        </div>
      </div>
    );
  }

  if (filteredJobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <FileSearch className="h-16 w-16 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900">No jobs found</h3>
        <p className="mt-1 text-gray-500">
          Try adjusting your search criteria or browse all available jobs.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredJobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobList;