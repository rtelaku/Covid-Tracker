using System;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Patients;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [AllowAnonymous]
    public class PatientsController : BaseApiController
    {

         [HttpGet]
        public async Task<IActionResult> GetPatients()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPatient(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreatePatient(Patient patient)
        {
            return HandleResult(await Mediator.Send(new Create.Command {Patient = patient}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditPatient(Guid id, Patient patient){
            patient.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command {Patient = patient}));
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id){
            return HandleResult(await Mediator.Send(new Delete.Command {Id = id}));
        }
    }
}
