import React from 'react';
import styled from 'styled-components';
import { pc3, pc2, pc1 } from '@/assets/style/theme';

const withLayout = Component => {
  return function component({ children, ...rest }) {
    return (
      <Container>
        <Component {...rest}>{children}</Component>
      </Container>
    );
  };
};

const Container = styled.article`
  max-width: 1728px;
  margin: 0 auto;
  ${pc3} {
    width: 1376px;
  }
  ${pc2} {
    width: 1024px;
  }
  ${pc1} {
    width: calc(100% - 2rem);
  }
`;

export default withLayout;
