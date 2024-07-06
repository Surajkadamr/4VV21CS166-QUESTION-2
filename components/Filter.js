import { useState } from 'react';

export default function Filter({ applyFilters }) {
  const [filters, setFilters] = useState({
    category: '',
    company: '',
    minRating: 0,
    minPrice: '',
    maxPrice: '',
    availability: ''
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    applyFilters({
      ...filters,
      minPrice: filters.minPrice ? Number(filters.minPrice) : 0,
      maxPrice: filters.maxPrice ? Number(filters.maxPrice) : Infinity
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <FilterSelect name="category" onChange={handleChange} options={['Phone', 'Computer', 'TV', 'Earphone']} />
        <FilterSelect name="company" onChange={handleChange} options={['AMZ', 'FLP', 'SNP', 'MYN', 'AZO']} />
        <FilterInput type="number" name="minRating" placeholder="Min Rating" onChange={handleChange} />
        <FilterInput type="number" name="minPrice" placeholder="Min Price" onChange={handleChange} />
        <FilterInput type="number" name="maxPrice" placeholder="Max Price" onChange={handleChange} />
        <FilterSelect name="availability" onChange={handleChange} options={['In Stock', 'Out of Stock']} />
      </div>
      <button type="submit" className="mt-4 w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
        Apply Filters
      </button>
    </form>
  );
}

const FilterSelect = ({ name, onChange, options }) => (
  <select name={name} onChange={onChange} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
    <option value="">All {name.charAt(0).toUpperCase() + name.slice(1)}s</option>
    {options.map(option => (
      <option key={option} value={option}>{option}</option>
    ))}
  </select>
);

const FilterInput = ({ type, name, placeholder, onChange }) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    onChange={onChange}
    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
);
