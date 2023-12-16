using System.Linq.Expressions;

namespace Core.Interfaces
{
    public interface ISpecification<T>
    {
        // "Where(Criteria)"
        Expression<Func<T, bool>> Criteria { get; }
        // "Include(...)"
        List<Expression<Func<T, object>>> Includes { get; }
    }
}