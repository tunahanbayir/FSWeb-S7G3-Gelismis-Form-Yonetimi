describe('Form Doğrulama Testi', () => {
    beforeEach(() => {
     
      cy.visit('http://localhost:3001/');
    });

    it ('Ad Soyad inputuna doğru değer girilmeli' , () => {

        const name = 'Tunahan  Bayır';
        cy.get('input#name').type(name).should('have.value', name);
    });

    it ('E posta inputu doğru değer almalı' , () => {

        const email = 'test@example.com';
        cy.get('input#email').type(email).should('have.value', email);
    
    });

    it ('Şifre inputu doğru değer almalı' , () => {

        const password = '123456';
        cy.get('input#password').type(password).should('have.value', password);
    
    });

    it ('Kullanım şartları kutusu işaretlenmeli', () => {
        cy.get('input#term').check().should('be.checked');

    });

    it ('Form verileri gönderilmeli', () => {

        cy.get('input#name').type('Tunahan Bayır');
        cy.get('input#email').type('test@example.com');
        cy.get('input#password').type('123456');
        cy.get('input#term').check();

        cy.get('button[type="submit"]').click();

        cy.contains('Users: ');
    });

    it ('Form doğrulama testi hata mesajını göstermeli', () => {

        cy.get('input#name').focus().blur();
        cy.contains('İsim alanı boş bırakılamaz').should('be.visible');
    });

});