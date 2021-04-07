describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.request("POST", "http://localhost:3003/api/users", {
      username: "Admin Test",
      password: "password",
      name: "Tester",
    });
    cy.request("POST", "http://localhost:3003/api/users", {
      username: "Admin 2",
      password: "password",
      name: "Tester 2",
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

  describe("When logged in", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3003/api/login", {
        username: "Admin Test",
        password: "password",
      }).then((response) => {
        localStorage.setItem("loggedInUser", JSON.stringify(response.body));
        let token = response.body.token;
        let request = {
          title: "First test blog",
          author: "First test author",
          url: "www.test.com",
        };
        cy.request({
          method: "POST",
          url: "http://localhost:3003/api/blogs",
          headers: {
            Authorization: `bearer ${token}`,
          },
          body: request,
        });
      });
      cy.visit("http://localhost:3000");
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

    it("Blog can be liked", function () {
      cy.contains("View").click();
      cy.get(".like-button").parent().should("contain", "likes: 0");
      cy.get(".like-button").click();
      cy.get(".like-button").parent().should("contain", "likes: 1");
    });

    it("Blog can be deleted by user who created it", function () {
      cy.get(".blog-header");
      cy.contains("View").click();
      cy.get(".delete-button").click();
      cy.get("#blog-header").should("not.exist");
    });

    it("Blog cannot be delete by user who did not create it", function () {
      cy.get(".logout-button").click();
      cy.request("POST", "http://localhost:3003/api/login", {
        username: "Admin 2",
        password: "password",
      }).then((response) => {
        localStorage.setItem("loggedInUser", JSON.stringify(response.body));
        cy.visit("http://localhost:3000");
        cy.contains("View").click();
        cy.get(".delete-button").should("not.exist");
      });
    });
  });

  describe("Blogs are ordered by likes", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3003/api/login", {
        username: "Admin Test",
        password: "password",
      }).then((response) => {
        localStorage.setItem("loggedInUser", JSON.stringify(response.body));
        let token = response.body.token;
        let request = {
          title: "First test blog",
          author: "First test author",
          url: "www.test.com",
        };
        cy.request({
          method: "POST",
          url: "http://localhost:3003/api/blogs",
          headers: {
            Authorization: `bearer ${token}`,
          },
          body: request,
        });

        let request2 = {
          title: "Second test blog",
          author: "Second test author",
          url: "www.test.com",
          likes: 1,
        };
        cy.request({
          method: "POST",
          url: "http://localhost:3003/api/blogs",
          headers: {
            Authorization: `bearer ${token}`,
          },
          body: request2,
        });
      });
      cy.visit("http://localhost:3000");
    });

    it("Blogs are ordered by likes", function () {
      //Assert that second test blog with 1 like is first
      cy.get(".blogs").children().first().contains("Second test blog");
      cy.get(".blogs").children().last().contains("View").click();

      //Like First test blog twice
      cy.get(".blogs").children().last().contains("like").click().click();

      //Assert that First test blog with 2 likes is now first
      cy.get(".blogs").children().first().contains("First test blog");
    });
  });
});
