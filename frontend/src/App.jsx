import "./css/App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/MainLayout";
import SplitScreen from "./pages/marketing/SplitScreen";
import ContactPage from "./pages/marketing/ContactPage";
import About from "./pages/marketing/About";

export default function App() {
  return <SplitScreen />;
}
