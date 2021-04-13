
// *** ENTER COMMIT SHA OF YOUR REPO IN HERE ***
const commitSHA = '12a3092'

// *** DO NOT REMOVE OR CHANGE THIS LINE ***
describe(`\nEND TO END TESTS: ${Cypress.env('SOLUTION') || 'your-solution'} [ ${commitSHA} ]\n`, function () {


  describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
        name: 'Ned Flanders',
        username: 'ned',
        password: 'ned'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
      //cy.visit('http://localhost:3000')
      cy.contains('log in to application')
      cy.contains('username')
      cy.contains('password')
    })

    describe('Login',function() {
      it('succeeds with correct credentials', function() {
        cy.get('#username').type('ned')
        cy.get('#password').type('ned')
        cy.get('#login-button').click()
    
        cy.contains('Ned Flanders logged in')
      })
  
      it('fails with wrong credentials', function() {
        cy.get('#username').type('ned')
        cy.get('#password').type('wrong')
        cy.get('#login-button').click()
    
        cy.get('.msg')
          .should('contain', 'wrong username or password')
          .and('have.css', 'color', 'rgb(255, 0, 0)')
      })
    })

    describe('When logged in', function() {
      beforeEach(function() {
        cy.get('#username').type('ned')
        cy.get('#password').type('ned')
        cy.get('#login-button').click()
      })
  
      it('a blog can be created', function() {
        cy.contains('create new blog').click()
        cy.get('#title').type('Easter Story')
        cy.get('#author').type('Ned')
        cy.get('#url').type('http://host/1')
        cy.get('#create-button').click()
        cy.contains('Easter Story Ned')
      })

      describe('and a blog is exists', function() {
        beforeEach(function() {
          cy.contains('create new blog').click()
          cy.get('#title').type('Easter Story')
          cy.get('#author').type('Ned')
          cy.get('#url').type('http://host/1')
          cy.get('#create-button').click()
        })

        it('user can like a blog', function() {
          cy.contains('Easter Story Ned')
            .contains('view')
            .click()
          cy.contains('Easter Story Ned').parent().find('button').contains('like').click()
          cy.contains('Easter Story Ned').parent().find('div').contains('likes 1')
        })

        it('user who craeted a blog can delete it', function() {
          cy.contains('view').click()
          cy.contains('remove').click()
          cy.get('html').should('not.contain', 'Easter Story Ned')
        })
      })
    })
  
  })
  

})
