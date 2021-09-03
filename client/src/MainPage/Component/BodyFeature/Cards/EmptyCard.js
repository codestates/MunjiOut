import styled from 'styled-components';

const Wrapper = styled.div`
    .emptyCard {
    margin: 10px;
    width: 30vw;
    height: 200px;
    text-align: center;
    border-radius: 5px;
    border: 2px solid gray;
    background-color: gray;
    }
`
export default function EmptyCard () {
    return (
        <Wrapper>
            <div className="emptyCard"></div>
        </Wrapper>
    );
}
