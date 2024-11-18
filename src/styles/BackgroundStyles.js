import styled from 'styled-components';

export const BackgroundOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    linear-gradient(
      rgba(30, 15, 5, 0.95) 50%, 
      rgba(20, 10, 5, 0.95) 50%
    );
  background-size: 100% 4px;
  z-index: 1;
  pointer-events: none;
  opacity: 0.15;
`;