
namespace Core.Entities
{
    public class CustomerBasket
    {
        // so that Redis doesn't cause trouble
        public CustomerBasket()
        {
        }
        public CustomerBasket(string id)
        {
            Id = id;
        }
        public string Id { get; set; }
        public List<BasketItem> Items { get; set; } = new List<BasketItem>();
    }
}