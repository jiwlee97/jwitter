import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20px;

  & button {
    cursor: pointer;
    margin-bottom: 12px;
    border: none;
    border-radius: 20px;
    background-color: #fed1ef;
    font-size: 18px;
    padding: 10px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 350px;
  & input {
    cursor: pointer;
    height: 42px;
    border-radius: 20px;
    --saf-0: rgba(var(--sk_foreground_high_solid, 134, 134, 134), 1);
    border: 1px solid var(--saf-0);
    margin: 0 0 15px;
    padding: 0px 20px;
    font-size: 18px;
    outline: none;
    &:focus {
      --saf-0: rgba(var(--sk_highlight, 22, 70, 29), 1);
      box-shadow: 0 0 0 1px var(--saf-0), 0 0 0 5px rgba(15, 111, 221, 0.3);
    }
  }

  & > button {
    background-color: #a3e4db;
  }
`;
