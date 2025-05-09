import { useState } from "react";
import Item from "./Item";

export default function PackingList({ packingItems, onDeleteItem, onToggleItem, onClearList }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === 'input') sortedItems = packingItems;
  if (sortBy === 'description') sortedItems = packingItems.slice().sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === 'packed') sortedItems = packingItems.slice().sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map(item => {
          return <Item item={item} key={item.id} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} />;
        })}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input" className="input">
            Sort by input order
          </option>
          <option value="description" className="description">
            Sort by description
          </option>
          <option value="packed" className="packed">
            Sort by packed status
          </option>
        </select>
        <button onClick={onClearList}>Clear List</button>
      </div>
    </div>
  );
}
