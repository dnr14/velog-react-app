import React from 'react';
import Loading from '@/Components/common/Loading';

const withLoading = Component => {
  return function component({ loading, ...rest }) {
    return (
      <>
        <Loading {...{ loading }} />
        <Component {...rest} />
      </>
    );
  };
};

export default withLoading;
