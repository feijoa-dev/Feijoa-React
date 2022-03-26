/// <reference types="cypress" />


describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  describe("Managed feature flag", () => {

    describe("React element component", () => {
      
      it('displays active feature', () => {
        cy.contains('Visible').should('have.length', 1)
      });
  
      it('hides inactive feature', () => {
        cy.contains('Visible').should('have.length', 1)
      });

    })

    describe("React hook", () => {

      it('displays active feature', () => {
        cy.get('.feature-flag').should('have.length', 1)
      });
  
      it('hides inactive feature', () => {
        cy.get('.hidden').should('not.exist')
      });
      
    })
    
  });

  describe("Unmanaged feature flag", () => {

    describe("React element component", () => {
      
      it('displays active feature', () => {
        cy.contains('Unmanaged Visible').should('have.length', 1)
      });
  
      it('hides inactive feature', () => {
        cy.contains('Unmanaged Hidden').should('not.exist');
      });

    })

    describe("React hook", () => {

      it('displays active feature', () => {
        cy.contains('Visible hook with boolean flag').should('have.length', 1)
      });
  
      it('hides inactive feature', () => {
        cy.contains('Hidden hook with boolean flag').should('not.exist');
      });
      
    })
    
  });

  

})
