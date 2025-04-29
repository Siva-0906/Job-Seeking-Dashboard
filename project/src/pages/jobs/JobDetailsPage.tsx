import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  Shield, 
  Calendar,
  CheckSquare, 
  Share2, 
  Bookmark, 
  BookmarkCheck,
  Send
} from 'lucide-react';
import { useJobs } from '../../context/JobContext';
import { useAuth } from '../../context/AuthContext';

const JobDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getJob, applyToJob, saveJob } = useJobs();
  const { user, isAuthenticated } = useAuth();

  const [coverLetter, setCoverLetter] = useState('');
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [isJobSaved, setIsJobSaved] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const job = getJob(id || '');

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h1>
        <p className="mb-8 text-gray-600">The job listing you're looking for doesn't exist or has been removed.</p>
        <button
          onClick={() => navigate('/jobs')}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Browse All Jobs
        </button>
      </div>
    );
  }

  const handleApply = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (user?.role !== 'jobSeeker') {
      alert('Only job seekers can apply for jobs.');
      return;
    }
    
    setShowApplyForm(true);
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!coverLetter.trim()) {
      alert('Please include a cover letter with your application.');
      return;
    }
    
    setSubmitLoading(true);
    
    try {
      applyToJob(job.id, coverLetter);
      setSubmitSuccess(true);
      setTimeout(() => {
        setShowApplyForm(false);
      }, 2000);
    } catch (err) {
      console.error('Error submitting application:', err);
      alert('There was an error submitting your application. Please try again.');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleSaveJob = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (user?.role !== 'jobSeeker') {
      alert('Only job seekers can save jobs.');
      return;
    }
    
    saveJob(job.id);
    setIsJobSaved(true);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Job Header */}
          <div className="bg-blue-600 text-white p-6 sm:p-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">{job.title}</h1>
                <p className="mt-2 text-blue-100">{job.company}</p>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => {}} 
                  className="p-2 rounded-full bg-blue-500 hover:bg-blue-400 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                  aria-label="Share job"
                >
                  <Share2 className="h-5 w-5" />
                </button>
                {user?.role === 'jobSeeker' && (
                  <button 
                    onClick={handleSaveJob} 
                    className="p-2 rounded-full bg-blue-500 hover:bg-blue-400 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                    aria-label={isJobSaved ? "Job saved" : "Save job"}
                  >
                    {isJobSaved ? (
                      <BookmarkCheck className="h-5 w-5" />
                    ) : (
                      <Bookmark className="h-5 w-5" />
                    )}
                  </button>
                )}
              </div>
            </div>
            
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="flex items-center text-blue-100">
                <MapPin className="h-5 w-5 mr-1" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center text-blue-100">
                <Briefcase className="h-5 w-5 mr-1" />
                <span className="capitalize">{job.type.replace('-', ' ')}</span>
              </div>
              {job.salary && (
                <div className="flex items-center text-blue-100">
                  <DollarSign className="h-5 w-5 mr-1" />
                  <span>
                    {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()} {job.salary.currency}
                  </span>
                </div>
              )}
              <div className="flex items-center text-blue-100">
                <Clock className="h-5 w-5 mr-1" />
                <span>Apply by {formatDate(job.applicationDeadline)}</span>
              </div>
            </div>
            
            {user?.role === 'jobSeeker' && (
              <div className="mt-8">
                <button
                  onClick={handleApply}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Apply Now
                </button>
              </div>
            )}
          </div>
          
          {/* Job Details */}
          <div className="p-6 sm:p-8">
            <div className="prose max-w-none">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
              <p className="text-gray-700 mb-6">{job.description}</p>
              
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h2>
              <ul className="list-disc pl-5 mb-6">
                {job.requirements.map((req, index) => (
                  <li key={index} className="text-gray-700 mb-2">{req}</li>
                ))}
              </ul>
              
              {job.benefits && job.benefits.length > 0 && (
                <>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Benefits</h2>
                  <ul className="list-disc pl-5 mb-6">
                    {job.benefits.map((benefit, index) => (
                      <li key={index} className="text-gray-700 mb-2">{benefit}</li>
                    ))}
                  </ul>
                </>
              )}
              
              <div className="bg-gray-50 p-4 rounded-lg mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Job Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-gray-600">Posted on {formatDate(job.createdAt)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-gray-600">Application deadline: {formatDate(job.applicationDeadline)}</span>
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-gray-600 capitalize">Job type: {job.type.replace('-', ' ')}</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-gray-600 capitalize">Experience: {job.experienceLevel} level</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Apply Form (conditional) */}
        {showApplyForm && (
          <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Submit Your Application</h2>
              
              {submitSuccess ? (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative">
                  <div className="flex">
                    <CheckSquare className="h-5 w-5 mr-2" />
                    <span>Application submitted successfully! We'll notify you of any updates.</span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitApplication}>
                  <div className="mb-4">
                    <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">
                      Cover Letter
                    </label>
                    <textarea
                      id="coverLetter"
                      rows={6}
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Introduce yourself and explain why you're a good fit for this position..."
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-500">
                      Your profile information and resume will be included with your application automatically.
                    </p>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setShowApplyForm(false)}
                      className="mr-4 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitLoading}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
                    >
                      {submitLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        'Submit Application'
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetailsPage;