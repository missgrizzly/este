// @flow
import type { State } from '../types';
import Box from './Box';
import Text, { type TextProps } from './Text';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

const getAppErrorMessage = appError => {
  switch (appError.type) {
    case 'insufficientStorage':
      return (
        <FormattedMessage
          defaultMessage="Insufficient storage."
          id="appError.insufficientStorage"
        />
      );
    case 'xhrError':
      return (
        <FormattedMessage
          defaultMessage="Network error. Please try it later."
          id="appError.xhrError"
        />
      );
    case 'cannotSignInCredentialsInvalid':
      return (
        <FormattedMessage
          defaultMessage="Wrong email or password."
          id="appError.cannotSignInCredentialsInvalid"
        />
      );
    default:
      return appError.message;
  }
};

// There is no position fixed for React Native. Use commponent tree instead.
const browserOnlyStyle = {
  position: 'fixed',
};

const AppError = ({ errors }) => {
  if (!errors || !errors.appError) return null;
  const { appError } = errors;

  const message = getAppErrorMessage(appError);
  const titleWithStackForDevMode =
    process.env.NODE_ENV === 'production' ? '' : appError.stack || '';
  return (
    <Box style={browserOnlyStyle} top={0} left={0} right={0} zIndex={1}>
      <Text
        alignSelf="center"
        backgroundColor="warning"
        bold
        color="white"
        display="inline"
        paddingHorizontal={1}
        paddingVertical={0.5}
        title={titleWithStackForDevMode}
      >
        {message}
      </Text>
    </Box>
  );
};

export default connect((state: State) => ({
  errors: state.app.errors,
}))(AppError);
