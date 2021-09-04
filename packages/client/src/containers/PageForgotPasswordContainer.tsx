import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import ForgotPassword from '../components/pages/ForgotPassword';

import { firstNameSelector, userDataSelector } from '../modules/user/selectors';

const mapActionCreators = (dispatch: Dispatch) => ({
  cleanup(): void {},
});

const mapStateToProps = (state: State.Root) => ({
  firstName: firstNameSelector(state),
});

export const PageForgotPasswordContainer = connect(
  mapStateToProps,
  mapActionCreators
)(ForgotPassword);
