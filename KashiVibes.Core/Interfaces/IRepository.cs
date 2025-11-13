using KashiVibes.Core.Entities;

namespace KashiVibes.Core.Interfaces
{
    public interface IRepository<T> where T : class
    {
        Task<T?> GetByIdAsync(int id);
        Task<IEnumerable<T>> GetAllAsync();
        Task<T> AddAsync(T entity);
        Task UpdateAsync(T entity);
        Task DeleteAsync(T entity);
    }

    public interface IUserRepository : IRepository<User>
    {
        Task<User?> GetByEmailAsync(string email);
        Task<bool> UserExistsAsync(string email);
    }

    public interface IPackageRepository : IRepository<Package>
    {
        Task<IEnumerable<Package>> GetActivePackagesAsync();
        Task<Package?> GetBySlugAsync(string slug);
    }

    public interface IBookingRepository : IRepository<Booking>
    {
        Task<IEnumerable<Booking>> GetByUserIdAsync(int userId);
        Task<Booking?> GetByBookingNumberAsync(string bookingNumber);
        Task<bool> BookingNumberExistsAsync(string bookingNumber);
    }

    public interface IUserReviewRepository : IRepository<UserReview>
    {
        Task<IEnumerable<UserReview>> GetByPackageIdAsync(int packageId);
        Task<IEnumerable<UserReview>> GetByUserIdAsync(int userId);
        Task<double> GetAverageRatingAsync(int packageId);
    }
}