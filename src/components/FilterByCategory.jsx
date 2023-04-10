import { useDispatch, useSelector } from 'react-redux';
import { setIsShowing } from '../store/slices/isShowing.slice';
import { filterByCategoryThunk, getProductsThunk } from '../store/slices/products.slice';
import { setShowAll } from '../store/slices/showAll.slice';

const FilterByCategory = ({categories}) => {

  const showAll = useSelector(state => state.showAll)
  //console.log(categories);

  const dispatch = useDispatch();

  return (
    <div className='filter-by-category-overlay'>
      <div className="filter-by-category-space"></div>
      <div className="filter-by-category-container">
        <div className='fbc-btn-container'>
          <button onClick={() => dispatch(setIsShowing(false))}>
            <i className='bx bx-x bx-sm' ></i>
          </button>
        </div>
        <div className="fbc-options-container">
          <h2>Filters</h2>
          <div className="fbc-category-container">
            <p><b>Category</b></p>
            <ul>
              {showAll &&
                <li onClick={() => {
                  dispatch(getProductsThunk())
                  dispatch(setIsShowing(false))
                  window.scrollTo(0, 0)
                }}>
                  Show all
                </li>
              }
              {categories.map(category => (
                <li key={category.id} onClick={() => {dispatch(filterByCategoryThunk(category.id)) 
                dispatch(setShowAll(true))
                dispatch(setIsShowing(false))
                window.scrollTo(0, 0)
                }}>
                  {category.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterByCategory;