
using API.DTOs;
using AutoMapper;
using Core.Entities.Order;

namespace API.Helpers
{
    public class OrderItemURLResolver : IValueResolver<OrderItem, OrderItemDTO, string>
    {
        private readonly IConfiguration _config;

        public OrderItemURLResolver(IConfiguration config)
        {
            _config = config;
        }
        public string Resolve(OrderItem source, OrderItemDTO destination, string destMember, ResolutionContext context)
        {
            if (!string.IsNullOrEmpty(source.ItemOrdered.PictureUrl))
            {
                return $"{_config["ApiURL"]}{source.ItemOrdered.PictureUrl}";
            }
            return null;
        }
    }
}