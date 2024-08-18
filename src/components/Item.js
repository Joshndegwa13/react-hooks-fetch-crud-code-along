import React from "react";
import PropTypes from 'prop-types';

function Item({ item, onAddToCart, onRemoveFromCart, onDelete }) {
  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button
        className={item.isInCart ? "remove" : "add"}
        onClick={() => item.isInCart ? onRemoveFromCart(item) : onAddToCart(item)}
      >
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={() => onDelete(item)}>
        Delete
      </button>
    </li>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    isInCart: PropTypes.bool.isRequired
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onRemoveFromCart: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default Item;
