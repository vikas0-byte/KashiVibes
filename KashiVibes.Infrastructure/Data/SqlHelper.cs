using System.Data;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace KashiVibes.Infrastructure.Data
{
    public class SqlHelper
    {
        private readonly string _connectionString;

        public SqlHelper(IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("DefaultConnection");
            _connectionString = connectionString ?? throw new ArgumentNullException("DefaultConnection string is missing in appsettings.json");
        }

        public async Task<SqlConnection> CreateConnectionAsync()
        {
            var connection = new SqlConnection(_connectionString);
            await connection.OpenAsync();
            return connection;
        }

        public async Task<DataTable> ExecuteQueryAsync(string procedureName, SqlParameter[]? parameters = null)
        {
            using var connection = await CreateConnectionAsync();
            using var command = new SqlCommand(procedureName, connection)
            {
                CommandType = CommandType.StoredProcedure
            };

            if (parameters != null && parameters.Length > 0)
                command.Parameters.AddRange(parameters);

            var dataTable = new DataTable();
            using var reader = await command.ExecuteReaderAsync();
            dataTable.Load(reader);
            return dataTable;
        }

        public async Task<int> ExecuteNonQueryAsync(string procedureName, SqlParameter[]? parameters = null)
        {
            using var connection = await CreateConnectionAsync();
            using var command = new SqlCommand(procedureName, connection)
            {
                CommandType = CommandType.StoredProcedure
            };

            if (parameters != null && parameters.Length > 0)
                command.Parameters.AddRange(parameters);

            return await command.ExecuteNonQueryAsync();
        }

        public async Task<object> ExecuteScalarAsync(string procedureName, SqlParameter[]? parameters = null)
        {
            using var connection = await CreateConnectionAsync();
            using var command = new SqlCommand(procedureName, connection)
            {
                CommandType = CommandType.StoredProcedure
            };

            if (parameters != null && parameters.Length > 0)
                command.Parameters.AddRange(parameters);

            var result = await command.ExecuteScalarAsync();
            return result is DBNull || result == null ? 0 : result;
        }
    }
}