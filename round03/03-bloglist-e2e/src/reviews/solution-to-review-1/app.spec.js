// *** ENTER COMMIT SHA OF YOUR REPO IN HERE ***
const commitSHA = "72821ab"

// *** DO NOT REMOVE OR CHANGE THIS LINE ***
describe(`\nEND TO END TESTS: ${
  Cypress.env("SOLUTION") || "your-solution"
} [ ${commitSHA} ]\n`, function () {
  const blogs = [
    {
      title: "First Test Blog Title",
      author: "First Test Blog Author",
      url: "http://site.com",
      likes: 0
    },
    {
      title: "Second Test Blog Title",
      author: "Second Test Blog Author",
      url: "http://site.com",
      likes: 0
    },
    {
      title: "Third Test Blog Title",
      author: "Third Test Blog Author",
      url: "http://site.com",
      likes: 0
    },
  ]

  const users = [
    {
      name: "ned",
      username: "ned",
      password: "ned",
    },
    {
      name: "Other Test User",
      username: "other_test_username",
      password: "ohter_test_password",
    },
  ]

  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset")
    const user = users[0]
    cy.request("POST", "http://localhost:3003/api/users/", user)
    cy.visit("http://localhost:3000")
  })

  describe("Login", function () {
    // test 1
    it("displays login form by default", function () {
      cy.get("[data-testid='Login_form']").should("be.visible")
    })

    // test 2
    it("succeeds with correct credentials", function () {
      const user = users[0]
      cy.get("[data-testid='Login_username']").type(user.username)
      cy.get("[data-testid='Login_password']").type(user.password)
      cy.get("[data-testid='Login_submitButton']").click()

      cy.contains("ned logged-in")
      cy.get("[data-testid='App_blogs']").should("be.visible")
    })

    // test 3
    it("fails with wrong credentials", function () {
      cy.server()
      cy.route("POST", "/api/login").as("failedLoginReq")

      cy.get("[data-testid='Login_username']").type("spam")
      cy.get("[data-testid='Login_password']").type("spam")
      cy.get("[data-testid='Login_submitButton']").click()

      cy.get("@failedLoginReq").should("have.property", "status", 401)

      cy.contains("Wrong credentials")

      cy.get("[data-testid='Login_form']").should("be.visible")
    })
  })

  describe("Blog app", function () {
    describe("When logged in", function () {
      beforeEach(function () {
        cy.server()
        // login
        const user = users[0]
        cy.get("[data-testid='Login_username']").type(user.username)
        cy.get("[data-testid='Login_password']").type(user.password)
        cy.get("[data-testid='Login_submitButton']").click()
      })

      it("A blog can be created", function () {
        // initialize and create blog
        cy.route("/api/blogs").as("initBlogs")
        cy.get("[data-testid='App_showBlogFormBtn']").click()
        const blog = blogs[0]
        cy.get("[data-testid='BlogForm_title']").type(blog.title)
        cy.get("[data-testid='BlogForm_author']").type(blog.author)
        cy.get("[data-testid='BlogForm_url']").type(blog.url)
        cy.get("[data-testid='BlogForm_submitButton']").click()

        // can be created
        cy.request("GET", "http://localhost:3003/api/blogs").then((res) => {
          const blogs = res.body
          const blog = blogs[0]
          expect(blogs).to.have.length(1)

          const { title, author, url } = blogs[0]

          expect(blog.title).to.equal(title)
          expect(blog.author).to.equal(author)
          expect(blog.url).to.equal(url)
        })

      })

      it("A blog can be liked", function () {
        cy.route("/api/blogs").as("initBlogs")
        cy.get("[data-testid='App_showBlogFormBtn']").click()
        const blog = blogs[0]
        cy.get("[data-testid='BlogForm_title']").type(blog.title)
        cy.get("[data-testid='BlogForm_author']").type(blog.author)
        cy.get("[data-testid='BlogForm_url']").type(blog.url)
        cy.get("[data-testid='BlogForm_submitButton']").click()
        cy.get("[data-testid='BlogForm_cancel']").click()
        cy.request("GET", "http://localhost:3003/api/blogs").then((res) => {
          const blogs = res.body
          const blog = blogs[0]
          cy.get(`[data-testid='Blog_${blog.id}_viewButton']`).click()
          cy.get(`[data-testid='Blog_${blog.id}_likesTxt']`).as("blogLikesTxt")
          cy.get("@blogLikesTxt").should("contain.text", blog.likes)

          cy.get(`[data-testid='Blog_${blog.id}_likeButton']`).click()
          cy.get("@blogLikesTxt").should("contain.text", blog.likes + 1)
        })
      })

      it("A blog can be deleted", function () {
        cy.route("/api/blogs").as("initBlogs")
        cy.get("[data-testid='App_showBlogFormBtn']").click()
        const blog = blogs[0]
        cy.get("[data-testid='BlogForm_title']").type(blog.title)
        cy.get("[data-testid='BlogForm_author']").type(blog.author)
        cy.get("[data-testid='BlogForm_url']").type(blog.url)
        cy.get("[data-testid='BlogForm_submitButton']").click()
        cy.get("[data-testid='BlogForm_cancel']").click()
        cy.request("GET", "http://localhost:3003/api/blogs").then((res) => {
          const blogs = res.body
          const blog = blogs[0]
          cy.get(`[data-testid='Blog_${blog.id}_viewButton']`).click()
          cy.get(`[data-testid='Blog_${blog.id}_deleteButton']`).click()
        cy.get(`[data-testid="Blog_${blog.id}"]`).should("not.exist")
        })
      })

      it("Blogs are ordered desc according to likes", function () {
        cy.route("/api/blogs").as("initBlogs")
        cy.get("[data-testid='App_showBlogFormBtn']").click()

        const [firstBlog, secondBlog, thirdBlog] = blogs

        cy.get("[data-testid='BlogForm_title']").type(firstBlog.title)
        cy.get("[data-testid='BlogForm_author']").type(firstBlog.author)
        cy.get("[data-testid='BlogForm_url']").type(firstBlog.url)
        cy.get("[data-testid='BlogForm_submitButton']").click()
        cy.get("[data-testid='BlogForm_cancel']").click()

        cy.get("[data-testid='App_showBlogFormBtn']").click()
        cy.get("[data-testid='BlogForm_title']").type(secondBlog.title)
        cy.get("[data-testid='BlogForm_author']").type(secondBlog.author)
        cy.get("[data-testid='BlogForm_url']").type(secondBlog.url)
        cy.get("[data-testid='BlogForm_submitButton']").click()
        cy.get("[data-testid='BlogForm_cancel']").click()

        cy.get("[data-testid='App_showBlogFormBtn']").click()
        cy.get("[data-testid='BlogForm_title']").type(thirdBlog.title)
        cy.get("[data-testid='BlogForm_author']").type(thirdBlog.author)
        cy.get("[data-testid='BlogForm_url']").type(thirdBlog.url)
        cy.get("[data-testid='BlogForm_submitButton']").click()
        cy.get("[data-testid='BlogForm_cancel']").click()

        cy.request("GET", "http://localhost:3003/api/blogs").then((res) => {

          const [blogOne, blogTwo, blogThree] = res.body.map((blog) => {
            return { id: blog.id, title: blog.title }
          })

          cy.get(`[data-testid='Blog_${blogOne.id}_viewButton']`).click()
          cy.get(`[data-testid='Blog_${blogTwo.id}_viewButton']`).click()
          cy.get(`[data-testid='Blog_${blogThree.id}_viewButton']`).click()
          cy.get(`[data-testid='Blog_${blogTwo.id}_likeButton']`)
            .click()
            .click()
          cy.get(`[data-testid='Blog_${blogThree.id}_likeButton']`).click()

          cy.get(`[data-testid='App_blogs']`).as("blogList")

          cy.get("@blogList").first().should("contain.text", blogTwo.title)
          cy.get("@blogList").last().should("contain.text", blogOne.title)
        })
      })
    })
  })
})
