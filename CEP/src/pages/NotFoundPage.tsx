import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8F7FC] flex items-center justify-center p-6 text-center">
      <div className="max-w-md bg-white p-8 rounded-3xl border border-[#E8E5F0] shadow-sm space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-[#F0EDFA] text-[#6554C0] flex items-center justify-center mx-auto">
          <Compass className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-[#252238]">Page Not Found</h1>
        <p className="text-xs sm:text-sm text-[#77738C] leading-relaxed">
          The page or route you requested could not be located in the TeamConnect workspace.
        </p>
        <div className="pt-2">
          <Link
            to="/app/dashboard"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6554C0] text-white text-xs sm:text-sm font-semibold hover:bg-[#5644B0] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

