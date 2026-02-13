import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./global.css";
import { router } from "./routes/routes.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense
      fallback={
        <div className="flex h-[60vh] items-center justify-center">
          <span className="animate-pulse text-sm text-muted-foreground">
            Loading...
          </span>
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>,
);
