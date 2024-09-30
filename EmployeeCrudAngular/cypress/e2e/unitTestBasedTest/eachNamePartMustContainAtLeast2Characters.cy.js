describe("editEmployeeTest", () => {
  it("Muestra el mensaje de error 'Cada parte del nombre debe tener al menos dos caracteres.' correctamente", () => {
    cy.visit("https://giovaborgogno-crud-frontend-qa.azurewebsites.net"); // URL del front
    cy.get(".btn").click();
    cy.wait(500);
    cy.get(".form-control").type("a b");
    cy.get(".btn").click();
    cy.wait(500);
    cy.get(".ng-trigger").should(
      "include.text",
      "Cada parte del nombre debe contener al menos dos caracteres."
    );
  });
});
