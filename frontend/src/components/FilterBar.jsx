function FilterBar({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="filter-bar">
      <label htmlFor="category">Filter by category:</label>
      <select
        id="category"
        value={selectedCategory}
        onChange={(e) => onSelectCategory(e.target.value)}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterBar;