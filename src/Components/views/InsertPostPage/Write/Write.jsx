import React from 'react';
import * as Styled from './style';
import * as Main from '@/Components/views/MainPage/Main/style';

const Write = ({ children, ...rest }) => {
  return (
    <Main.Container>
      <Styled.Form {...rest}>{children}</Styled.Form>
    </Main.Container>
  );
};

export default Write;
