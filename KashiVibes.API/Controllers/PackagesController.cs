using KashiVibes.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace KashiVibes.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PackagesController : ControllerBase
    {
        private readonly IPackageService _packageService;

        public PackagesController(IPackageService packageService)
        {
            _packageService = packageService;
        }

        [HttpGet]
        public async Task<IActionResult> GetActivePackages()
        {
            var packages = await _packageService.GetActivePackagesAsync();
            return Ok(new { success = true, data = packages });
        }

        [HttpGet("{slug}")]
        public async Task<IActionResult> GetPackageBySlug(string slug)
        {
            var package = await _packageService.GetPackageBySlugAsync(slug);

            if (package == null)
            {
                return NotFound(new { success = false, message = "Package not found" });
            }

            return Ok(new { success = true, data = package });
        }
    }
}