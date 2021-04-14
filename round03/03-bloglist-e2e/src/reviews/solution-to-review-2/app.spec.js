
// *** ENTER COMMIT SHA OF YOUR REPO IN HERE ***
const commitSHA = '2feb4fcb'

// *** DO NOT REMOVE OR CHANGE THIS LINE ***
describe(`\nEND TO END TESTS: ${Cypress.env('SOLUTION') || 'your-solution'} [ ${commitSHA} ]\n`, function () {
  
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/blogs/', user) 
    
    const userOther = {
      name: 'Other User',
      username: 'otheruser',
      password: 'salaamaton'
    }
    cy.request('POST', 'http://localhost:3003/api/blogs', userOther)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function() { 
    cy.get('#username')
    cy.get('#password')
    cy.contains('login')
  })

  it ('login succeeds with correct credentials', function(){
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()
    cy.contains('Matti Luukkainen logged-in')

  })

  it ('login fails with wrong credentials', function(){
    cy.get('#username').type('mluukkai');
    cy.get('#password').type('vaara');
    cy.get('#login-button').click();

    cy.get('.notification')
        .should('Wrong username or password')   
    
    cy.get('html').should('not.contain', 'Matti Luukkainen logged-in');
  })
  
})
