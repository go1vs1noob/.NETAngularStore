using Core.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly StoreContext _dbcontext;
        public ProductsController(StoreContext dbcontext)
        {
            _dbcontext = dbcontext;
        }
        [HttpGet]
        public async Task<List<Product>> GetProducts()
        {
            return await _dbcontext.Products.ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<Product> GetProduct(int id)
        {
            var result = await _dbcontext.Products.FindAsync(id);
            return result;
        }
    }
}