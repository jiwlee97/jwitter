import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > button {
    width: 350px;
    cursor: pointer;
    border: none;
    background-color: #f54748;
    height: 40px;
    border-radius: 20px;
    font-weight: 700;
    color: white;
  }
`;
