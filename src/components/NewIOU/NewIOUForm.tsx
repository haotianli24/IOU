import React, { useState } from 'react';
import { Send } from 'lucide-react';

export function NewIOUForm() {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    description: '',
    type: 'they-owe',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-5">
      
      <div className="space-y-4">
        <div>
          <label className="block text-med font-medium text-gray-700 mb-1">
            Friend's Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-med font-medium text-gray-700 mb-1">
            Amount
          </label>
          <input
            type="number"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-med font-medium text-gray-700 mb-1">
            Type
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="they-owe">They owe me</option>
            <option value="i-owe">I owe them</option>
          </select>
        </div>

        <div>
          <label className="block text-med font-medium text-gray-700 mb-1">
            Description (Optional)
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            rows={3}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-middle-blue text-white py-2 px-4 rounded-md hover:bg-darker-blue transition-colors flex items-center justify-center space-x-2"
        >
          <Send size={20} />
          <span>Create IOU</span>
        </button>
      </div>
    </form>
  );
}