import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch items from server or initialize items here
    async function fetchItems() {
      try {
        const response = await fetch("http://localhost:4000/items");
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    }
    fetchItems();
  }, []);

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  function addItem(newItem) {
    // Add the new item to the server
    fetch("http://localhost:4000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    })
      .then(response => response.json())
      .then(item => setItems([...items, item]))
      .catch(error => console.error("Error adding item:", error));
  }

  function removeItem(id) {
    // Remove the item from the server
    fetch(`http://localhost:4000/items/${id}`, {
      method: "DELETE",
    })
      .then(() => setItems(items.filter(item => item.id !== id)))
      .catch(error => console.error("Error removing item:", error));
  }

  function toggleItemInCart(id) {
    const itemToUpdate = items.find(item => item.id === id);
    const updatedItem = { ...itemToUpdate, isInCart: !itemToUpdate.isInCart };

    fetch(`http://localhost:4000/items/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    })
      .then(response => response.json())
      .then(() => {
        setItems(items.map(item =>
          item.id === id ? updatedItem : item
        ));
      })
      .catch(error => console.error("Error updating item:", error));
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={addItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item
            key={item.id}
            item={item}
            onAddToCart={() => toggleItemInCart(item.id)}
            onRemoveFromCart={() => toggleItemInCart(item.id)}
            onDelete={() => removeItem(item.id)}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
