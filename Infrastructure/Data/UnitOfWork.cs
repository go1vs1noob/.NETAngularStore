using System.Collections;
using Core.Entities;
using Core.Interfaces;

namespace Infrastructure.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly StoreContext _storeContext;
        private Hashtable _repositories;
        public UnitOfWork(StoreContext storeContext)
        {
            _storeContext = storeContext;
        }

        public async Task<int> Complete()
        {
            return await _storeContext.SaveChangesAsync();
        }
        public void Dispose()
        {
            _storeContext.Dispose();
        }
        public IGenericRepository<T> Repository<T>() where T : Entity
        {
            if (_repositories == null)
            {
                _repositories = new Hashtable();
            }
            string repositoryName = typeof(T).Name;
            if (!_repositories.ContainsKey(repositoryName))
            {
                var repositoryType = typeof(GenericRepository<>).MakeGenericType(typeof(T));
                var repositoryInstance = Activator.CreateInstance(repositoryType, _storeContext);
                _repositories.Add(repositoryName, repositoryInstance);
            }
            return (IGenericRepository<T>)_repositories[repositoryName];
        }
    }
}