import styled from 'styled-components';

const Spinner = styled.div`
  border-radius: 50%;
  width: 10em;
  height: 10em;
  margin: ${({ theme }) => theme.spacing.s} auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(231, 233, 239, 0.2);
  border-right: 1.1em solid rgba(231, 233, 239, 0.2);
  border-bottom: 1.1em solid rgba(231, 233, 239, 0.2);
  border-left: 1.1em solid #e7e9ef;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
  &:after {
    border-radius: 50%;
    width: 10em;
    height: 10em;
  }
  @-webkit-keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

export default Spinner;
