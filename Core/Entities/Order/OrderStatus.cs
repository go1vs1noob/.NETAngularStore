using System.Runtime.Serialization;

namespace Core.Entities.Order
{
    public enum OrderStatus
    {
        [EnumMember(Value = "Pending")]
        Pending,
        [EnumMember(Value = "PaymentRecieved")]
        PaymentRecieved,
        [EnumMember(Value = "PaymentFailed")]
        PaymentFailed
    }
}