import { connect } from 'react-redux';
import Footer from '../components/Footer';
import { VIEW_MODES,
         requestStories,
         searchStories,
         showModal } from '../actions';

const mapStateToProps = (state) => {
  return {storyList: state.storyList};
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRefresh: (viewMode, searchTerm) => {
      if (viewMode === VIEW_MODES.FEED) {
        dispatch(requestStories(1, searchTerm));
      } else if (viewMode === VIEW_MODES.SEARCH) {
        dispatch(searchStories(searchTerm, 1));
      }
    },
    onShowModal: (modal) => {
      dispatch(showModal(modal));
    }
  }
}

const FooterContainer = connect(mapStateToProps, mapDispatchToProps)(Footer);

export default FooterContainer;
