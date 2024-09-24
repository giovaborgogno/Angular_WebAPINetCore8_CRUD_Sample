using EmployeeCrudApi.Data;
using EmployeeCrudApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeCrudApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private ApplicationDbContext _context;

        public EmployeeController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<List<Employee>> GetAll()
        {
            return await _context.Employees.ToListAsync();
        }

        [HttpGet]
        public async Task<Employee> GetById(int id)
        {
            return await _context.Employees.FindAsync(id);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Employee employee)
        {
            var validationResult = ValidateEmployeeName(employee.Name);
            if (validationResult != null)
            {
                return validationResult;
            }

            employee.CreatedDate = DateTime.Now;
            await _context.Employees.AddAsync(employee);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = employee.Id }, employee);
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Employee employee)
        {
            var validationResult = ValidateEmployeeName(employee.Name);
            if (validationResult != null)
            {
                return validationResult;
            }

            Employee employeeToUpdate = await _context.Employees.FindAsync(employee.Id);
            if (employeeToUpdate == null)
            {
                return NotFound();
            }

            employeeToUpdate.Name = employee.Name;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete]
        public async Task Delete(int id)
        {
            var employeeToDelete = await _context.Employees.FindAsync(id);
            _context.Remove(employeeToDelete);
            await _context.SaveChangesAsync();
        }

        private IActionResult ValidateEmployeeName(string name)
        {
            if (string.IsNullOrWhiteSpace(name) || name.Split(' ').Any(part => string.IsNullOrWhiteSpace(part)))
            {
                return BadRequest(new { status = 400, error = "Bad Request", message = "El nombre no puede estar vacío o contener solo espacios." });
            }

            if (name.Length < 2)
            {
                return BadRequest(new { status = 400, error = "Bad Request", message = "El nombre debe tener al menos dos caracteres." });
            }

            if (name.Any(char.IsDigit))
            {
                return BadRequest(new { status = 400, error = "Bad Request", message = "El nombre no puede contener números." });
            }

            var nameParts = name.Split(' ');
            if (nameParts.Any(part => part.Length < 2))
            {
                return BadRequest(new { status = 400, error = "Bad Request", message = "Cada parte del nombre debe contener al menos dos caracteres." });
            }

            string[] trivialNames = { "Empleado", "N/A", "Nombre" };
            if (trivialNames.Contains(name.Trim(), StringComparer.OrdinalIgnoreCase))
            {
                return BadRequest(new { status = 400, error = "Bad Request", message = "El nombre no puede ser un nombre trivial." });
            }

            return null;
        }
    }
}
