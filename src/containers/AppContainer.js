import { connect } from 'react-redux';
import App from '../components/App';
import { showModal } from '../actions';

const mapStateToProps = (state) => {
  return {firstRunShowModal: state.modal.firstRunShow};
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoad:(args) => {
      if (args.firstRunShowModal) {
        // If we're running on iOS for the first time, show the home screen modal.
        if (!!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)) {
          dispatch(showModal('ios-save-to-home-screen'));
        }
      }
    }
  }
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
