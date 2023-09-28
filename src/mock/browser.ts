// src/mocks/browser.js
import { setupWorker, graphql } from "msw";

// This configures a Service Worker with the given request handlers.
const worker = setupWorker(
  graphql.query("GetPerson", async (req, res, ctx) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return res(
      ctx.data({
        person: {
          id: "1",
          name: "Luke Skywalker",
        },
      })
    );
  }),
  graphql.mutation("CreatePerson", async (req, res, ctx) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const { name } = req.variables;
    return res(
      ctx.data({
        createPerson: {
          id: "2",
          name,
        },
      })
    );
  })
);

worker.start({ onUnhandledRequest: "bypass" });
