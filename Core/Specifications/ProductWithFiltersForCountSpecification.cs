using Core.Entities;

namespace Core.Specifications
{
    /// <summary>
    ///  Get count of items to get info in pagination class
    /// </summary>
    public class ProductWithFiltersForCountSpecification : BaseSpecification<Product>
    {
        public ProductWithFiltersForCountSpecification(ProductSpecParams productParams) :
        base(x => (string.IsNullOrEmpty(productParams.Search) || x.Name.ToLower().Contains(productParams.Search))
                    && (!productParams.BrandId.HasValue || x.ProductBrandId == productParams.BrandId)
                    && (!productParams.TypeId.HasValue || x.ProductTypeId == productParams.TypeId))
        {

        }
    }
}