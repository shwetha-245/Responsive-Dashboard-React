import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { removeWidget } from "../redux/dashboardSlice";
import { mobile } from "../responsive";

// Styled components
const WidgetContainer = styled.div`
  background-color: #f5f7f8;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid black;
  box-shadow: 0 6px 15px rgba(128, 0, 128, 0.5);
  width: 270px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative; /* Added position relative to position the cross */

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(128, 0, 128, 0.7);
  }

  ${mobile({ width: "100%", padding: "15px", marginBottom: "20px" })};
`;

const WidgetTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 10px;

  ${mobile({ fontSize: "1rem", marginBottom: "8px" })};
`;

const WidgetText = styled.p`
  font-size: 1rem;
  margin-bottom: 10px;

  ${mobile({ fontSize: "0.9rem", marginBottom: "8px" })};
`;

const RemoveIcon = styled.div`
  position: absolute; /* Positioned absolutely */
  top: 10px; /* Position it at the top */
  right: 10px; /* Position it to the right */
  width: 25px; /* Size of the cross */
  height: 25px; /* Size of the cross */
  background-color: violet; /* Color of the cross */
  border-radius: 50%; /* Make it round */
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(128, 0, 128, 0.5); /* Shadow effect */
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 6px 15px rgba(128, 0, 128, 0.7); /* Thicker shadow on hover */
  }

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 15px;
    height: 2px;
    background-color: white; /* Cross color */
  }

  &::before {
    transform: rotate(45deg); /* Rotate for cross */
  }

  &::after {
    transform: rotate(-45deg); /* Rotate for cross */
  }
`;

const Widget = ({ widget }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeWidget({ widgetId: widget.id }));
  };

  return (
    <WidgetContainer>
      <RemoveIcon onClick={handleRemove} />
      <WidgetTitle>{widget.name}</WidgetTitle>
      <WidgetText>{widget.text}</WidgetText>
    </WidgetContainer>
  );
};

export default Widget;

