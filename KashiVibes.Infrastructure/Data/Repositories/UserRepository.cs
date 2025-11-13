using KashiVibes.Core.Entities;
using KashiVibes.Core.Interfaces;
using Microsoft.Data.SqlClient;
using System.Data;

namespace KashiVibes.Infrastructure.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly SqlHelper _sqlHelper;

        public UserRepository(SqlHelper sqlHelper)
        {
            _sqlHelper = sqlHelper;
        }

        public async Task<User?> GetByIdAsync(int id)
        {
            var parameters = new SqlParameter[]
            {
                new SqlParameter("@Id", id)
            };

            var dataTable = await _sqlHelper.ExecuteQueryAsync("sp_GetUserById", parameters);
            return dataTable.Rows.Count > 0 ? MapDataRowToUser(dataTable.Rows[0]) : null;
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            var parameters = new SqlParameter[]
            {
                new SqlParameter("@Email", email)
            };

            var dataTable = await _sqlHelper.ExecuteQueryAsync("sp_GetUserByEmail", parameters);
            return dataTable.Rows.Count > 0 ? MapDataRowToUser(dataTable.Rows[0]) : null;
        }

        public async Task<bool> UserExistsAsync(string email)
        {
            var parameters = new SqlParameter[]
            {
                new SqlParameter("@Email", email)
            };

            var result = await _sqlHelper.ExecuteScalarAsync("sp_UserExists", parameters);
            return Convert.ToInt32(result) > 0;
        }

        public async Task<User> AddAsync(User user)
        {
            var avatarValue = user.Avatar != null ? (object)user.Avatar : DBNull.Value;

            var parameters = new SqlParameter[]
            {
                new SqlParameter("@Name", user.Name),
                new SqlParameter("@Email", user.Email),
                new SqlParameter("@Mobile", user.Mobile),
                new SqlParameter("@PasswordHash", user.PasswordHash),
                new SqlParameter("@Avatar", avatarValue),
                new SqlParameter("@Role", user.Role),
                new SqlParameter("@IsActive", user.IsActive)
            };

            var userId = await _sqlHelper.ExecuteScalarAsync("sp_CreateUser", parameters);
            user.Id = Convert.ToInt32(userId);
            return user;
        }

        public async Task UpdateAsync(User user)
        {
            var parameters = new SqlParameter[]
            {
                new SqlParameter("@Id", user.Id),
                new SqlParameter("@Name", user.Name),
                new SqlParameter("@Email", user.Email),
                new SqlParameter("@Mobile", user.Mobile),
                new SqlParameter("@Avatar", user.Avatar != null ? (object)user.Avatar : DBNull.Value),
                new SqlParameter("@Role", user.Role),
                new SqlParameter("@IsActive", user.IsActive),
                new SqlParameter("@UpdatedAt", DateTime.UtcNow)
            };

            await _sqlHelper.ExecuteNonQueryAsync("sp_UpdateUser", parameters);
        }

        public async Task DeleteAsync(User user)
        {
            var parameters = new SqlParameter[]
            {
                new SqlParameter("@Id", user.Id)
            };

            await _sqlHelper.ExecuteNonQueryAsync("sp_DeleteUser", parameters);
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            var dataTable = await _sqlHelper.ExecuteQueryAsync("sp_GetAllUsers");
            var users = new List<User>();

            foreach (DataRow row in dataTable.Rows)
            {
                users.Add(MapDataRowToUser(row));
            }

            return users;
        }

        private static User MapDataRowToUser(DataRow row)
        {
            return new User
            {
                Id = Convert.ToInt32(row["Id"]),
                Name = row["Name"].ToString() ?? string.Empty,
                Email = row["Email"].ToString() ?? string.Empty,
                Mobile = row["Mobile"].ToString() ?? string.Empty,
                PasswordHash = row["PasswordHash"].ToString() ?? string.Empty,
                Avatar = row["Avatar"] != DBNull.Value ? row["Avatar"].ToString() : null,
                Role = row["Role"].ToString() ?? "User",
                IsActive = Convert.ToBoolean(row["IsActive"]),
                CreatedAt = Convert.ToDateTime(row["CreatedAt"]),
                UpdatedAt = row["UpdatedAt"] != DBNull.Value ? Convert.ToDateTime(row["UpdatedAt"]) : null
            };
        }
    }
}