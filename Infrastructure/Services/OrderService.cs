
using Core.Entities;
using Core.Entities.Order;
using Core.Interfaces;

namespace Infrastructure.Services
{
    public class OrderService : IOrderService
    {
        private readonly IGenericRepository<Order> _orderRepo;
        private readonly IGenericRepository<DeliveryMethod> _deliveryRepo;
        private readonly IGenericRepository<Product> _productRepo;
        private readonly IBasketRepository _basketRepo;
        public OrderService(IGenericRepository<Order> orderRepo, IGenericRepository<DeliveryMethod> deliveryRepo,
        IGenericRepository<Product> productRepo, IBasketRepository basketRepo)
        {
            _deliveryRepo = deliveryRepo;
            _productRepo = productRepo;
            _basketRepo = basketRepo;
            _orderRepo = orderRepo;
        }

        public async Task<Order> CreateOrderAsync(string buyerEmail, int deliveryMethodId, string basketId, Address shippingAddress)
        {
            // get basket from repo
            CustomerBasket basket = await _basketRepo.GetBasketAsync(basketId);
            // get items from the product repo
            if (basket == null)
            {
                return null;
            }
            List<OrderItem> orderItems = new();
            foreach (var basketItem in basket.Items)
            {
                Product product = await _productRepo.GetAsync(basketItem.Id);
                OrderItem orderItem = new OrderItem
                {
                    ItemOrdered = new ProductItemOrdered
                    {
                        ProductItemId = basketItem.Id,
                        ProductName = product.Name,
                        PictureUrl = basketItem.PictureUrl
                    },
                    Price = product.Price,
                    Quantity = basketItem.Quantity
                };
                orderItems.Add(orderItem);
            }
            // get delivery method from repo
            DeliveryMethod deliveryMethod = await _deliveryRepo.GetAsync(deliveryMethodId);
            // calculate subtotal
            decimal subtotal = orderItems.Aggregate(0.0m, (total, next) => total + next.Price * next.Quantity);
            // create order
            Order order = new Order
            {
                BuyerEmail = buyerEmail,
                ShipToAddress = shippingAddress,
                DeliveryMethod = deliveryMethod,
                Subtotal = subtotal,
                OrderItems = orderItems
            };
            
            // TODO: SAVE TO DB

            return order;
        }




        public Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Order> GetOrderByIdAsync(int orderId, string buyerEmail)
        {
            throw new NotImplementedException();
        }

        public Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail)
        {
            throw new NotImplementedException();
        }
    }
}