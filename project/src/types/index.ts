export type UserRole = 'jobSeeker' | 'employer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}

export interface JobSeeker extends User {
  role: 'jobSeeker';
  resume?: string;
  skills: string[];
  savedJobs: string[];
  appliedJobs: string[];
}

export interface Employer extends User {
  role: 'employer';
  company: string;
  industry: string;
  jobs: string[];
}

export interface Admin extends User {
  role: 'admin';
}

export type JobStatus = 'draft' | 'active' | 'filled' | 'closed';
export type JobType = 'full-time' | 'part-time' | 'contract' | 'internship' | 'remote';
export type ExperienceLevel = 'entry' | 'mid' | 'senior' | 'executive';

export interface Job {
  id: string;
  title: string;
  company: string;
  employerId: string;
  location: string;
  description: string;
  requirements: string[];
  type: JobType;
  experienceLevel: ExperienceLevel;
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  benefits?: string[];
  applicationDeadline: Date;
  status: JobStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Application {
  id: string;
  jobId: string;
  seekerId: string;
  resume: string;
  coverLetter?: string;
  status: 'pending' | 'reviewed' | 'rejected' | 'shortlisted' | 'hired';
  submittedAt: Date;
  updatedAt: Date;
}