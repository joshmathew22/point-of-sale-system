import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-1/7 bg-gray-200 px-4 py-8">
    <h2 className="text-xl font-semibold mb-4">Navigation</h2>
    <ul className="space-y-2">
        <li>
            <a href="../../" className="hover:text-gray-500">
                Back to Home
            </a>
        </li>
        <li>
            <a href="/pages/dashboard" className="hover:text-gray-500">
                Inventory
            </a>
        </li>
        <li>
            <a href="/pages/dashboard/modify" className="hover:text-gray-500">
                Modify Data
            </a>
        </li>
        <li>
            <a href="/pages/dashboard/reports" className="hover:text-gray-500">
                Report
            </a>
        </li>
    </ul>
</div>
  );
}

export default Sidebar;