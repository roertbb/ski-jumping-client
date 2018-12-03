import styled, { css } from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto ${({ theme }) => theme.spacing.l};

  ${({ blank }) =>
    !blank
      ? css`
          background-color: ${({ theme }) => theme.color.white};
          border-radius: ${({ theme }) => theme.spacing.m};
          padding: ${({ theme }) => theme.spacing.l};
          box-shadow: ${({ theme }) => theme.shadow};
        `
      : css`
          display: flex;
          justify-content: space-between;
          h1 {
            margin-bottom: 0;
          }
        `}
`;

export default Container;
