describe('Swagger /docs Page Test endpoint GET user/{id}', () => {
  beforeEach(() => {
    // Visit the /docs endpoint
		cy.visit('http://localhost:8080/docs');
	})
  it('should load the Swagger docs page successfully', () => {

      // Verify that the Swagger UI is visible
      cy.contains('BookFellas').should('be.visible'); //Check the title
      cy.contains('Contact Panos Lekos').should('be.visible'); // Check contact info is shown
      cy.contains('Book').should('be.visible'); // Check if the Book model is shown
  });

  it('should open the GET /book/{id} endpoint and try to execute', () => {
    cy.get('#operations-Book-bookIdGET').click(); // Click on the GET /book/{id} endpoint
    cy.contains('Parameters').should('be.visible'); // Check if the parameters section is shown
    cy.get('.btn.try-out__btn').should('be.visible').click(); // Click on the "Try it out" button
    cy.get('input[placeholder="id"]').type('12345'); // Enter a book id
    cy.get('.btn.execute.opblock-control__btn').click(); // Click on the "Execute" button
    cy.contains('Book not found').should('be.visible'); // Check if the response is shown
  });

});