import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  max-width: 720px;
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  align-items: center;
  margin: 0 auto;
  position: relative;
  padding: 1rem 1.3rem;
  background-color: ${(props) => props.backgroundColor};

  @media (max-width: 540px) {
    padding: 1rem;
  }
`;

Container.defaultProps = {
  backgroundColor: 'inherit',
};

export default Container;
