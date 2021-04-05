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

  describe.only("When logged in", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3003/api/login", {
        username: "Admin Test",
        password: "password",
      }).then((response) => {
        localStorage.setItem("loggedInUser", JSON.stringify(response.body));
        cy.visit("http://localhost:3000");
      });
    });

    it("A blog can be created", function () {
      cy.contains("Add new blog").click();
      cy.get("#title").type("Test blog");
      cy.get("#author").type("Test Author");
      cy.get("#url").type("www.testlink.com");
      cy.get(".create-blog-button").click();
      // eslint-disable-next-line quotes
      cy.contains('A new blog "Test blog" by Test Author was added');
      cy.contains("Test blog by Test Author");
    });
  });
});
