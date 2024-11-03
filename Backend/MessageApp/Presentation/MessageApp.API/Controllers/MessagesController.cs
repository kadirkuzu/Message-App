using MessageApp.Application.Repositories;
using MessageApp.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace MessageApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly IReadRepository<Group> _readRepository;
        private readonly IWriteRepository<Group> _writeRepository;

        public MessagesController(IReadRepository<Group> readRepository, IWriteRepository<Group> writeRepository)
        {
            _readRepository = readRepository;
            _writeRepository = writeRepository;
        }

        [HttpGet]
        public async Task Get()
        {
            await _writeRepository.AddRangeAsync(new List<Group>()
            {
               new Group () {Description = "test test", Id = Guid.NewGuid(),IsGroup = false,Title = "test"},
            });
            await _writeRepository.SaveAsync();
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            Group group = await _readRepository.GetByIdAsync(id);
            return Ok(group);
        }
    }
}
