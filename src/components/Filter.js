import React from "react";
import PropTypes from 'prop-types';

function Filter({ category, onCategoryChange }) {
  return (
    <div className="Filter">
      <label htmlFor="filter">Filter by category:</label>
      <select
        id="filter"
        name="filter"
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Produce">Produce</option>
        <option value="Dairy">Dairy</option>
        <option value="Dessert">Dessert</option>
      </select>
    </div>
  );
}

Filter.propTypes = {
  category: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired
};

export default Filter;
