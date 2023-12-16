using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specifications
{
    public class ProductsWithBrandAndTypeSpecification : BaseSpecification<Product>
    {
        public ProductsWithBrandAndTypeSpecification()
        {
            AddInclude(u => u.ProductType);
            AddInclude(u => u.ProductBrand);
        }
        public ProductsWithBrandAndTypeSpecification(int id) : base(u => u.Id == id)
        {
            AddInclude(u => u.ProductType);
            AddInclude(u => u.ProductBrand);
        }
    }
}