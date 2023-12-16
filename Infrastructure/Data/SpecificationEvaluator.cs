using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;
namespace Core.Specifications
{
    public class SpecificationEvaluator<T> where T : Entity
    {
        static public IQueryable<T> GetQuery(IQueryable<T> inputQuery,
            ISpecification<T> specification
        )
        {
            if (specification == null)
            {
                return inputQuery;
            }
            var query = inputQuery;
            if (specification.Criteria != null)
            {
                query = query.Where(specification.Criteria);
            }
            query = specification.Includes.Aggregate(query, (current, include) => current.Include(include));
            return query;
        }
    }
}