import React from 'react';
import { Link } from 'react-router-dom';
import { BookmarkPlus, Briefcase, MapPin, Clock, DollarSign } from 'lucide-react';
import { Job, JobType, ExperienceLevel } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useJobs } from '../../context/JobContext';

// Type badge colors
const typeBadgeColors: Record<JobType, string> = {
  'full-time': 'bg-blue-100 text-blue-800',
  'part-time': 'bg-teal-100 text-teal-800',
  'contract': 'bg-purple-100 text-purple-800',
  'internship': 'bg-amber-100 text-amber-800',
  'remote': 'bg-green-100 text-green-800'
};

// Experience level badge styles
const experienceBadgeColors: Record<ExperienceLevel, string> = {
  'entry': 'bg-green-100 text-green-800',
  'mid': 'bg-blue-100 text-blue-800',
  'senior': 'bg-purple-100 text-purple-800',
  'executive': 'bg-red-100 text-red-800'
};

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const { isAuthenticated, user } = useAuth();
  const { saveJob } = useJobs();
  
  const formattedDate = new Date(job.applicationDeadline).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  const handleSaveJob = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isAuthenticated && user?.role === 'jobSeeker') {
      saveJob(job.id);
    }
  };
  
  return (
    <Link 
      to={`/jobs/${job.id}`} 
      className="block group"
    >
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                {job.title}
              </h3>
              <p className="mt-1 text-sm text-gray-600">{job.company}</p>
            </div>
            {isAuthenticated && user?.role === 'jobSeeker' && (
              <button
                onClick={handleSaveJob}
                className="text-gray-400 hover:text-blue-500 focus:outline-none transition-colors duration-150"
                aria-label="Save job"
              >
                <BookmarkPlus className="h-5 w-5" />
              </button>
            )}
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeBadgeColors[job.type]}`}>
              <Briefcase className="h-3 w-3 mr-1" />
              {job.type.replace('-', ' ')}
            </span>
            
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${experienceBadgeColors[job.experienceLevel]}`}>
              {job.experienceLevel.charAt(0).toUpperCase() + job.experienceLevel.slice(1)}
            </span>
          </div>
          
          <div className="mt-4">
            <p className="text-sm text-gray-700 line-clamp-2">
              {job.description}
            </p>
          </div>
          
          <div className="mt-6 flex flex-wrap items-center text-sm text-gray-500 gap-y-2">
            <div className="flex items-center mr-4">
              <MapPin className="h-4 w-4 mr-1 text-gray-400" />
              {job.location}
            </div>
            
            {job.salary && (
              <div className="flex items-center mr-4">
                <DollarSign className="h-4 w-4 mr-1 text-gray-400" />
                {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()} {job.salary.currency}
              </div>
            )}
            
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1 text-gray-400" />
              Apply by {formattedDate}
            </div>
          </div>
        </div>
        
        <div className="px-6 py-3 bg-gray-50 flex justify-between items-center border-t border-gray-100">
          <div className="text-xs text-gray-500">
            Posted {new Date(job.createdAt).toLocaleDateString()}
          </div>
          <div className="text-sm font-medium text-blue-600">
            View Details
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;