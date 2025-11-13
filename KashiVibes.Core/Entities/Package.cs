namespace KashiVibes.Core.Entities
{
    public class Package
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string DetailedDescription { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int DurationDays { get; set; }
        public int DurationNights { get; set; }
        public string? ImageUrl { get; set; }
        public string? GalleryImages { get; set; }
        public string IncludedServices { get; set; } = string.Empty;
        public string ExcludedServices { get; set; } = string.Empty;
        public string Highlights { get; set; } = string.Empty;
        public string Itinerary { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
    }
}