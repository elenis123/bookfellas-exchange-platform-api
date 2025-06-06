describe('Swagger /docs Page Test endpoint DELETE Rating/{id}', () => {
    beforeEach(() => {
      // Visit the Swagger Docs page
      cy.visit('http://localhost:8080/docs');
    });
  
    it('should load the Swagger docs page successfully', () => {
      // Verify that the Swagger docs page loads correctly
      cy.contains('BookFellas').should('be.visible'); // Check application title
      cy.contains('Rating').should('be.visible'); // Check if the Rating model is visible
    });
  
    it('should open the DELETE /rating/{id} endpoint and try to execute', () => {
      cy.get('#operations-rating-deleteRatingById').click(); // Click on the DELETE /rating/{id} endpoint
      cy.contains('Parameters').should('be.visible'); // Verify that the parameters section is visible
      cy.get('.btn.try-out__btn').should('be.visible').click(); // Click on the "Try it out" button
      cy.get('input[placeholder="id - ID of the rating"]').type('789'); //Input an id
      cy.get('.btn.execute.opblock-control__btn').click(); // Execute the request
      
      // Verify the response
      cy.contains('200').should('be.visible'); // Check that the response status code is 200
    });

  });