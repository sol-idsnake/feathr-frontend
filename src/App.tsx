import { type JSX } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import NotFound from "./components/NotFound";
import Page from "./components/Page";
import PageDetail from "./components/PageDetail";
import { Endpoints } from "./lib/api";
import type { ApiRoute } from "./types/api";

const apiRoutes = Object.values(Endpoints) as ApiRoute[];

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route element={<Navigate to={Endpoints.people} replace />} path="/" />
          {apiRoutes.flatMap((route) => [
            <Route element={<Page queryKey={route} />} key={route} path={route} />,
            <Route
              element={<PageDetail queryKey={route} />}
              key={`${route}/:id`}
              path={`${route}/:id`}
            />,
          ])}

          {/* Catch-all for unmatched routes (3+ segments) */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
