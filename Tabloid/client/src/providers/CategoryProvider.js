import React, { useState, useContext, createContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const CategoryContext = React.createContext();

export const CategoryProvider = (props) => {
  const [categories, setCategories] = useState([]);
  const { getToken } = useContext(UserProfileContext);

  const getAllCategories = () =>
    getToken().then((token) =>
      fetch("/api/category", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(setCategories)
    );

  const addCategory = (category) =>
    getToken().then((token) =>
      fetch("/api/category", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      }).then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error("Unauthorized");
      })
    );

  const deleteCategory = (id) =>
    getToken().then((token) =>
      fetch(`/api/category/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((resp) => {
      if (resp.ok) {
      return resp.json();
    }
    throw new Error("Unauthorized");
  }))

  const updateCategory = (category) =>
    getToken().then((token) =>
      fetch(`/api/category/${category.id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(category)
      }).then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error("Unauthorized");
      })
    );

  return (
    <CategoryContext.Provider
      value={{
        categories,
        getAllCategories,
        addCategory,
        deleteCategory,
        updateCategory
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};