
using Core.Entities;
using Core.Entities.Order;
using Core.Interfaces;
using Core.Specifications;

namespace Infrastructure.Services
{
    public class OrderService : IOrderService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IBasketRepository _basketRepo;
        public OrderService(IUnitOfWork unitOfWork, IBasketRepository basketRepo)
        {
            _basketRepo = basketRepo;
            _unitOfWork = unitOfWork;
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
                Product product = await _unitOfWork.Repository<Product>().GetAsync(basketItem.Id);
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
            DeliveryMethod deliveryMethod = await _unitOfWork.Repository<DeliveryMethod>().GetAsync(deliveryMethodId);
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
            _unitOfWork.Repository<Order>().Add(order);
            // save changes to db
            int amountOfChanges = await _unitOfWork.Complete();
            if (amountOfChanges <= 0)
            {
                return null;
            }
            bool basketWasRemoved = await _basketRepo.DeleteBasketAsync(basketId);

            return order;
        }

        public async Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync()
        {
            return await _unitOfWork.Repository<DeliveryMethod>().GetAllAsync();
        }

        public async Task<Order> GetOrderByIdAsync(int orderId, string buyerEmail)
        {
            return await _unitOfWork.Repository<Order>()
                .GetAsync(new OrdersWithItemsAndOrderingSpecification(orderId, buyerEmail));
        }

        public async Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail)
        {
            return await _unitOfWork.Repository<Order>()
                .GetAllAsync(new OrdersWithItemsAndOrderingSpecification(buyerEmail));
        }
    }
}