import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import SuspenseLoader from "./components/suspense-loader.tsx";
import "./global.css";
import { router } from "./routes/routes.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<SuspenseLoader />}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster
          position="top-center"
          toastOptions={{
            className: "p-0! border-none! [&>div]:w-full bg-white! w-full!",
          }}
        />
      </QueryClientProvider>
    </Suspense>
  </StrictMode>,
);
