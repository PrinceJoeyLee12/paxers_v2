import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Login from '../components/pages/Login';

import { firstNameSelector, userDataSelector } from '../modules/user/selectors';

const mapActionCreators = (dispatch: Dispatch) => ({
  cleanup(): void {},
});

const mapStateToProps = (state: State.Root) => ({
  firstName: firstNameSelector(state),
});

export const PageLoginContainer = connect(
  mapStateToProps,
  mapActionCreators
)(Login);
