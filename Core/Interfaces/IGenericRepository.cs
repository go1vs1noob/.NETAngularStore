
using Core.Entities;

namespace Core.Interfaces
{
    public interface IGenericRepository<T> where T : Entity
    {
        Task<T> GetAsync(ISpecification<T> specification = null);
        Task<T> GetAsync(int id);
        Task<IReadOnlyList<T>> GetAllAsync(ISpecification<T> specification = null);
        Task<int> CountAsync(ISpecification<T> specification = null);
    }
}