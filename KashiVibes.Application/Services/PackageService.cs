using KashiVibes.Application.DTOs;
using KashiVibes.Core.Interfaces;
using System.Text.Json;

namespace KashiVibes.Application.Services
{
    public interface IPackageService
    {
        Task<IEnumerable<PackageDto>> GetActivePackagesAsync();
        Task<PackageDto?> GetPackageBySlugAsync(string slug);
    }

    public class PackageService : IPackageService
    {
        private readonly IPackageRepository _packageRepository;
        private readonly IUserReviewRepository _reviewRepository;

        public PackageService(IPackageRepository packageRepository, IUserReviewRepository reviewRepository)
        {
            _packageRepository = packageRepository;
            _reviewRepository = reviewRepository;
        }

        public async Task<IEnumerable<PackageDto>> GetActivePackagesAsync()
        {
            var packages = await _packageRepository.GetActivePackagesAsync();
            var packageDtos = new List<PackageDto>();

            foreach (var package in packages)
            {
                var averageRating = await _reviewRepository.GetAverageRatingAsync(package.Id);
                var reviews = await _reviewRepository.GetByPackageIdAsync(package.Id);

                packageDtos.Add(MapToPackageDto(package, averageRating, reviews.Count()));
            }

            return packageDtos;
        }

        public async Task<PackageDto?> GetPackageBySlugAsync(string slug)
        {
            var package = await _packageRepository.GetBySlugAsync(slug);
            if (package == null) return null;

            var averageRating = await _reviewRepository.GetAverageRatingAsync(package.Id);
            var reviews = await _reviewRepository.GetByPackageIdAsync(package.Id);

            return MapToPackageDto(package, averageRating, reviews.Count());
        }

        private static PackageDto MapToPackageDto(Core.Entities.Package package, double averageRating, int totalReviews)
        {
            return new PackageDto
            {
                Id = package.Id,
                Name = package.Name,
                Slug = package.Slug,
                Description = package.Description,
                DetailedDescription = package.DetailedDescription,
                Price = package.Price,
                DurationDays = package.DurationDays,
                DurationNights = package.DurationNights,
                ImageUrl = package.ImageUrl,
                GalleryImages = DeserializeJsonList(package.GalleryImages),
                IncludedServices = DeserializeJsonList(package.IncludedServices),
                ExcludedServices = DeserializeJsonList(package.ExcludedServices),
                Highlights = DeserializeJsonList(package.Highlights),
                Itinerary = DeserializeItinerary(package.Itinerary),
                AverageRating = averageRating,
                TotalReviews = totalReviews
            };
        }

        private static List<string> DeserializeJsonList(string? json)
        {
            if (string.IsNullOrEmpty(json)) return new List<string>();

            try
            {
                return JsonSerializer.Deserialize<List<string>>(json) ?? new List<string>();
            }
            catch
            {
                return new List<string>();
            }
        }

        private static List<ItineraryDayDto> DeserializeItinerary(string? json)
        {
            if (string.IsNullOrEmpty(json)) return new List<ItineraryDayDto>();

            try
            {
                return JsonSerializer.Deserialize<List<ItineraryDayDto>>(json) ?? new List<ItineraryDayDto>();
            }
            catch
            {
                return new List<ItineraryDayDto>();
            }
        }
    }
}