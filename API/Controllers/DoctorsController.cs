using System;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Doctors;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [AllowAnonymous]
    public class DoctorsController : BaseApiController
    {

         [HttpGet]
        public async Task<IActionResult> GetDoctors()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDoctor(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateDoctor(Doctor doctor)
        {
            return HandleResult(await Mediator.Send(new Create.Command {Doctor = doctor}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditDoctor(Guid id, Doctor doctor){
            doctor.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command {Doctor = doctor}));
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePatient(Guid id){
            return HandleResult(await Mediator.Send(new Delete.Command {Id = id}));
        }
    }
}
