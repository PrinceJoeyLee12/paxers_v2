import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import App from '../components/App/App';

import { tokenSelector } from '../modules/user/selectors';
import { getUserData } from '../modules/user/actions';

const mapActionCreators = (dispatch: Dispatch) => ({
  async initialize(): Promise<void> {
    await getUserData();
  },
});

const mapStateToProps = (state: State.Root) => ({
  token: tokenSelector(state),
});

export const AppContainer = connect(mapStateToProps, mapActionCreators)(App);
