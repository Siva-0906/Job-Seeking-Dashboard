import React, { createContext, useContext, useState, useEffect } from 'react';
import { Job, Application } from '../types';
import { mockJobs, mockApplications } from '../data/mock';
import { useAuth } from './AuthContext';

interface JobContextType {
  jobs: Job[];
  applications: Application[];
  filteredJobs: Job[];
  isLoading: boolean;
  setSearchFilters: (filters: JobFilters) => void;
  getJob: (id: string) => Job | undefined;
  getUserJobs: () => Job[];
  getUserApplications: () => Application[];
  saveJob: (jobId: string) => void;
  applyToJob: (jobId: string, coverLetter: string) => void;
  postJob: (job: Partial<Job>) => void;
  updateJob: (jobId: string, updates: Partial<Job>) => void;
}

interface JobFilters {
  searchTerm?: string;
  location?: string;
  type?: string;
  experienceLevel?: string;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const useJobs = () => {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [applications, setApplications] = useState<Application[]>(mockApplications);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(mockJobs);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState<JobFilters>({});

  useEffect(() => {
    // Apply filters whenever they change
    applyFilters();
  }, [filters, jobs]);

  const applyFilters = () => {
    let filtered = [...jobs];

    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(term) || 
        job.company.toLowerCase().includes(term) ||
        job.description.toLowerCase().includes(term)
      );
    }

    if (filters.location) {
      const location = filters.location.toLowerCase();
      filtered = filtered.filter(job => 
        job.location.toLowerCase().includes(location)
      );
    }

    if (filters.type) {
      filtered = filtered.filter(job => job.type === filters.type);
    }

    if (filters.experienceLevel) {
      filtered = filtered.filter(job => job.experienceLevel === filters.experienceLevel);
    }

    setFilteredJobs(filtered);
  };

  const setSearchFilters = (newFilters: JobFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const getJob = (id: string) => {
    return jobs.find(job => job.id === id);
  };

  const getUserJobs = () => {
    if (!user) return [];
    
    if (user.role === 'employer') {
      return jobs.filter(job => job.employerId === user.id);
    } else if (user.role === 'admin') {
      return jobs;
    }
    
    return [];
  };

  const getUserApplications = () => {
    if (!user || user.role !== 'jobSeeker') return [];
    return applications.filter(app => app.seekerId === user.id);
  };

  const saveJob = (jobId: string) => {
    // In a real app, this would save to the backend
    console.log(`Job ${jobId} saved`);
  };

  const applyToJob = (jobId: string, coverLetter: string) => {
    if (!user || user.role !== 'jobSeeker') return;
    
    // In a real app, this would save to the backend
    const newApplication: Application = {
      id: `temp-${Date.now()}`,
      jobId,
      seekerId: user.id,
      resume: 'resume.pdf', // In a real app, this would be uploaded
      coverLetter,
      status: 'pending',
      submittedAt: new Date(),
      updatedAt: new Date()
    };
    
    setApplications(prev => [...prev, newApplication]);
  };

  const postJob = (jobData: Partial<Job>) => {
    if (!user || user.role !== 'employer') return;
    
    const newJob: Job = {
      id: `temp-${Date.now()}`,
      title: jobData.title || '',
      company: user.role === 'employer' ? (user as any).company : '',
      employerId: user.id,
      location: jobData.location || '',
      description: jobData.description || '',
      requirements: jobData.requirements || [],
      type: jobData.type || 'full-time',
      experienceLevel: jobData.experienceLevel || 'mid',
      salary: jobData.salary,
      benefits: jobData.benefits || [],
      applicationDeadline: jobData.applicationDeadline || new Date(),
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setJobs(prev => [...prev, newJob]);
  };

  const updateJob = (jobId: string, updates: Partial<Job>) => {
    setJobs(prev => 
      prev.map(job => 
        job.id === jobId ? { ...job, ...updates, updatedAt: new Date() } : job
      )
    );
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        applications,
        filteredJobs,
        isLoading,
        setSearchFilters,
        getJob,
        getUserJobs,
        getUserApplications,
        saveJob,
        applyToJob,
        postJob,
        updateJob
      }}
    >
      {children}
    </JobContext.Provider>
  );
};