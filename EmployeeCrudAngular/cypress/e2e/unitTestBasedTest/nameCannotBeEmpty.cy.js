describe("editEmployeeTest", () => {
  it("Muestra el mensaje de error 'El nombre no puede estar vacio' correctamente", () => {
    cy.visit("https://giovaborgogno-crud-frontend-qa.azurewebsites.net"); // URL del front
    cy.get(".btn").click();
    cy.wait(500);
    cy.get(".btn").click();
    cy.wait(500);
    cy.get(".ng-trigger").should(
      "include.text",
      "El nombre no puede estar vacío o compuesto solo de espacios."
    );
    cy.get(".form-control").type("  ");
    cy.get(".btn").click();
    cy.wait(500);
    cy.get(".ng-trigger").should(
      "include.text",
      "El nombre no puede estar vacío o compuesto solo de espacios."
    );
  });
});
