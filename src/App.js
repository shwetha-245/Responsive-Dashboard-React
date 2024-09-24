// src/App.js
import React from "react";
import { Provider } from "react-redux";
import styled from "styled-components";
import store from "./redux/store";
import Dashboard from "../src/Component/Dashboard";

// Styled components
const AppContainer = styled.div`
  text-align: center;
  font-family: "Arial, sans-serif";
  min-height: 100vh;
`;


const Title = styled.h1`
  color: Violet;
  margin-top: 20px;
  font-size: 2.5rem;
`;

const App = () => {
  return (
    <Provider store={store}>
      <AppContainer>
        <Title>Interactive Dashboard</Title>
        <Dashboard />
      </AppContainer>
    </Provider>
  );
};

export default App;



