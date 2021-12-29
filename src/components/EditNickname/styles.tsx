import styled from "@emotion/styled";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 350px;

  & input {
    cursor: pointer;
    height: 40px;
    outline: none;
    border: 1px solid;
    border-radius: 20px;
    padding: 20px;
    text-align: center;
    font-size: medium;
    font-weight: bold;
    margin-bottom: 15px;
    &:focus {
      --saf-0: rgba(var(--sk_highlight, 22, 70, 29), 1);
      box-shadow: 0 0 0 1px var(--saf-0), 0 0 0 5px rgba(15, 111, 221, 0.3);
    }
  }

  & > button {
    cursor: pointer;
    height: 40px;
    border-radius: 20px;
    background-color: #a3e4db;
    border: none;
    margin-bottom: 50px;
    text-align: center;
    position: relative;
    font-weight: 700;
  }

  & > button::after {
    content: "";
    position: absolute;
    left: 0px;
    bottom: -20px;
    display: block;
    width: 350px;
    border-bottom: 1px solid;
  }
`;
