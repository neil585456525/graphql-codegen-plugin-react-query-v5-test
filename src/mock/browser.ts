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
  graphql.query("GetPeople", async (req, res, ctx) => {
    const targetNextToken = "eyJ2IjoiMS4wIn0=";
    await new Promise((resolve) => setTimeout(resolve, 2000));
    if (req.variables.nextToken === targetNextToken) {
      console.log("nextToken is the same as targetNextToken");
      return res(
        ctx.data({
          people: {
            items: [
              {
                id: "4",
                name: "Darth Vader",
              },
              {
                id: "5",
                name: "Leia Organa",
              },
            ],
            nextToken: "",
          },
        })
      );
    }
    return res(
      ctx.data({
        people: {
          items: [
            {
              id: "1",
              name: "Luke Skywalker",
            },
            {
              id: "2",
              name: "C-3PO",
            },
            {
              id: "3",
              name: "R2-D2",
            },
          ],
          nextToken: targetNextToken,
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
