
using System.Text.Json;
using Core.Entities;
using Core.Entities.Order;

namespace Infrastructure.Data
{
    public class StoreContextSeed
    {
        public static async Task SeedAsync(StoreContext storeContext)
        {
            var PathToStaticFiles = Path.Combine(Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().Location), "wwwroot", "SeedData");
            if (!storeContext.ProductBrands.Any())
            {
                var brandsData = File.ReadAllText(Path.Combine(PathToStaticFiles, "brands.json"));
                var brands = JsonSerializer.Deserialize<List<ProductBrand>>(brandsData);
                storeContext.ProductBrands.AddRange(brands);
            }
            if (!storeContext.ProductTypes.Any())
            {
                var typesData = File.ReadAllText(Path.Combine(PathToStaticFiles, "types.json"));
                var types = JsonSerializer.Deserialize<List<ProductType>>(typesData);
                storeContext.ProductTypes.AddRange(types);
            }
            if (!storeContext.Products.Any())
            {
                var productsData = File.ReadAllText(Path.Combine(PathToStaticFiles, "products.json"));
                var products = JsonSerializer.Deserialize<List<Product>>(productsData);
                storeContext.Products.AddRange(products);
            }
            if (!storeContext.DeliveryMethods.Any())
            {
                var deliveryData = File.ReadAllText(Path.Combine(PathToStaticFiles, "delivery.json"));
                var deliveryMethods = JsonSerializer.Deserialize<List<DeliveryMethod>>(deliveryData);
                storeContext.DeliveryMethods.AddRange(deliveryMethods);
            }
            if (storeContext.ChangeTracker.HasChanges())
            {
                await storeContext.SaveChangesAsync();
            }
        }
    }
}