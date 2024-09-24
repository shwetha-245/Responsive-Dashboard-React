import { createSlice } from "@reduxjs/toolkit";
import dashboardData from "../dashboardData.json";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    categories: dashboardData.categories,
    searchQuery: "",
  },
  reducers: {
    addWidget: (state, action) => {
      const { categoryName, newWidget } = action.payload;
      const category = state.categories.find(
        (cat) => cat.name === categoryName
      );
      if (category) {
        category.widgets.push(newWidget);
      }
    },
    removeWidget: (state, action) => {
      const { widgetId } = action.payload;
      state.categories.forEach((category) => {
        category.widgets = category.widgets.filter(
          (widget) => widget.id !== widgetId
        );
      });
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    addCategory: (state, action) => {
      const newCategory = {
        name: action.payload,
        widgets: [],
      };
      state.categories.push(newCategory);
    },
    removeCategory: (state, action) => {
      const categoryName = action.payload;
      state.categories = state.categories.filter((cat) => cat.name !== categoryName);
    },
  },
});

export const { addWidget, removeWidget, setSearchQuery, addCategory, removeCategory } =
  dashboardSlice.actions;

export default dashboardSlice.reducer;
