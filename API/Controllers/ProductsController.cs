using API.DTOs;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IGenericRepository<Product> _productRepository;
        private readonly IGenericRepository<ProductType> _productTypeRepository;
        private readonly IGenericRepository<ProductBrand> _prodictBrandRepository;
        private readonly IMapper _mapper;

        public ProductsController(IGenericRepository<Product> productRepository,
        IGenericRepository<ProductType> productTypeRepository,
        IGenericRepository<ProductBrand> productBrandRepository,
        IMapper mapper)
        {
            _productRepository = productRepository;
            _productTypeRepository = productTypeRepository;
            _prodictBrandRepository = productBrandRepository;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Product>>> GetProducts()
        {
            var spec = new ProductsWithBrandAndTypeSpecification();
            var products = await _productRepository.GetAllAsync(spec);
            var mappedResult = _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDTO>>(products);
            return Ok(mappedResult);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var spec = new ProductsWithBrandAndTypeSpecification(id);
            var product = await _productRepository.GetAsync(spec);
            var mappedResult = _mapper.Map<Product, ProductToReturnDTO>(product);
            return Ok(mappedResult);
        }
        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductTypes()
        {
            var result = await _productTypeRepository.GetAllAsync();
            return Ok(result);
        }
        [HttpGet("types/{id}")]
        public async Task<ActionResult<ProductType>> GetProductTypeById(int id)
        {
            var result = await _productTypeRepository.GetAsync(id);
            return Ok(result);
        }
        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands()
        {
            var result = await _prodictBrandRepository.GetAllAsync();
            return Ok(result);
        }
        [HttpGet("brands/{id}")]
        public async Task<ActionResult<ProductBrand>> GetProductBrandById(int id)
        {
            var result = await _prodictBrandRepository.GetAsync(id);
            return Ok(result);
        }
    }
}