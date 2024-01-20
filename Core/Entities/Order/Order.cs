namespace Core.Entities.Order
{
    public class Order : Entity
    {
        public Order()
        {
        }
        public Order(IReadOnlyList<OrderItem> orderItems, Address shipToAddress, DeliveryMethod deliveryMethod, decimal subtotal, string buyerEmail)
        {
            this.BuyerEmail = buyerEmail;
            this.ShipToAddress = shipToAddress;
            this.Subtotal = subtotal;
            this.DeliveryMethod = deliveryMethod;
            this.OrderItems = orderItems;
        }
        public string BuyerEmail { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;
        public Address ShipToAddress { get; set; }
        public DeliveryMethod DeliveryMethod { get; set; }
        public IReadOnlyList<OrderItem> OrderItems { get; set; }
        public decimal Subtotal { get; set; }
        public OrderStatus Status { get; set; } = OrderStatus.Pending;
        // for stripe
        public string PaymentIntentId { get; set; }

        // If automapper sees "Get" in name it will execute this method and map it to property "Total"
        public decimal GetTotal()
        {
            return Subtotal + DeliveryMethod.Price;
        }


    }
}