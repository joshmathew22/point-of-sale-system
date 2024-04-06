import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-1/7 bg-gray-200 px-4 py-8">
    <h2 className="text-xl font-semibold mb-4">Navigation</h2>
    <ul className="space-y-2">
        <li>
            <a href="../../" className="block text-blue-500 hover:text-blue-700">
                Back to Home
            </a>
        </li>
        <li>
            <a href="/pages/dashboard" className="block text-blue-500 hover:text-blue-700">
                Dashboard
            </a>
        </li>
        <li>
            <a href="/pages/dashboard/modify" className="block text-blue-500 hover:text-blue-700">
                Modify Data
            </a>
        </li>
        <li>
            <a href="/pages/dashboard/reports" className="block text-blue-500 hover:text-blue-700">
                Report
            </a>
        </li>
    </ul>
</div>
  );
}

export default Sidebar;