import { type JSX } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import Page from "./components/Page";
import PageDetail from "./components/PageDetail";
import { Endpoints } from "./lib/api";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route
            element={<Navigate to={Endpoints.people} replace />}
            path="/"
          />
          <Route path={`/:queryKey`} element={<Page />} />
          <Route path={`/:queryKey/:id`} element={<PageDetail />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
