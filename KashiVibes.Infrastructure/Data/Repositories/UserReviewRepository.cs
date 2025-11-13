using KashiVibes.Core.Entities;
using KashiVibes.Core.Interfaces;
using System.Data;
using Microsoft.Data.SqlClient;

namespace KashiVibes.Infrastructure.Data.Repositories
{
    public class UserReviewRepository : IUserReviewRepository
    {
        private readonly SqlHelper _sqlHelper;

        public UserReviewRepository(SqlHelper sqlHelper)
        {
            _sqlHelper = sqlHelper;
        }

        public async Task<UserReview?> GetByIdAsync(int id)
        {
            var parameters = new SqlParameter[]
            {
                new SqlParameter("@Id", id)
            };

            var dataTable = await _sqlHelper.ExecuteQueryAsync("sp_GetUserReviewById", parameters);
            return dataTable.Rows.Count > 0 ? MapDataRowToUserReview(dataTable.Rows[0]) : null;
        }

        public async Task<IEnumerable<UserReview>> GetAllAsync()
        {
            var dataTable = await _sqlHelper.ExecuteQueryAsync("sp_GetAllUserReviews");
            var reviews = new List<UserReview>();

            foreach (DataRow row in dataTable.Rows)
            {
                reviews.Add(MapDataRowToUserReview(row));
            }

            return reviews;
        }

        public async Task<IEnumerable<UserReview>> GetByPackageIdAsync(int packageId)
        {
            var parameters = new SqlParameter[]
            {
                new SqlParameter("@PackageId", packageId)
            };

            var dataTable = await _sqlHelper.ExecuteQueryAsync("sp_GetUserReviewsByPackageId", parameters);
            var reviews = new List<UserReview>();

            foreach (DataRow row in dataTable.Rows)
            {
                reviews.Add(MapDataRowToUserReview(row));
            }

            return reviews;
        }

        public async Task<IEnumerable<UserReview>> GetByUserIdAsync(int userId)
        {
            var parameters = new SqlParameter[]
            {
                new SqlParameter("@UserId", userId)
            };

            var dataTable = await _sqlHelper.ExecuteQueryAsync("sp_GetUserReviewsByUserId", parameters);
            var reviews = new List<UserReview>();

            foreach (DataRow row in dataTable.Rows)
            {
                reviews.Add(MapDataRowToUserReview(row));
            }

            return reviews;
        }

        public async Task<double> GetAverageRatingAsync(int packageId)
        {
            var parameters = new SqlParameter[]
            {
                new SqlParameter("@PackageId", packageId)
            };

            var result = await _sqlHelper.ExecuteScalarAsync("sp_GetAverageRating", parameters);
            return result != DBNull.Value ? Convert.ToDouble(result) : 0.0;
        }

        public async Task<UserReview> AddAsync(UserReview userReview)
        {
            var parameters = new SqlParameter[]
            {
                new SqlParameter("@UserId", userReview.UserId),
                new SqlParameter("@PackageId", userReview.PackageId),
                new SqlParameter("@Rating", userReview.Rating),
                new SqlParameter("@Comment", userReview.Comment),
                new SqlParameter("@IsApproved", userReview.IsApproved)
            };

            var reviewId = await _sqlHelper.ExecuteScalarAsync("sp_CreateUserReview", parameters);
            userReview.Id = Convert.ToInt32(reviewId);
            return userReview;
        }

        public async Task UpdateAsync(UserReview userReview)
        {
            var parameters = new SqlParameter[]
            {
                new SqlParameter("@Id", userReview.Id),
                new SqlParameter("@UserId", userReview.UserId),
                new SqlParameter("@PackageId", userReview.PackageId),
                new SqlParameter("@Rating", userReview.Rating),
                new SqlParameter("@Comment", userReview.Comment),
                new SqlParameter("@IsApproved", userReview.IsApproved)
            };

            await _sqlHelper.ExecuteNonQueryAsync("sp_UpdateUserReview", parameters);
        }

        public async Task DeleteAsync(UserReview userReview)
        {
            var parameters = new SqlParameter[]
            {
                new SqlParameter("@Id", userReview.Id)
            };

            await _sqlHelper.ExecuteNonQueryAsync("sp_DeleteUserReview", parameters);
        }

        private static UserReview MapDataRowToUserReview(DataRow row)
        {
            return new UserReview
            {
                Id = Convert.ToInt32(row["Id"]),
                UserId = Convert.ToInt32(row["UserId"]),
                PackageId = Convert.ToInt32(row["PackageId"]),
                Rating = Convert.ToInt32(row["Rating"]),
                Comment = row["Comment"]?.ToString() ?? string.Empty,
                CreatedAt = Convert.ToDateTime(row["CreatedAt"]),
                IsApproved = Convert.ToBoolean(row["IsApproved"])
            };
        }
    }
}