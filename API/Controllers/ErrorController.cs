using API.Errors;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("errors/{code}")]
    // for swagger to work (prevents from appearing in swagger ui)
    [ApiExplorerSettings(IgnoreApi = true)]
    public class ErrorController : BaseAPIController
    {
        public IActionResult Error(int code)
        {
            return new ObjectResult(new ApiResponse(code));
        }
    }
}