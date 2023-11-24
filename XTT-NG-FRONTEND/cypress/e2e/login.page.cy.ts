/// <reference types="cypress"/>


describe("Testing login page",()=>{
    it('user get logged in successfully',()=>{
        cy.visit('/login')
        cy.get('[data-cy="login-form"]')
        cy.get('[data-cy="email"]').type('emmanuelmanu@gmail.com')
        cy.get('[data-cy="password"]').type('12345678@Em')
        cy.get('[data-cy="submit-btn"]').click()
    })
    

    // it('user gets success message',()=>{
    //     cy.visit('/login')
    //     cy.get('[data-cy="login-form"]')
    //     cy.get('[data-cy="email"]').type('isaackilimok2@gmail.com')
    //     cy.get('[data-cy="password"]').type('12345678@Ik')
    //     cy.get('[data-cy="submit-btn"]').click()
    //     cy.get('[data-cy="general-message"]').should('exist', 'logged in successfully');

    // })
    
    // it("Error message for empty email inputs", () => {
    //     cy.visit('/login');
    //     cy.get('[data-cy="email"]').click();
    //     cy.get('[data-cy="password"]').type('12345678@Ik');
    //     cy.get('[data-cy="submit-btn"]').click();
    //     cy.get('[data-cy="error-message"]').should('exist','Email is required')
    // });
    

    // it("Error message for empty password inputs",()=>{
    //     cy.visit('/login')
    //     cy.get('[data-cy="login-form"]')
    //     cy.get('[data-cy="email"]').type('isaackilimok2@gmail.com')
    //     cy.get('[data-cy="password"]').click()
    //     cy.get('[data-cy="email"]').click()
    //     cy.get('[data-cy="error-message"]').should('exist','Password is required')
    // })

    // it("error message for incorrect email",()=>{
    //     cy.visit('/login')
    //     cy.get('[data-cy="login-form"]')
    //     cy.get('[data-cy="email"]').type('isaackilimok12@gmail.com')
    //     cy.get('[data-cy="password"]').type('12345678@Ik')
    //     cy.get('[data-cy="submit-btn"]').click();
    //     cy.get('[data-cy="error-message-email"]').should('exist');
    //     cy.get('[data-cy="error-message-email"]').should('contain', 'Not a valid email');
    // })

    // it("error message for incorrect password",()=>{
    //     cy.visit('/login')
    //     cy.get('[data-cy="login-form"]')
    //     cy.get('[data-cy="email"]').type('isaackilimok12@gmail.com')
    //     cy.get('[data-cy="password"]').type('12345678@Ik2')
    //     cy.get('[data-cy="submit-btn"]').click()
    // })

   
})