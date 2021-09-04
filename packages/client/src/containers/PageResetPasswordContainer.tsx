import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import ResetPassword from '../components/pages/ResetPassword';

import { firstNameSelector, userDataSelector } from '../modules/user/selectors';

const mapActionCreators = (dispatch: Dispatch) => ({
  cleanup(): void {},
});

const mapStateToProps = (state: State.Root) => ({
  firstName: firstNameSelector(state),
});

export const PageResetPasswordContainer = connect(
  mapStateToProps,
  mapActionCreators
)(ResetPassword);
