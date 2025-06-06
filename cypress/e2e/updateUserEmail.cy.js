describe('Swagger /docs Page Test endpoint PUT user/{id}/email', () => {
    beforeEach(() => {
      // Visit the Swagger Docs page
      cy.visit('http://localhost:8080/docs');
    });
  
    it('should load the Swagger docs page successfully', () => {
      // Verify that the Swagger docs page loads correctly
      cy.contains('BookFellas').should('be.visible'); // Check application title
      cy.contains('User').should('be.visible'); // Check if the User model is visible
    });
  
    it('should open the PUT /user/{id}/email endpoint and try to execute', () => {
      cy.get('#operations-user-updateEmail').click(); // Click on the PUT /user/{id}/email endpoint
      cy.contains('Parameters').should('be.visible'); // Verify that the parameters section is visible
      cy.get('.btn.try-out__btn').should('be.visible').click(); // Click on the "Try it out" button
      cy.get('input[placeholder="id - ID of user"]').type('14');
      // Input data in the request body
      cy.get('textarea.body-param__text').clear().type('{\n  "email": "newemail@example.com"\n}');
      // Execute the request
      cy.get('.btn.execute.opblock-control__btn').click();
      // Verify the response
      cy.contains('"email": "newemail@example.com"').should('be.visible'); // Check that the email was updated
      cy.contains('200').should('be.visible'); // Check that the response status code is 200
    });

  });
