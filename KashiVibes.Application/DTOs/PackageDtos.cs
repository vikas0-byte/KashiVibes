namespace KashiVibes.Application.DTOs
{
    public class PackageDto
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
        public List<string> GalleryImages { get; set; } = new();
        public List<string> IncludedServices { get; set; } = new();
        public List<string> ExcludedServices { get; set; } = new();
        public List<string> Highlights { get; set; } = new();
        public List<ItineraryDayDto> Itinerary { get; set; } = new();
        public double AverageRating { get; set; }
        public int TotalReviews { get; set; }
    }

    public class ItineraryDayDto
    {
        public int Day { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public List<string> Activities { get; set; } = new();
    }
}