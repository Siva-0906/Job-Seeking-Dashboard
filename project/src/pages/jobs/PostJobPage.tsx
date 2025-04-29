import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJobs } from '../../context/JobContext';
import { Job, JobType, ExperienceLevel } from '../../types';
import { Calendar, Loader } from 'lucide-react';

const PostJobPage: React.FC = () => {
  const navigate = useNavigate();
  const { postJob } = useJobs();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<Partial<Job>>({
    title: '',
    location: '',
    description: '',
    requirements: [''],
    type: 'full-time',
    experienceLevel: 'mid',
    salary: {
      min: 0,
      max: 0,
      currency: 'USD'
    },
    benefits: [''],
    applicationDeadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // Default: 30 days from now
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      salary: {
        ...prev.salary!,
        [name]: name === 'currency' ? value : Number(value)
      }
    }));
  };

  const handleArrayChange = (index: number, value: string, field: 'requirements' | 'benefits') => {
    const array = [...(formData[field] || [])];
    array[index] = value;
    setFormData(prev => ({ ...prev, [field]: array }));
  };

  const addArrayItem = (field: 'requirements' | 'benefits') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), '']
    }));
  };

  const removeArrayItem = (index: number, field: 'requirements' | 'benefits') => {
    const array = [...(formData[field] || [])];
    array.splice(index, 1);
    setFormData(prev => ({ ...prev, [field]: array }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      applicationDeadline: new Date(value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title || !formData.location || !formData.description) {
      alert('Please fill out all required fields');
      return;
    }
    
    if (formData.requirements?.some(r => !r.trim())) {
      alert('Please fill out all requirements or remove empty ones');
      return;
    }
    
    if (formData.benefits?.some(b => !b.trim())) {
      alert('Please fill out all benefits or remove empty ones');
      return;
    }
    
    if (formData.salary && (formData.salary.min <= 0 || formData.salary.max <= 0)) {
      alert('Please provide valid salary range');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Filter out empty entries
      const cleanedFormData = {
        ...formData,
        requirements: formData.requirements?.filter(r => r.trim()) || [],
        benefits: formData.benefits?.filter(b => b.trim()) || []
      };
      
      postJob(cleanedFormData);
      navigate('/employer/dashboard');
    } catch (err) {
      console.error('Error posting job:', err);
      alert('There was an error posting your job. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-8 sm:p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Post a New Job</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Job Info */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-6">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      Job Title *
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="title"
                        id="title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="e.g., Senior Frontend Developer"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                      Location *
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="location"
                        id="location"
                        required
                        value={formData.location}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="e.g., New York, NY (Remote)"
                      />
                    </div>
                  </div>
                  
                  <div className="sm:col-span-3">
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                      Job Type *
                    </label>
                    <div className="mt-1">
                      <select
                        id="type"
                        name="type"
                        required
                        value={formData.type}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="contract">Contract</option>
                        <option value="internship">Internship</option>
                        <option value="remote">Remote</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="sm:col-span-3">
                    <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700">
                      Experience Level *
                    </label>
                    <div className="mt-1">
                      <select
                        id="experienceLevel"
                        name="experienceLevel"
                        required
                        value={formData.experienceLevel}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                        <option value="entry">Entry Level</option>
                        <option value="mid">Mid Level</option>
                        <option value="senior">Senior Level</option>
                        <option value="executive">Executive Level</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Job Description */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Job Description</h2>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description *
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="description"
                      name="description"
                      rows={5}
                      required
                      value={formData.description}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Provide a detailed description of the job..."
                    />
                  </div>
                </div>
              </div>
              
              {/* Requirements */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-900">Requirements *</h2>
                  <button
                    type="button"
                    onClick={() => addArrayItem('requirements')}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    + Add
                  </button>
                </div>
                
                {formData.requirements?.map((req, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={req}
                      onChange={(e) => handleArrayChange(index, e.target.value, 'requirements')}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder={`Requirement ${index + 1}`}
                    />
                    {formData.requirements!.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem(index, 'requirements')}
                        className="ml-2 text-red-600 hover:text-red-800"
                      >
                        &times;
                      </button>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Salary Information */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Salary Information</h2>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-2">
                    <label htmlFor="min" className="block text-sm font-medium text-gray-700">
                      Minimum *
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        id="min"
                        name="min"
                        required
                        min="0"
                        value={formData.salary?.min}
                        onChange={handleSalaryChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label htmlFor="max" className="block text-sm font-medium text-gray-700">
                      Maximum *
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        id="max"
                        name="max"
                        required
                        min="0"
                        value={formData.salary?.max}
                        onChange={handleSalaryChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
                      Currency *
                    </label>
                    <div className="mt-1">
                      <select
                        id="currency"
                        name="currency"
                        required
                        value={formData.salary?.currency}
                        onChange={handleSalaryChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="CAD">CAD</option>
                        <option value="AUD">AUD</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Benefits */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-900">Benefits</h2>
                  <button
                    type="button"
                    onClick={() => addArrayItem('benefits')}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    + Add
                  </button>
                </div>
                
                {formData.benefits?.map((benefit, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={benefit}
                      onChange={(e) => handleArrayChange(index, e.target.value, 'benefits')}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder={`Benefit ${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem(index, 'benefits')}
                      className="ml-2 text-red-600 hover:text-red-800"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
              
              {/* Application Deadline */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Application Deadline</h2>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="applicationDeadline"
                    name="applicationDeadline"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.applicationDeadline?.toISOString().split('T')[0]}
                    onChange={handleDateChange}
                    className="pl-10 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              {/* Submit Buttons */}
              <div className="pt-5 border-t border-gray-200">
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => navigate('/employer/dashboard')}
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader className="h-5 w-5 mr-2 animate-spin" />
                        Posting...
                      </>
                    ) : (
                      'Post Job'
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJobPage;