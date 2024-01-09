using Core.Entities;
using static Core.Helpers.StringQueryCollection;
namespace Core.Specifications
{
    public class ProductsWithBrandAndTypeSpecification : BaseSpecification<Product>
    {
        public ProductsWithBrandAndTypeSpecification(ProductSpecParams productParams)
        : base(x => (string.IsNullOrEmpty(productParams.Search) || x.Name.ToLower().Contains(productParams.Search))
                    && (!productParams.BrandId.HasValue || x.ProductBrandId == productParams.BrandId)
                    && (!productParams.TypeId.HasValue || x.ProductTypeId == productParams.TypeId))
        {
            AddInclude(u => u.ProductType);
            AddInclude(u => u.ProductBrand);
            ApplyPaging(productParams.PageSize * (productParams.PageIndex - 1), productParams.PageSize);
            if (productParams.Sort == null)
            {
                return;
            }
            switch (productParams.Sort)
            {
                case OrderByPriceAscending:
                    AddOrderBy(p => p.Price);
                    break;
                case OrderByPriceDescending:
                    AddOrderByDescending(p => p.Price);
                    break;
                default:
                    AddOrderBy(p => p.Name);
                    break;
            }

        }
        public ProductsWithBrandAndTypeSpecification(int id) : base(u => u.Id == id)
        {
            AddInclude(u => u.ProductType);
            AddInclude(u => u.ProductBrand);
        }
    }
}