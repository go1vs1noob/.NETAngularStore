using Core.Entities;

namespace Core.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IGenericRepository<T> Repository<T>() where T : Entity;
        Task<int> Complete();
        public void Dispose()
        {
            throw new NotImplementedException();
        }
    }
}