describe("Mi primera prueba", () => {
    it("Carga correctamente la página de ejemplo", () => {
        cy.visit("https://giovaborgogno-crud-frontend-qa.azurewebsites.net"); // Colocar la url local o de Azure de nuestro front
        cy.get("h1").should("contain", "EmployeeCrudAngular"); // Verifica que el título contenga "EmployeeCrudAngular"
        cy.get(".btn").click();
        cy.get(".form-control").type("Jose Luis");
        cy.get(".btn").click();
        cy.get("tr:last-child > :nth-child(2)").should("include.text", "Jose Luis");
    });
});
