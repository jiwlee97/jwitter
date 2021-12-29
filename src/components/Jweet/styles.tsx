import styled from "@emotion/styled";

export const JweetContainer = styled.div<{
  isCreator: boolean;
  imgExit: boolean;
}>`
  background-color: ${({ isCreator }) => (isCreator ? "#a3e4db" : "#FED1EF")};
  width: 350px;
  min-height: 70px;
  padding: 20px;
  margin-bottom: ${({ imgExit }) => (imgExit ? "55px" : "20px")};
  border-radius: 20px;
  position: relative;

  & div {
    max-width: 260px;
    font-size: large;
    word-break: break-all;
  }
`;

export const ImgWrapper = styled.div`
  position: absolute;
  right: -35px;
  bottom: -35px;
  & div {
    position: relative;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    overflow: hidden;
    & > img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

export const Buttons = styled.div`
  position: absolute;
  top: 10px;
  right: 15px;

  & button {
    cursor: pointer;
    background: transparent;
    border: none;
    padding: 0px 3px;
  }
`;

export const EditJweetForm = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: #61c0bf;
  width: 350px;
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 20px;
  & input {
    cursor: pointer;
    background: transparent;
    min-height: 40px;
    border: none;
    outline: none;
    font-size: large;
    max-width: 260px;
  }
`;
