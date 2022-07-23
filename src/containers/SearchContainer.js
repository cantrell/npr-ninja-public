import { connect } from 'react-redux';
import Search from '../components/Search';
import { requestStories,
         searchStories } from '../actions';

const mapStateToProps = (state) => {
  return {searchTerm: state.storyList.searchTerm};
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearch: (e) => {
      e.preventDefault();
      const searchTerm = e.target['search-input'].value;
      if (searchTerm) {
        dispatch(searchStories(searchTerm, 1));
      }
    },
    onReset: (e) => {
      dispatch(requestStories(1));
    }
  }
}

const SearchContainer = connect(mapStateToProps, mapDispatchToProps)(Search);

export default SearchContainer;
