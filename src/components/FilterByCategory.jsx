import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsShowing } from '../store/slices/isShowing.slice';
import { filterByCategoryThunk, getProductsThunk } from '../store/slices/products.slice';
import { setShowAll } from '../store/slices/showAll.slice';

const FilterByCategory = ({categories}) => {

  const showAll = useSelector(state => state.showAll)
  //console.log(categories);

  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      document.getElementById('filter-nav')?.classList.add('filter-by-category-container__appear');
      //document.getElementById('filter-overlay')?.classList.add('filter-by-category-overlay__appear');
    }, 1)
  }, []);

  const closeFilter = () => {
    document.getElementById('filter-nav')?.classList.remove('filter-by-category-container__appear');
    //document.getElementById('filter-overlay')?.classList.remove('filter-by-category-overlay__appear');
    setTimeout(() => {
      dispatch(setIsShowing(false));
    }, 500) 
  }

  return (
    <div className='filter-by-category-overlay' id='filter-overlay'>
      <div className="filter-by-category-container" id='filter-nav'>
        <div className='fbc-btn-container'>
          <button onClick={closeFilter}>
            <i className='bx bx-x bx-md' ></i>
          </button>
        </div>
        <div className="fbc-options-container">
          <h2>Filter by</h2>
          <div className="fbc-category-container">
            <p>CATEGORY</p>
            <ul>
              {showAll &&
                <li onClick={() => {
                  dispatch(getProductsThunk())
                  dispatch(setIsShowing(false))
                  window.scrollTo(0, 0)
                }}>
                  SHOW ALL
                </li>
              }
              {categories.map(category => (
                <li key={category.id} onClick={() => {dispatch(filterByCategoryThunk(category.id)) 
                dispatch(setShowAll(true))
                dispatch(setIsShowing(false))
                window.scrollTo(0, 0)
                }}>
                  {category.name.toUpperCase()}
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