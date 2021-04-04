describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.request("POST", "http://localhost:3003/api/users", {
      username: "Admin Test",
      password: "password",
      name: "Tester",
    });
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.get("h1").should("contain", "Log in to application");

    cy.get("form").get("button").should("contain", "Login");
  });

  describe("Login", function () {
    it("Succeeds with correct credentials", function () {
      cy.get("#username").type("Admin Test");
      cy.get("#password").type("password");
      cy.get("#login-button").click();

      cy.contains("Admin Test logged in");
    });

    it("Fails with wrong credentials", function () {
      cy.get("#username").type("Admin Test");
      cy.get("#password").type("wrong password");
      cy.get("#login-button").click();

      cy.get(".notification")
        .contains("Wrong username or password")
        .should("have.css", "border-color", "rgb(255, 0, 0)");
    });
  });
});
