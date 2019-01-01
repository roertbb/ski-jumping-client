import styled, { css } from 'styled-components';

const Container = styled.div`
  position: relative;
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
          align-items: center;
          h1,
          h3 {
            margin-bottom: 0;
          }
        `}
`;

export default Container;
