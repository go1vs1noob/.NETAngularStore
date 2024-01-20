namespace Core.Entities.Order
{
    public class OrderItem : Entity
    {
        public OrderItem()
        {
        }
        public OrderItem(ProductItemOrdered itemOrdered, int quantity, decimal price)
        {
            this.ItemOrdered = itemOrdered;
            this.Quantity = quantity;
            this.Price = price;
        }
        public ProductItemOrdered ItemOrdered { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }
}