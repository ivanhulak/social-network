import React from 'react';
import styled from 'styled-components';

const StyledNotFound = styled.div`
   height: 80vh;
   font-size: 42px;
   display: flex;
   justify-content: center;
   align-items: center;
   color: ${({ theme }) => theme.headersColor};
`;
export const NotFound: React.FC = () => {
   return (
      <StyledNotFound>Not found page</StyledNotFound>
   );
}