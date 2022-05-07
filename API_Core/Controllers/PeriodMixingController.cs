using INK_API._Services.Interface;
using INK_API.DTO;
using INK_API.Helpers;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace INK_API.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class PeriodMixingController : ControllerBase
    {
        private readonly IPeriodMixingService _periodMixingService;
        public PeriodMixingController(IPeriodMixingService periodMixingService)
        {
            _periodMixingService = periodMixingService;
        }

        // [HttpGet]
        // public async Task<IActionResult> GetPlans([FromQuery] PaginationParams param)
        // {
        //     var plans = await _buildingService.GetWithPaginations(param);
        //     Response.AddPagination(plans.CurrentPage, plans.PageSize, plans.TotalCount, plans.TotalPages);
        //     return Ok(plans);
        // }

        // [HttpGet(Name = "GetBuildings")]
        // public async Task<IActionResult> GetAll()
        // {
        //     var buildings = await _buildingService.GetAllAsync();
        //     return Ok(buildings);
        // }

        // [HttpGet]
        // public async Task<IActionResult> GetAllAsTreeView()
        // {
        //     var buildings = await _buildingService.GetAllAsTreeView();
        //     return Ok(buildings);
        // }

        // [HttpGet]
        // public async Task<IActionResult> GetLunchTimes()
        // {
        //     var lines = await _lunchTimeService.GetLunchTimes();
        //     return Ok(lines);
        // }

        [HttpGet("{buildingID}")]
        public async Task<IActionResult> GetPeriodMixingByBuilding(int buildingID)
        {
            var lines = await _periodMixingService.GetPeriodMixingByBuilding(buildingID);
            return Ok(lines);
        }

        [HttpPost]
        public async Task<IActionResult> CreatePeriodMixing([FromBody] PeriodMixingDto periodMixingDto)
        {
            return Ok(await _periodMixingService.CreatePeriodMixing(periodMixingDto));
        }

        [HttpPut]
        public async Task<IActionResult> UpdatePeriodMixing(PeriodMixingDto update)
        {
            // if (await _periodMixingService.Update(update))
            //     return Ok(true);
            // return BadRequest($"Updating the period mixing {update.ID} failed on save");
            return Ok(await _periodMixingService.Update(update));
        }
        

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            // if (await _periodMixingService.Delete(id))
            //     return NoContent();
            // throw new Exception("Error deleting the period mixing");
            return Ok(await _periodMixingService.Delete(id));
        }

        [HttpPost]
        public async Task<IActionResult> Check(int id, int buildingId, DateTime PeriodStart, DateTime PeriodEnd)
        {
            return Ok(await _periodMixingService.Check(id, buildingId, PeriodStart, PeriodEnd));
        }

        // [HttpGet("{text}")]
        // public async Task<IActionResult> Search([FromQuery] PaginationParams param, string text)
        // {
        //     var lists = await _buildingService.Search(param, text);
        //     Response.AddPagination(lists.CurrentPage, lists.PageSize, lists.TotalCount, lists.TotalPages);
        //     return Ok(lists);
        // }

        // [HttpPost]
        // public async Task<IActionResult> Create(BuildingDto create)
        // {

        //     if (_buildingService.GetById(create.ID) != null)
        //         return BadRequest("Article ID already exists!");
        //     if (await _buildingService.Add(create))
        //     {
        //         return NoContent();
        //     }

        //     throw new Exception("Creating the building failed on save");
        // }

        // [HttpPost]
        // public async Task<IActionResult> CreateSubBuilding(BuildingDto create)
        // {

        //     return Ok(await _buildingService.CreateSubBuilding(create));
        //     throw new Exception("Creating the building failed on save");
        // }

        // [HttpPost]
        // public async Task<IActionResult> CreateMainBuilding(BuildingDto create)
        // {

        //     return Ok(await _buildingService.CreateMainBuilding(create));

        //     throw new Exception("Creating the building failed on save");
        // }       
    }
}
