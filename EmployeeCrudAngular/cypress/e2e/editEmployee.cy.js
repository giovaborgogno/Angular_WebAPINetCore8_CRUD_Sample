describe("editEmployeeTest", () => {
    it("Edita correctamente un empleado", () => {
        cy.visit("https://giovaborgogno-crud-frontend-qa.azurewebsites.net"); // URL del front

        // Haz clic en el botón de editar empleado
        cy.get("tr:last-child > :nth-child(4) > a > .fa").click();

        // Asegúrate de que el campo de texto esté visible y habilitado
        cy.get(".form-control").should("be.visible").should("not.be.disabled");

        cy.wait(500);

        cy.get(".form-control").type("{selectall}{backspace}"); // Selecciona todo el texto y lo elimina

        cy.wait(500);

        cy.get(".form-control").should("have.value", ""); // Verifica que el campo esté vacío

        // Escribe el nuevo nombre
        cy.get(".form-control").type("Jose Luis Modified");

        // Envía el formulario
        cy.get(".btn").click();

        // Verifica que el nombre fue actualizado correctamente
        cy.get("tr:last-child > :nth-child(2)").should(
            "have.text",
            " Jose Luis Modified "
        );
    });
});
