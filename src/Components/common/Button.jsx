import React from 'react';
import styled, { css } from 'styled-components';
import {
  getBrandColor1,
  getBrandColor4,
  getDarkColor3,
  getDarkColor4,
  getWhiteColor2,
  getWhiteColor3,
  getWhiteColor4,
  getWhiteColor5,
  getDarkColor5,
} from '@/assets/style/theme';

const Button = ({ children, color, ...rest }) => (
  <StyledButton {...{ color }} {...rest}>
    {children}
  </StyledButton>
);

export const StyledButton = styled.button`
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  border: none;
  color: ${getDarkColor5};
  border-radius: 4px;
  padding: 0px 1.25rem;
  height: 2.5rem;
  font-size: 1.125rem;

  & + & {
    margin-left: 0.75rem;
  }

  svg {
    font-size: 1.25rem;
    margin-right: 0.5rem;
  }

  ${({ color }) => {
    if (color === 'lightGray') {
      return css`
        background-color: ${getWhiteColor3};
        color: black;
        &:focus,
        &:hover {
          background-color: ${getWhiteColor4};
        }
      `;
    }
    if (color === 'teal') {
      return css`
        color: ${getWhiteColor2};
        background-color: ${getBrandColor1};
        &:focus,
        &:hover {
          background-color: ${getBrandColor4};
        }
      `;
    }
    if (color === 'gray') {
      return css`
        background: ${getDarkColor4};
        color: ${getWhiteColor2};
        &:focus,
        &:hover {
          background-color: ${getWhiteColor5}|;
        }
      `;
    }
    return css`
      background-color: transparent;
      &:hover {
        background: ${getDarkColor3};
      }
    `;
  }}
`;

export default Button;
