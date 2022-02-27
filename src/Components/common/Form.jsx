import React from 'react';
import styled from 'styled-components';
import withLayout from '@/hoc/withLayout';

const Form = ({ children, ...rest }) => (
  <StyledForm {...rest}>{children}</StyledForm>
);
const StyledForm = styled.form`
  flex: 1;
`;

export default withLayout(Form);
