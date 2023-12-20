using API.DTOs;
using API.Errors;
using API.Helpers;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProductsController : BaseAPIController
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
        public async Task<ActionResult<Pagination<ProductToReturnDTO>>> GetProducts([FromQuery] ProductSpecParams productParams)
        {
            var spec = new ProductsWithBrandAndTypeSpecification(productParams);

            var countSpec = new ProductWithFiltersForCountSpecification(productParams);

            var products = await _productRepository.GetAllAsync(spec);
            // "empty" spec to count total items with set brandId and typeId from productParams
            var totalItems = await _productRepository.CountAsync(countSpec);

            var mappedResult = _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDTO>>(products);
            return Ok(new Pagination<ProductToReturnDTO>(productParams.PageIndex, totalItems, productParams.PageSize, mappedResult));
        }
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductToReturnDTO>> GetProduct(int id)
        {
            var spec = new ProductsWithBrandAndTypeSpecification(id);
            var product = await _productRepository.GetAsync(spec);
            if (product == null)
            {
                return NotFound(new ApiResponse(404));
            }
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