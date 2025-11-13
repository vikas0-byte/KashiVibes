using KashiVibes.Core.Entities;
using KashiVibes.Core.Interfaces;
using Microsoft.Data.SqlClient;
using System.Data;

namespace KashiVibes.Infrastructure.Data.Repositories
{
    public class PackageRepository : IPackageRepository
    {
        private readonly SqlHelper _sqlHelper;

        public PackageRepository(SqlHelper sqlHelper)
        {
            _sqlHelper = sqlHelper;
        }

        public async Task<Package?> GetByIdAsync(int id)
        {
            var parameters = new SqlParameter[]
            {
                new SqlParameter("@Id", id)
            };

            var dataTable = await _sqlHelper.ExecuteQueryAsync("sp_GetPackageById", parameters);
            return dataTable.Rows.Count > 0 ? MapDataRowToPackage(dataTable.Rows[0]) : null;
        }

        public async Task<IEnumerable<Package>> GetAllAsync()
        {
            var dataTable = await _sqlHelper.ExecuteQueryAsync("sp_GetAllPackages");
            var packages = new List<Package>();

            foreach (DataRow row in dataTable.Rows)
            {
                packages.Add(MapDataRowToPackage(row));
            }

            return packages;
        }

        public async Task<IEnumerable<Package>> GetActivePackagesAsync()
        {
            var dataTable = await _sqlHelper.ExecuteQueryAsync("sp_GetActivePackages");
            var packages = new List<Package>();

            foreach (DataRow row in dataTable.Rows)
            {
                packages.Add(MapDataRowToPackage(row));
            }

            return packages;
        }

        public async Task<Package?> GetBySlugAsync(string slug)
        {
            var parameters = new SqlParameter[]
            {
                new SqlParameter("@Slug", slug)
            };

            var dataTable = await _sqlHelper.ExecuteQueryAsync("sp_GetPackageBySlug", parameters);
            return dataTable.Rows.Count > 0 ? MapDataRowToPackage(dataTable.Rows[0]) : null;
        }

        public async Task<Package> AddAsync(Package package)
        {
            var imageUrlValue = package.ImageUrl != null ? (object)package.ImageUrl : DBNull.Value;
            var galleryImagesValue = package.GalleryImages != null ? (object)package.GalleryImages : DBNull.Value;

            var parameters = new SqlParameter[]
            {
                new SqlParameter("@Name", package.Name),
                new SqlParameter("@Slug", package.Slug),
                new SqlParameter("@Description", package.Description),
                new SqlParameter("@DetailedDescription", package.DetailedDescription),
                new SqlParameter("@Price", package.Price),
                new SqlParameter("@DurationDays", package.DurationDays),
                new SqlParameter("@DurationNights", package.DurationNights),
                new SqlParameter("@ImageUrl", imageUrlValue),
                new SqlParameter("@GalleryImages", galleryImagesValue),
                new SqlParameter("@IncludedServices", package.IncludedServices),
                new SqlParameter("@ExcludedServices", package.ExcludedServices),
                new SqlParameter("@Highlights", package.Highlights),
                new SqlParameter("@Itinerary", package.Itinerary),
                new SqlParameter("@IsActive", package.IsActive)
            };

            var packageId = await _sqlHelper.ExecuteScalarAsync("sp_CreatePackage", parameters);
            package.Id = Convert.ToInt32(packageId);
            return package;
        }

        public async Task UpdateAsync(Package package)
        {
            var parameters = new SqlParameter[]
            {
                new SqlParameter("@Id", package.Id),
                new SqlParameter("@Name", package.Name),
                new SqlParameter("@Slug", package.Slug),
                new SqlParameter("@Description", package.Description),
                new SqlParameter("@DetailedDescription", package.DetailedDescription),
                new SqlParameter("@Price", package.Price),
                new SqlParameter("@DurationDays", package.DurationDays),
                new SqlParameter("@DurationNights", package.DurationNights),
                new SqlParameter("@ImageUrl", package.ImageUrl != null ? (object)package.ImageUrl : DBNull.Value),
                new SqlParameter("@GalleryImages", package.GalleryImages != null ? (object)package.GalleryImages : DBNull.Value),
                new SqlParameter("@IncludedServices", package.IncludedServices),
                new SqlParameter("@ExcludedServices", package.ExcludedServices),
                new SqlParameter("@Highlights", package.Highlights),
                new SqlParameter("@Itinerary", package.Itinerary),
                new SqlParameter("@IsActive", package.IsActive),
                new SqlParameter("@UpdatedAt", DateTime.UtcNow)
            };

            await _sqlHelper.ExecuteNonQueryAsync("sp_UpdatePackage", parameters);
        }

        public async Task DeleteAsync(Package package)
        {
            var parameters = new SqlParameter[]
            {
                new SqlParameter("@Id", package.Id)
            };

            await _sqlHelper.ExecuteNonQueryAsync("sp_DeletePackage", parameters);
        }

        private static Package MapDataRowToPackage(DataRow row)
        {
            return new Package
            {
                Id = Convert.ToInt32(row["Id"]),
                Name = row["Name"].ToString() ?? string.Empty,
                Slug = row["Slug"].ToString() ?? string.Empty,
                Description = row["Description"].ToString() ?? string.Empty,
                DetailedDescription = row["DetailedDescription"].ToString() ?? string.Empty,
                Price = Convert.ToDecimal(row["Price"]),
                DurationDays = Convert.ToInt32(row["DurationDays"]),
                DurationNights = Convert.ToInt32(row["DurationNights"]),
                ImageUrl = row["ImageUrl"] != DBNull.Value ? row["ImageUrl"].ToString() : null,
                GalleryImages = row["GalleryImages"] != DBNull.Value ? row["GalleryImages"].ToString() : null,
                IncludedServices = row["IncludedServices"].ToString() ?? string.Empty,
                ExcludedServices = row["ExcludedServices"].ToString() ?? string.Empty,
                Highlights = row["Highlights"].ToString() ?? string.Empty,
                Itinerary = row["Itinerary"].ToString() ?? string.Empty,
                IsActive = Convert.ToBoolean(row["IsActive"]),
                CreatedAt = Convert.ToDateTime(row["CreatedAt"]),
                UpdatedAt = row["UpdatedAt"] != DBNull.Value ? Convert.ToDateTime(row["UpdatedAt"]) : null
            };
        }
    }
}