import React from 'react';
import * as Styled from './styles';
import * as Main from '@/pages/Main/styles';

const Write = ({ children, ...rest }) => {
  return (
    <Main.Container>
      <Styled.Form {...rest}>{children}</Styled.Form>
    </Main.Container>
  );
};

export default Write;
