import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Register from '../components/pages/Register';

import { firstNameSelector, userDataSelector } from '../modules/user/selectors';

const mapActionCreators = (dispatch: Dispatch) => ({
  cleanup(): void {},
});

const mapStateToProps = (state: State.Root) => ({
  firstName: firstNameSelector(state),
});

export const PageRegisterContainer = connect(
  mapStateToProps,
  mapActionCreators
)(Register);
