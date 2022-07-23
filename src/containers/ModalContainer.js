import { connect } from 'react-redux';
import Modal from '../components/Modal';
import { hideModal,
         closeFirstRunModal } from '../actions';

const mapStateToProps = (state) => {
  return {modalKey: state.modal.key};
}

const mapDispatchToProps = (dispatch) => {
  return {
    onHide:(modalKey) => {
      dispatch(hideModal(modalKey));
    },
    onCloseFirstRun:(modalKey) => {
      dispatch(closeFirstRunModal(modalKey));
    }
  }
}

const ModalContainer = connect(mapStateToProps, mapDispatchToProps)(Modal);

export default ModalContainer;
