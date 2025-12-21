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
    <div className="w-full py-2 px-2">
      {/* Toggle Buttons */}
      <div className="flex flex-wrap justify-center gap-1.5 mb-4">
        <button
          onClick={() => setActiveView('both')}
          className={`px-3 py-1 text-xs rounded-md font-medium transition-all duration-300 ${
            activeView === 'both'
              ? 'bg-primary text-white shadow-md scale-105'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          Both
        </button>
        <button
          onClick={() => setActiveView('desktop')}
          className={`px-3 py-1 text-xs rounded-md font-medium transition-all duration-300 ${
            activeView === 'desktop'
              ? 'bg-primary text-white shadow-md scale-105'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          Desktop
        </button>
        <button
          onClick={() => setActiveView('mobile')}
          className={`px-3 py-1 text-xs rounded-md font-medium transition-all duration-300 ${
            activeView === 'mobile'
              ? 'bg-primary text-white shadow-md scale-105'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          Mobile
        </button>
      </div>

      {/* Iframes Container */}
      <div 
        className={`flex gap-3 lg:gap-6 items-start lg:items-start justify-center transition-all duration-500 ${
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
            <div className="mb-1.5">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                {desktopLabel}
              </h3>
            </div>
            <div className="rounded-lg overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 relative">
              <iframe
                src={appUrl}
                className="w-full max-w-[1280px] h-[800px] border-0 transition-opacity duration-300"
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
            <div className="w-full max-w-[390px]">
              <div className={`mb-1.5 ${activeView === 'both' ? 'text-center lg:text-left' : 'text-center'}`}>
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {mobileLabel}
                </h3>
              </div>
              <div className="rounded-[2rem] overflow-hidden shadow-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-1.5 relative">
                <iframe
                  src={appUrl}
                  className="w-full h-[844px] border-0 rounded-[1.75rem] transition-opacity duration-300"
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

