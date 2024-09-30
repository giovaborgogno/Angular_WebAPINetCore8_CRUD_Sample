describe("editEmployeeTest", () => {
  it("Muestra el mensaje de error 'El nombre debe tener al menos 2 caracteres.' correctamente", () => {
    cy.visit("https://giovaborgogno-crud-frontend-qa.azurewebsites.net"); // URL del front
    cy.get(".btn").click();
    cy.wait(500);
    cy.get(".form-control").type("a");
    cy.get(".btn").click();
    cy.wait(500);
    cy.get(".ng-trigger").should(
      "include.text",
      "El nombre debe tener al menos dos caracteres."
    );
  });
});
