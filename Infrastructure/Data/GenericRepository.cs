using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class GenericRepository<T> : IGenericRepository<T> where T : Entity
    {
        private readonly StoreContext _storeContext;
        public GenericRepository(StoreContext storeContext)
        {
            _storeContext = storeContext;
        }



        public async Task<IReadOnlyList<T>> GetAllAsync(ISpecification<T> specification = null)
        {

            return await ApplySpecification(specification).ToListAsync();

        }
        public async Task<T> GetAsync(ISpecification<T> specification = null)
        {
            return await ApplySpecification(specification).FirstOrDefaultAsync();
        }

        public async Task<T> GetAsync(int id)
        {
            return await _storeContext.Set<T>().FindAsync(id);
        }
        public async Task<int> CountAsync(ISpecification<T> specification = null)
        {
            return await ApplySpecification(specification).CountAsync();
        }
        private IQueryable<T> ApplySpecification(ISpecification<T> specification)
        {
            return SpecificationEvaluator<T>.GetQuery(_storeContext.Set<T>().AsQueryable(), specification);
        }

        public void Add(T entity)
        {
            _storeContext.Set<T>().Add(entity);
        }

        public void Delete(T entity)
        {
            _storeContext.Set<T>().Remove(entity);
        }

        public void Update(T entity)
        {
            _storeContext.Set<T>().Update(entity);
            // same thing:
            // _storeContext.Set<T>().Attach(entity);
            // _storeContext.Entry(entity).State = EntityState.Modified;
        }
    }
}