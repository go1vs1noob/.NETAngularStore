using Core.Entities.Order;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            // so that ShipToAddress's fields are in the same table as Order
            builder.OwnsOne(o => o.ShipToAddress, a =>
            {
                a.WithOwner();

            });
            // Get enum to a string
            builder.Property(s => s.Status).HasConversion(
                o => o.ToString(),
                o => (OrderStatus) Enum.Parse(typeof(OrderStatus), o)
            );
            // If we delete Order - we also delete OrderItems that are part of this order
            builder.HasMany(o => o.OrderItems).WithOne().OnDelete(DeleteBehavior.Cascade);
        }
    }
}