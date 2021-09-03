import Containers from './BodyFeature/Containers';
import styled from 'styled-components';

const Wrapper = styled.div`
  .mainPage {
    background-color: #f8f8f8;
    height: 200vh;
  }
  .mainPage_header {
    z-index: 1;
  }
  .mainPage_body {
    z-index: 0;
  }
`

export default function Body (
    { 
        isLogin, 
        isStared, 
        isSearched, 
        handleIsStaredDelete, 
        handleIsSearched,
        isLoading,
        isStaredLoading
    }) {

    return (
      <Wrapper>
          <div className="body">
              <Containers 
                  isLogin={isLogin} 
                  isStared={isStared} 
                  isSearched={isSearched} 
                  handleIsStaredDelete={handleIsStaredDelete} 
                  handleIsSearched={handleIsSearched} 
                  isLoading={isLoading}
                  isStaredLoading={isStaredLoading}
              />
          </div>
      </Wrapper>
    );
}
