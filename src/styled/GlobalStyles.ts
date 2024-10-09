import RobotoThin from "../fonts/Roboto-Thin.ttf";
import RobotoLight from "../fonts/Roboto-Light.ttf";
import RobotoRegular from "../fonts/Roboto-Regular.ttf";
import RobotoMedium from "../fonts/Roboto-Medium.ttf";
import RobotoBold from "../fonts/Roboto-Bold.ttf";
import RobotoBlack from "../fonts/Roboto-Black.ttf";
import styled, { createGlobalStyle } from "styled-components";

export const Container = styled.div`
     width: 800px;
     margin: 0 auto;
`;

export const GlobalStyle = createGlobalStyle`
     @font-face {
          font-family: Roboto;
          src: url("${RobotoThin}");
          font-weight: 200;
     }

     @font-face {
          font-family: Roboto;
          src: url("${RobotoLight}");
          font-weight: 300;
     }

     @font-face {
          font-family: Roboto;
          src: url("${RobotoRegular}");
          font-weight: 400;
     }

     @font-face {
          font-family: Roboto;
          src: url("${RobotoMedium}");
          font-weight: 500;
     }

     @font-face {
          font-family: Roboto;
          src: url("${RobotoBold}");
          font-weight: 700;
     }

     @font-face {
          font-family: Roboto;
          src: url("${RobotoBlack}");
          font-weight: 900;
     }

     *, *::after, *::before {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
          font-family: Roboto;
     }
`;
