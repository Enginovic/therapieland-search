// https://docs.cypress.io/api/introduction/api.html

describe("Check for h1", () => {
  it("Visits the app root url", () => {
    cy.visit("/");
    cy.contains("h1", "Search for a posts");
  });
});

describe("Check for post items", () => {
  it("starts with zero items", () => {
    cy.visit("/");
    cy.contains(".posts").should("not.exist");
    cy.contains("h3", "No posts found");
  });
});

describe("Check for history", () => {
  it("starts with zero items", () => {
    cy.visit("/");
    cy.contains(".search-history").should("not.exist");
  });
});
