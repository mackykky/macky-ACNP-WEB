import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./Layout/MainLayout.jsx";
import MainPage from "./Pages/MainPage.jsx"; // Import MainPage
import ProductsByType from "./Components/Main/ProductsByType.jsx"; // Ensure the correct path
import PageNotFound from "./Pages/PageNotFound.jsx"; // Assuming you have a PageNotFound component
import "./index.css";
import BookingPage from "./Pages/BookingPage.jsx";



const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <PageNotFound />,
    children: [
      { path: "/", element: <MainPage /> },
      { path: "products/:type", element: <ProductsByType /> },
      { path: "book-appointment", element: <BookingPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);