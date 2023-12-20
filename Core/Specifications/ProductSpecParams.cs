namespace Core.Specifications
{
    public class ProductSpecParams
    {
        private const int MaxPageSize = 50;
        public int PageIndex { get; set; } = 1;
        private int _pageSize = 6;
        private string _search;

        public int? BrandId { get; set; }
        public int? TypeId { get; set; }
        public string Sort { get; set; }
        public int PageSize
        {
            get
            {
                return _pageSize;
            }
            set
            {
                if (value == 0 || value > MaxPageSize)
                {
                    _pageSize = 6;
                    return;
                }
                _pageSize = value;
            }
        }
        public string Search
        {
            get
            {
                return _search;
            }
            set
            {
                _search = value.ToLower();
            }
        }

    }
}