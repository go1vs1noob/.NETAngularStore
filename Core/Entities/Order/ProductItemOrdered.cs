namespace Core.Entities.Order
{
    // Snapshot of ordered item (so that it remains unchanged even if the item was changed).
    // That way we won't have relation of order and product.
    // Owned by order entity, part of order table.
    public class ProductItemOrdered
    {
        public ProductItemOrdered()
        {
        }
        public ProductItemOrdered(int productItemId, string productName, string pictureUrl)
        {
            ProductItemId = productItemId;
            ProductName = productName;
            PictureUrl = pictureUrl;
        }
        public int ProductItemId { get; set; }
        public string ProductName { get; set; }
        public string PictureUrl { get; set; }
    }
}