using System.Linq.Expressions;

namespace Core.Interfaces
{
    public interface ISpecification<T>
    {
        // "Where(Criteria)"
        Expression<Func<T, bool>> Criteria { get; }
        Expression<Func<T, object>> OrderBy { get; }
        Expression<Func<T, object>> OrderByDescending { get; }

        // "Include(...)"
        List<Expression<Func<T, object>>> Includes { get; }

        //pagination
        int Take { get; }
        int Skip { get; }
        bool isPagingEnabled { get; }
    }
}