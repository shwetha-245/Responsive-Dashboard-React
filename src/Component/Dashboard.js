import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Widget from "./Widget"; // Ensure the case matches your file
import { addWidget, setSearchQuery, addCategory, removeCategory } from "../redux/dashboardSlice";
import { mobile } from "../responsive";

// Styled components
const DashboardContainer = styled.div`
  padding: 20px;
  width: 1000px;
  margin: 0 auto;
  box-shadow: 0 6px 15px rgba(128, 0, 128, 0.5); /* Purple shadow */
  
  ${mobile({ width: "100%", padding: "10px" })};
`;

const CategoryContainer = styled.div`
  margin-bottom: 30px;
  box-shadow: 0 4px 10px rgba(128, 0, 128, 0.5); /* Purple shadow */

  ${mobile({ marginBottom: "20px" })};
`;

const CategoryTitle = styled.h2`
  font-size: 2rem; /* Increased font size */
  color: BLACK;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${mobile({ fontSize: "1.5rem", flexDirection: "column", alignItems: "flex-start" })};
`;

const AddWidgetBox = styled.div`
  background-color: #f5f7f8;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid black; /* Thin black border */
  box-shadow: 0 6px 15px rgba(128, 0, 128, 0.5); /* Purple shadow */
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 15px;

  &:hover {
    box-shadow: 0 8px 20px rgba(128, 0, 128, 0.7); /* Thicker shadow on hover */
  }
`;

const AddWidgetInput = styled.input`
  padding: 5px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const WidgetsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;

  ${mobile({ flexDirection: "column", gap: "10px" })};
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid black; /* Thin black border */
  border-radius: 5px;
  box-shadow: 0 6px 15px rgba(128, 0, 128, 0.5); /* Purple shadow */

  &:hover {
    box-shadow: 0 8px 20px rgba(128, 0, 128, 0.7); /* Thicker shadow on hover */
  }

  ${mobile({ padding: "8px" })};
`;

const NewCategoryContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const NewCategoryInput = styled.input`
  padding: 5px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const AddCategoryButton = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: violet;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: darkviolet;
  }
`;

const DeleteCategoryButton = styled.button`
  background-color: purple; /* Changed to purple */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 5px;
  box-shadow: 0 4px 10px rgba(128, 0, 128, 0.5); /* Purple shadow */

  &:hover {
    background-color: darkviolet;
    box-shadow: 0 6px 15px rgba(128, 0, 128, 0.7); /* Thicker shadow on hover */
  }
`;

const PlusIcon = styled.span`
  display: inline-block;
  width: 40px; /* Adjust size as needed */
  height: 40px; /* Adjust size as needed */
  border-radius: 50%; /* Circle */
  background-color: purple; /* Background color */
  color: white; /* Text color */
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(128, 0, 128, 0.5); /* Box shadow */
  font-size: 24px; /* Increase size of + symbol */
  cursor: pointer;
`;

const Dashboard = () => {
  const dispatch = useDispatch();
  const { categories, searchQuery } = useSelector((state) => state.dashboard);

  // Local state for new widgets in each category
  const [widgetInputs, setWidgetInputs] = useState({});
  const [newCategoryName, setNewCategoryName] = useState("");

  // Handle input change for individual category
  const handleInputChange = (categoryName, field, value) => {
    setWidgetInputs((prevInputs) => ({
      ...prevInputs,
      [categoryName]: {
        ...prevInputs[categoryName],
        [field]: value,
      },
    }));
  };

  const handleAddWidget = (categoryName) => {
    const newWidgetName = widgetInputs[categoryName]?.name || "";
    const newWidgetText = widgetInputs[categoryName]?.text || "";

    if (newWidgetName && newWidgetText) {
      const newWidget = {
        id: Date.now(), // Unique ID based on timestamp
        name: newWidgetName,
        text: newWidgetText,
      };

      dispatch(addWidget({ categoryName, newWidget }));
      setWidgetInputs((prevInputs) => ({
        ...prevInputs,
        [categoryName]: {
          name: "",
          text: "",
        },
      }));
    }
  };

  const handleAddCategory = () => {
    if (newCategoryName) {
      dispatch(addCategory(newCategoryName));
      setNewCategoryName("");
    }
  };

  const handleDeleteCategory = (categoryName) => {
    dispatch(removeCategory(categoryName));
  };

  const handleSearchChange = (event) => {
    dispatch(setSearchQuery(event.target.value));
  };

  const filteredCategories = categories.map((category) => ({
    ...category,
    widgets: category.widgets.filter((widget) =>
      widget.name.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  }));

  return (
    <DashboardContainer>
      <SearchInput
        type="text"
        placeholder="SEARCH WIDGETS...."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <NewCategoryContainer>
        <NewCategoryInput
          type="text"
          placeholder="New Category Name"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        <AddCategoryButton onClick={handleAddCategory}>Add Category</AddCategoryButton>
      </NewCategoryContainer>
      {filteredCategories.map((category) => (
        <CategoryContainer key={category.name}>
          <CategoryTitle>
            {category.name}
            <DeleteCategoryButton onClick={() => handleDeleteCategory(category.name)}>
              Delete Category
            </DeleteCategoryButton>
          </CategoryTitle>
          <AddWidgetBox>
            <AddWidgetInput
              type="text"
              placeholder="Widget Name"
              value={widgetInputs[category.name]?.name || ""}
              onChange={(e) => handleInputChange(category.name, "name", e.target.value)}
            />
            <AddWidgetInput
              type="text"
              placeholder="Widget Text"
              value={widgetInputs[category.name]?.text || ""}
              onChange={(e) => handleInputChange(category.name, "text", e.target.value)}
            />
            <PlusIcon onClick={() => handleAddWidget(category.name)}>+</PlusIcon>
          </AddWidgetBox>
          <WidgetsContainer>
            {category.widgets.map((widget) => (
              <Widget key={widget.id} widget={widget} />
            ))}
          </WidgetsContainer>
        </CategoryContainer>
      ))}
    </DashboardContainer>
  );
};

export default Dashboard;
