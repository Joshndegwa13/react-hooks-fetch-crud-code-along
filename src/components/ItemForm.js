import React, { useState } from "react";
import PropTypes from 'prop-types';

function ItemForm({ onAddItem }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");

  function handleSubmit(event) {
    event.preventDefault();
    if (name.trim()) {
      onAddItem({ name, category });
      setName("");
      setCategory("Produce");
    }
  }

  return (
    <form className="NewItem" onSubmit={handleSubmit}>
      <label htmlFor="name">
        Name:
        <input
          id="name"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>

      <label htmlFor="category">
        Category:
        <select
          id="category"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  );
}

ItemForm.propTypes = {
  onAddItem: PropTypes.func.isRequired,
};

export default ItemForm;
