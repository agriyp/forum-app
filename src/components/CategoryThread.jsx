import React from 'react';
import PropTypes from 'prop-types';
import Title from './styled/Title';

function CategoryThread({ uniqueCategory, onCLickCategory }) {
  return (
    <section className="category-filter">
      <Title>Kategori populer</Title>
      <div className="list-category">
        {uniqueCategory.map(({ id, category }) => (
          <button
            type="button"
            className="list-category-item"
            key={id}
            onClick={(event) => onCLickCategory(event, category)}
          >
            {`#${category}`}
          </button>
        ))}
      </div>
    </section>
  );
}

CategoryThread.propTypes = {
  uniqueCategory: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onCLickCategory: PropTypes.func.isRequired,
};

export default CategoryThread;
