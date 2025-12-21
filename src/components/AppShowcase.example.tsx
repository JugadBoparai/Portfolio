/**
 * Example usage of AppShowcase component
 * 
 * This file demonstrates how to use the AppShowcase component
 * in your React application.
 */

import AppShowcase from './AppShowcase';

// Example 1: Basic usage with required prop only
export const BasicExample = () => {
  return (
    <AppShowcase appUrl="https://example.com" />
  );
};

// Example 2: With custom labels
export const CustomLabelsExample = () => {
  return (
    <AppShowcase 
      appUrl="https://surmedania.com"
      desktopLabel="Desktop Preview"
      mobileLabel="Mobile Preview"
    />
  );
};

// Example 3: In a section or page
export const FullPageExample = () => {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">
          App Showcase
        </h2>
        <AppShowcase 
          appUrl="https://your-app-url.com"
          desktopLabel="Desktop View"
          mobileLabel="Mobile View"
        />
      </div>
    </section>
  );
};

// Example 4: Multiple showcases
export const MultipleShowcasesExample = () => {
  return (
    <div className="space-y-16">
      <div>
        <h3 className="text-2xl font-bold mb-4">Project 1</h3>
        <AppShowcase 
          appUrl="https://project1.com"
          desktopLabel="Project 1 - Desktop"
          mobileLabel="Project 1 - Mobile"
        />
      </div>
      
      <div>
        <h3 className="text-2xl font-bold mb-4">Project 2</h3>
        <AppShowcase 
          appUrl="https://project2.com"
          desktopLabel="Project 2 - Desktop"
          mobileLabel="Project 2 - Mobile"
        />
      </div>
    </div>
  );
};

