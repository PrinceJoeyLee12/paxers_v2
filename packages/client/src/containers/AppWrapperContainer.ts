import { connect } from 'react-redux';
import { AppWrapper } from '../components/App/AppWrapper';
import { isAdminSelector } from '../modules/admin/selectors';

const mapStateToProps = (state: State.Root) => ({
  isAdmin: isAdminSelector(state),
});

export const AppWrapperContainer = connect(mapStateToProps)(AppWrapper);
