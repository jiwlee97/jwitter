import styled from "@emotion/styled";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 350px;

  input[type="text"] {
    cursor: pointer;
    width: 100%;
    height: 50px;
    border-radius: 50px;
    border: 1px solid #1c6dd0;
    margin: 0 0 20px;
    padding: 0px 60px 0px 20px;
    font-size: 18px;
    outline: none;
    &:focus {
      --saf-0: rgba(var(--sk_highlight, 22, 70, 29), 1);
      box-shadow: 0 0 0 1px var(--saf-0), 0 0 0 5px rgba(15, 111, 221, 0.3);
    }
  }

  & > button {
    cursor: pointer;
    position: absolute;
    right: 0;
    top: 0px;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    border: none;
    background-color: #1c6dd0;
    color: white;
  }

  label {
    cursor: pointer;
    color: #1c6dd0;
    margin-bottom: 30px;
  }

  input[type="file"] {
    display: none;
  }
`;

export const ImgPreview = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  & img {
    overflow: over;
    width: auto;
    height: auto;
    max-width: 200px;
    max-height: 200px;
  }
  & button {
    cursor: pointer;
    background: transparent;
    border: none;
  }
`;
