using MessageApp.Application.Repositories;
using MessageApp.Application.Services;
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
        private readonly IFileService _fileService;

        public MessagesController(IReadRepository<Group> readRepository, IWriteRepository<Group> writeRepository, IFileService fileService)
        {
            _readRepository = readRepository;
            _writeRepository = writeRepository;
            _fileService = fileService;
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

        [HttpPost("[action]")]
        public async Task<IActionResult> Upload()
        {
            await _fileService.UploadAsync("resource/product-images",Request.Form.Files);
            return Ok();
        }
    }
}
