using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Ogrenci.API.DomainModels;
using Ogrenci.API.Repositories;

namespace Ogrenci.API.Controllers
{
    [ApiController]
    public class GenderController : Controller
    {
        private readonly IStudentRepository studentRepository;
        private readonly IMapper mapper;
        public GenderController(IStudentRepository studentRepository, IMapper mapper)
        {
            this.studentRepository = studentRepository;
            this.mapper = mapper;
        }
        [HttpGet]
        [Route("[controller]")]
        public async Task<IActionResult> GetAllGendersAsync()
        {
            var genderList = await (studentRepository.GetGendersAsync());
            if (genderList==null||!genderList.Any())
            {

            }

            return Ok(mapper.Map<List<Gender>>(genderList));
        }
    }
}
