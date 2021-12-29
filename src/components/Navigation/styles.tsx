import styled from "@emotion/styled";

export const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0;
  & ul {
    display: flex;
    & li {
      list-style: none;
      margin-right: 20px;
      cursor: pointer;
      padding: 5px 10px;
      & span {
        color: #1c6dd0;
        /* font-size: 18px; */
      }
    }
  }
`;
