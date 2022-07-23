import { connect } from 'react-redux';
import LoadingSignal from '../components/LoadingSignal';

const mapStateToProps = (state) => {
  return {networkActivity: state.networkActivity};
}

const LoadingSignalContainer = connect(mapStateToProps)(LoadingSignal);

export default LoadingSignalContainer;
