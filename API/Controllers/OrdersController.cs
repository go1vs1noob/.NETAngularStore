using System.Security.Claims;
using API.DTOs;
using API.Errors;
using AutoMapper;
using Core.Entities.Order;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class OrdersController : BaseAPIController
    {
        private readonly IOrderService _orderService;
        private readonly IMapper _mapper;
        public OrdersController(IOrderService orderService, IMapper mapper)
        {
            _mapper = mapper;
            _orderService = orderService;
        }
        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(OrderDTO orderDTO)
        {
            string email = User.FindFirstValue(ClaimTypes.Email);
            var address = _mapper.Map<AddressDTO, Address>(orderDTO.ShipToAddress);
            var order = await _orderService.CreateOrderAsync(email, orderDTO.DeliveryMethodId, orderDTO.BasketId, address);
            if (order == null)
            {
                return BadRequest(new ApiResponse(400, "Problem creating order"));
            }
            return Ok(order);
        }
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<OrderToReturnDTO>>> GetOrders()
        {
            string email = User.FindFirstValue(ClaimTypes.Email);
            IReadOnlyList<Order> orders = await _orderService.GetOrdersForUserAsync(email);
            if (orders == null)
            {
                return NotFound(new ApiResponse(404));
            }
            return Ok(_mapper.Map<IReadOnlyList<OrderToReturnDTO>>(orders));
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderToReturnDTO>> GetOrderById(int id)
        {
            string email = User.FindFirstValue(ClaimTypes.Email);
            Order order = await _orderService.GetOrderByIdAsync(id, email);
            if (order == null)
            {
                return NotFound(new ApiResponse(404));
            }
            return Ok(_mapper.Map<OrderToReturnDTO>(order));
        }
        [HttpGet("deliveryMethods")]
        public async Task<ActionResult<IReadOnlyList<DeliveryMethod>>> GetDeliveryMethods()
        {
            IReadOnlyList<DeliveryMethod> deliveryMethods = await _orderService.GetDeliveryMethodsAsync();
            if (deliveryMethods == null)
            {
                return NotFound(new ApiResponse(404));
            }
            return Ok(deliveryMethods);
        }
    }
}