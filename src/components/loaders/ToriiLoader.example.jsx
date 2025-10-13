import React, { useState } from 'react';
import ToriiLoader from './ToriiLoader';

/**
 * ToriiLoader Examples
 * 
 * Demonstrates various configurations of the ToriiLoader component
 */
const ToriiLoaderExamples = () => {
  const [showLoader, setShowLoader] = useState(true);

  return (
    <div className="p-8 space-y-12 bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">ToriiLoader Examples</h1>
        
        {/* Toggle Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowLoader(!showLoader)}
            className="px-4 py-2 bg-cyan-500 text-black rounded hover:bg-cyan-400 transition-colors"
          >
            {showLoader ? 'Hide' : 'Show'} Loader
          </button>
        </div>

        {/* Small Size */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-4">Small Size</h2>
          <div className="bg-gray-800 p-8 rounded-lg flex items-center justify-center">
            {showLoader && <ToriiLoader size="sm" showMessage />}
          </div>
        </section>

        {/* Medium Size (Default) */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-4">Medium Size (Default)</h2>
          <div className="bg-gray-800 p-8 rounded-lg flex items-center justify-center">
            {showLoader && <ToriiLoader size="md" showMessage />}
          </div>
        </section>

        {/* Large Size */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-4">Large Size</h2>
          <div className="bg-gray-800 p-8 rounded-lg flex items-center justify-center">
            {showLoader && <ToriiLoader size="lg" showMessage />}
          </div>
        </section>

        {/* Without Message */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-4">Without Message</h2>
          <div className="bg-gray-800 p-8 rounded-lg flex items-center justify-center">
            {showLoader && <ToriiLoader size="md" showMessage={false} />}
          </div>
        </section>

        {/* Custom Message */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-4">Custom Message</h2>
          <div className="bg-gray-800 p-8 rounded-lg flex items-center justify-center">
            {showLoader && (
              <ToriiLoader 
                size="md" 
                showMessage 
                message="Processing your request..." 
              />
            )}
          </div>
        </section>

        {/* In Context - Loading State */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-4">In Context - Page Loading</h2>
          <div className="bg-gray-800 p-8 rounded-lg">
            <div className="max-w-2xl mx-auto">
              <div className="h-64 flex items-center justify-center">
                {showLoader && <ToriiLoader size="lg" showMessage />}
              </div>
            </div>
          </div>
        </section>

        {/* Usage Code Examples */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-4">Usage Examples</h2>
          <div className="bg-gray-800 p-6 rounded-lg">
            <pre className="text-sm text-gray-300 overflow-x-auto">
              <code>{`// Basic usage
<ToriiLoader />

// Small size without message
<ToriiLoader size="sm" showMessage={false} />

// Large size with rotating messages
<ToriiLoader size="lg" showMessage />

// Custom static message
<ToriiLoader 
  size="md" 
  showMessage 
  message="Loading your data..." 
/>

// With custom className
<ToriiLoader 
  size="md" 
  className="my-custom-class" 
/>

// In a loading state
{isLoading && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <ToriiLoader size="lg" showMessage />
  </div>
)}`}</code>
            </pre>
          </div>
        </section>

        {/* Props Documentation */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-4">Props</h2>
          <div className="bg-gray-800 p-6 rounded-lg">
            <table className="w-full text-left text-gray-300">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="pb-2 pr-4">Prop</th>
                  <th className="pb-2 pr-4">Type</th>
                  <th className="pb-2 pr-4">Default</th>
                  <th className="pb-2">Description</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-gray-700">
                  <td className="py-2 pr-4 font-mono">size</td>
                  <td className="py-2 pr-4">'sm' | 'md' | 'lg'</td>
                  <td className="py-2 pr-4">'md'</td>
                  <td className="py-2">Size of the loader (80px, 120px, 160px)</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2 pr-4 font-mono">showMessage</td>
                  <td className="py-2 pr-4">boolean</td>
                  <td className="py-2 pr-4">true</td>
                  <td className="py-2">Whether to show rotating messages</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2 pr-4 font-mono">message</td>
                  <td className="py-2 pr-4">string</td>
                  <td className="py-2 pr-4">null</td>
                  <td className="py-2">Custom message (disables rotation)</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-mono">className</td>
                  <td className="py-2 pr-4">string</td>
                  <td className="py-2 pr-4">''</td>
                  <td className="py-2">Additional CSS classes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Features */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-4">Features</h2>
          <div className="bg-gray-800 p-6 rounded-lg">
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Animated torii gate with pulsing circuit effects</li>
              <li>Rotating tech-themed messages in Japanese and English</li>
              <li>Three size variants (sm, md, lg)</li>
              <li>Smooth entrance/exit animations with Framer Motion</li>
              <li>Respects prefers-reduced-motion accessibility setting</li>
              <li>Screen reader friendly with proper ARIA labels</li>
              <li>Customizable messages</li>
              <li>Circuit node animations synchronized with torii structure</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ToriiLoaderExamples;
