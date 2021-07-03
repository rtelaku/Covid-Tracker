using System;
using System.Threading.Tasks;
using Application.Vaccinations;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class VaccinationController : BaseApiController
    {
           [HttpGet]
        public async Task<IActionResult> GetVaccination()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetVaccination(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateVaccinaion(Vaccination vaccination)
        {
            return HandleResult(await Mediator.Send(new Create.Command {Vaccination = vaccination}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditVaccination(Guid id, Vaccination vaccination){
            vaccination.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command {Vaccination = vaccination}));
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVaccination(Guid id){
            return HandleResult(await Mediator.Send(new Delete.Command {Id = id}));
        }
    }
    }
