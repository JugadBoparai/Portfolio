import { useState } from 'react';

interface AppShowcaseProps {
  appUrl: string;
  desktopLabel?: string;
  mobileLabel?: string;
}

const AppShowcase = ({ 
  appUrl, 
  desktopLabel = 'Desktop View', 
  mobileLabel = 'Mobile View' 
}: AppShowcaseProps) => {
  const [activeView, setActiveView] = useState<'both' | 'desktop' | 'mobile'>('both');

  return (
    <div className="w-full py-4 px-4">
      {/* Toggle Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <button
          onClick={() => setActiveView('both')}
          className={`px-4 py-1.5 text-sm rounded-lg font-medium transition-all duration-300 ${
            activeView === 'both'
              ? 'bg-primary text-white shadow-md scale-105'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          Both Views
        </button>
        <button
          onClick={() => setActiveView('desktop')}
          className={`px-4 py-1.5 text-sm rounded-lg font-medium transition-all duration-300 ${
            activeView === 'desktop'
              ? 'bg-primary text-white shadow-md scale-105'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          Desktop View
        </button>
        <button
          onClick={() => setActiveView('mobile')}
          className={`px-4 py-1.5 text-sm rounded-lg font-medium transition-all duration-300 ${
            activeView === 'mobile'
              ? 'bg-primary text-white shadow-md scale-105'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          Mobile View
        </button>
      </div>

      {/* Iframes Container */}
      <div 
        className={`flex gap-4 lg:gap-6 items-start lg:items-center justify-center transition-all duration-500 ${
          activeView === 'both' 
            ? 'flex-col lg:flex-row' 
            : 'flex-col'
        }`}
      >
        {/* Desktop Iframe */}
        {(activeView === 'both' || activeView === 'desktop') && (
          <div 
            className={`transition-all duration-500 ${
              activeView === 'both' 
                ? 'w-full lg:w-1/2' 
                : 'w-full max-w-full'
            }`}
          >
            <div className="mb-2">
              <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200">
                {desktopLabel}
              </h3>
            </div>
            <div className="rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 relative">
              <iframe
                src={appUrl}
                className="w-full h-[400px] border-0 transition-opacity duration-300"
                title={desktopLabel}
                loading="lazy"
                allow="fullscreen"
              />
            </div>
          </div>
        )}

        {/* Mobile Iframe */}
        {(activeView === 'both' || activeView === 'mobile') && (
          <div 
            className={`transition-all duration-500 ${
              activeView === 'both' 
                ? 'w-full lg:w-1/2 flex justify-center' 
                : 'w-full flex justify-center'
            }`}
          >
            <div className="w-full max-w-[320px]">
              <div className={`mb-2 ${activeView === 'both' ? 'text-center lg:text-left' : 'text-center'}`}>
                <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200">
                  {mobileLabel}
                </h3>
              </div>
              <div className="rounded-[2.5rem] overflow-hidden shadow-xl border-[3px] border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-2 relative">
                <iframe
                  src={appUrl}
                  className="w-full h-[550px] border-0 rounded-[2rem] transition-opacity duration-300"
                  title={mobileLabel}
                  loading="lazy"
                  allow="fullscreen"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppShowcase;

