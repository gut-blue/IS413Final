using _413Final.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace _413Final.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EntertainerController : ControllerBase
    {
        private EntertainmentDbContext _entertainmentContext;

        public EntertainerController(EntertainmentDbContext context)
        {
            _entertainmentContext = context;
        }
        
        // LIST OF JUST A FEW THINGS ABOUT THE ENTERTAINER, FOR THE BOOK ENTERTAINER PAGE
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var list = await _entertainmentContext.Entertainers
                .GroupJoin(
                    _entertainmentContext.Engagements,
                    ent => ent.EntertainerID,
                    eng => eng.EntertainerID,
                    (ent, engs) => new EntertainerListItemDto
                    {
                        EntertainerID = ent.EntertainerID,
                        EntStageName = ent.EntStageName,
                        BookingCount = engs.Count(),
                        LastBooked = engs
                            .OrderByDescending(e => e.StartDate)
                            .Select(e => (DateTime?)e.StartDate)
                            .FirstOrDefault()
                    }
                ).ToListAsync();

            return Ok(list);
        }
        
        // ROUTES FOR CRUD FUNCTIONALITY
        // GETS THE FULL TABLE INFO FOR AN ENTERTAINER
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Entertainer>> GetById(int id)
        {
            var ent = await _entertainmentContext.Entertainers.FindAsync(id);
            if (ent == null) return NotFound();
            return Ok(ent);
        }
        
        // ADD AN EXISTING ENTERTAINER
        [HttpPost("AddEntertainer")]
        public async Task<ActionResult<Entertainer>> AddEntertainer([FromBody] Entertainer entertainer)
        {
            _entertainmentContext.Entertainers.Add(entertainer);
            await _entertainmentContext.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetById),
                new { id = entertainer.EntertainerID },
                entertainer
            );
        }
        
        // EDIT AN ENTERTAINER
        [HttpPut("EditEntertainer/{id:int}")]
        public async Task<IActionResult> EditEntertainer(int id, [FromBody] Entertainer entertainer)
        {
            if (id != entertainer.EntertainerID)
                return BadRequest("URL id and payload must match.");

            _entertainmentContext.Entry(entertainer).State = EntityState.Modified;
            try
            {
                await _entertainmentContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (! _entertainmentContext.Entertainers.Any(e => e.EntertainerID == id))
                    return NotFound();
                throw;
            }
            return NoContent();
        }
        
        // DELETE AN ENTERTAINER
        [HttpDelete("DeleteEntertainer/{id:int}")]
        public async Task<IActionResult> DeleteEntertainer(int id)
        {
            var ent = await _entertainmentContext.Entertainers.FindAsync(id);
            if (ent == null) return NotFound();

            _entertainmentContext.Entertainers.Remove(ent);
            await _entertainmentContext.SaveChangesAsync();
            return NoContent();
        }
        
    }
}
