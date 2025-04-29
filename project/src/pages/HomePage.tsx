import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Users, Building, TrendingUp } from 'lucide-react';
import JobSearch from '../components/jobs/JobSearch';

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Find Your Dream Job Today
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-10">
              Connect with top employers and discover opportunities that match your skills and aspirations.
            </p>
            <div className="rounded-lg bg-white p-4 shadow-lg">
              <JobSearch />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600">
              Simple steps to start your job search or find the perfect candidate
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center transition duration-300 hover:shadow-md">
              <div className="flex justify-center mb-4">
                <Search className="h-12 w-12 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Search Jobs</h3>
              <p className="text-gray-600">
                Browse thousands of job listings or filter by location, role, and experience level.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center transition duration-300 hover:shadow-md">
              <div className="flex justify-center mb-4">
                <Users className="h-12 w-12 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Your Profile</h3>
              <p className="text-gray-600">
                Build your professional profile to stand out to employers looking for talent.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center transition duration-300 hover:shadow-md">
              <div className="flex justify-center mb-4">
                <Building className="h-12 w-12 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Apply with Ease</h3>
              <p className="text-gray-600">
                One-click application process makes it simple to apply for multiple positions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Take the Next Step?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Whether you're looking for your next career move or searching for top talent, we've got you covered.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/jobs"
              className="px-6 py-3 text-lg font-medium rounded-md bg-white text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
            >
              Browse Jobs
            </Link>
            <Link
              to="/register"
              className="px-6 py-3 text-lg font-medium rounded-md border border-white text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Trusted by Thousands</h2>
            <p className="mt-4 text-lg text-gray-600">
              Join our growing community of job seekers and employers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-200 rounded-lg text-center">
              <p className="text-4xl font-bold text-blue-600 mb-2">5,000+</p>
              <p className="text-gray-600">Job Listings</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg text-center">
              <p className="text-4xl font-bold text-blue-600 mb-2">2,500+</p>
              <p className="text-gray-600">Companies</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg text-center">
              <p className="text-4xl font-bold text-blue-600 mb-2">10,000+</p>
              <p className="text-gray-600">Job Seekers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Popular Job Categories</h2>
            <p className="mt-4 text-lg text-gray-600">
              Explore opportunities in these in-demand fields
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/jobs" className="group block bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition">
              <div className="p-6">
                <div className="text-blue-600 mb-3">
                  <TrendingUp className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  Technology
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Software Development, IT, Data Science
                </p>
              </div>
            </Link>
            
            <Link to="/jobs" className="group block bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition">
              <div className="p-6">
                <div className="text-blue-600 mb-3">
                  <TrendingUp className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  Marketing
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Digital Marketing, SEO, Content Creation
                </p>
              </div>
            </Link>
            
            <Link to="/jobs" className="group block bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition">
              <div className="p-6">
                <div className="text-blue-600 mb-3">
                  <TrendingUp className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  Finance
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Accounting, Financial Analysis, Banking
                </p>
              </div>
            </Link>
            
            <Link to="/jobs" className="group block bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition">
              <div className="p-6">
                <div className="text-blue-600 mb-3">
                  <TrendingUp className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  Healthcare
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Nursing, Medical, Healthcare Administration
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;