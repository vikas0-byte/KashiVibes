using KashiVibes.Core.Entities;
using KashiVibes.Core.Interfaces;
using Microsoft.Data.SqlClient;
using System.Data;

namespace KashiVibes.Infrastructure.Data.Repositories
{
    public class BookingRepository : IBookingRepository
    {
        private readonly SqlHelper _sqlHelper;

        public BookingRepository(SqlHelper sqlHelper)
        {
            _sqlHelper = sqlHelper;
        }

        public async Task<Booking?> GetByIdAsync(int id)
        {
            var parameters = new SqlParameter[]
            {
                new SqlParameter("@Id", id)
            };

            var dataTable = await _sqlHelper.ExecuteQueryAsync("sp_GetBookingById", parameters);
            return dataTable.Rows.Count > 0 ? MapDataRowToBooking(dataTable.Rows[0]) : null;
        }

        public async Task<IEnumerable<Booking>> GetAllAsync()
        {
            var dataTable = await _sqlHelper.ExecuteQueryAsync("sp_GetAllBookings");
            var bookings = new List<Booking>();

            foreach (DataRow row in dataTable.Rows)
            {
                bookings.Add(MapDataRowToBooking(row));
            }

            return bookings;
        }

        public async Task<IEnumerable<Booking>> GetByUserIdAsync(int userId)
        {
            var parameters = new SqlParameter[]
            {
                new SqlParameter("@UserId", userId)
            };

            var dataTable = await _sqlHelper.ExecuteQueryAsync("sp_GetBookingsByUserId", parameters);
            var bookings = new List<Booking>();

            foreach (DataRow row in dataTable.Rows)
            {
                bookings.Add(MapDataRowToBooking(row));
            }

            return bookings;
        }

        public async Task<Booking?> GetByBookingNumberAsync(string bookingNumber)
        {
            var parameters = new SqlParameter[]
            {
                new SqlParameter("@BookingNumber", bookingNumber)
            };

            var dataTable = await _sqlHelper.ExecuteQueryAsync("sp_GetBookingByBookingNumber", parameters);
            return dataTable.Rows.Count > 0 ? MapDataRowToBooking(dataTable.Rows[0]) : null;
        }

        public async Task<bool> BookingNumberExistsAsync(string bookingNumber)
        {
            var parameters = new SqlParameter[]
            {
                new SqlParameter("@BookingNumber", bookingNumber)
            };

            var result = await _sqlHelper.ExecuteScalarAsync("sp_BookingNumberExists", parameters);
            return Convert.ToInt32(result) > 0;
        }

        public async Task<Booking> AddAsync(Booking booking)
        {
            var specialRequirementsValue = booking.SpecialRequirements != null ? (object)booking.SpecialRequirements : DBNull.Value;
            var transactionIdValue = booking.TransactionId != null ? (object)booking.TransactionId : DBNull.Value;

            var parameters = new SqlParameter[]
            {
                new SqlParameter("@BookingNumber", booking.BookingNumber),
                new SqlParameter("@UserId", booking.UserId),
                new SqlParameter("@PackageId", booking.PackageId),
                new SqlParameter("@BookingDate", booking.BookingDate),
                new SqlParameter("@TravelDate", booking.TravelDate),
                new SqlParameter("@NumberOfTravelers", booking.NumberOfTravelers),
                new SqlParameter("@TotalAmount", booking.TotalAmount),
                new SqlParameter("@Status", booking.Status),
                new SqlParameter("@SpecialRequirements", specialRequirementsValue),
                new SqlParameter("@TransactionId", transactionIdValue),
                new SqlParameter("@PaymentStatus", booking.PaymentStatus)
            };

            var bookingId = await _sqlHelper.ExecuteScalarAsync("sp_CreateBooking", parameters);
            booking.Id = Convert.ToInt32(bookingId);
            return booking;
        }

        public async Task UpdateAsync(Booking booking)
        {
            var parameters = new SqlParameter[]
            {
                new SqlParameter("@Id", booking.Id),
                new SqlParameter("@BookingNumber", booking.BookingNumber),
                new SqlParameter("@UserId", booking.UserId),
                new SqlParameter("@PackageId", booking.PackageId),
                new SqlParameter("@BookingDate", booking.BookingDate),
                new SqlParameter("@TravelDate", booking.TravelDate),
                new SqlParameter("@NumberOfTravelers", booking.NumberOfTravelers),
                new SqlParameter("@TotalAmount", booking.TotalAmount),
                new SqlParameter("@Status", booking.Status),
                new SqlParameter("@SpecialRequirements", booking.SpecialRequirements != null ? (object)booking.SpecialRequirements : DBNull.Value),
                new SqlParameter("@TransactionId", booking.TransactionId != null ? (object)booking.TransactionId : DBNull.Value),
                new SqlParameter("@PaymentStatus", booking.PaymentStatus),
                new SqlParameter("@UpdatedAt", DateTime.UtcNow)
            };

            await _sqlHelper.ExecuteNonQueryAsync("sp_UpdateBooking", parameters);
        }

        public async Task DeleteAsync(Booking booking)
        {
            var parameters = new SqlParameter[]
            {
                new SqlParameter("@Id", booking.Id)
            };

            await _sqlHelper.ExecuteNonQueryAsync("sp_DeleteBooking", parameters);
        }

        private static Booking MapDataRowToBooking(DataRow row)
        {
            return new Booking
            {
                Id = Convert.ToInt32(row["Id"]),
                BookingNumber = row["BookingNumber"]?.ToString() ?? string.Empty,
                UserId = Convert.ToInt32(row["UserId"]),
                PackageId = Convert.ToInt32(row["PackageId"]),
                BookingDate = Convert.ToDateTime(row["BookingDate"]),
                TravelDate = Convert.ToDateTime(row["TravelDate"]),
                NumberOfTravelers = Convert.ToInt32(row["NumberOfTravelers"]),
                TotalAmount = Convert.ToDecimal(row["TotalAmount"]),
                Status = row["Status"]?.ToString() ?? "Pending",
                SpecialRequirements = row["SpecialRequirements"] != DBNull.Value ? row["SpecialRequirements"]?.ToString() : null,
                TransactionId = row["TransactionId"] != DBNull.Value ? row["TransactionId"]?.ToString() : null,
                PaymentStatus = row["PaymentStatus"]?.ToString() ?? "Pending",
                CreatedAt = Convert.ToDateTime(row["CreatedAt"]),
                UpdatedAt = row["UpdatedAt"] != DBNull.Value ? Convert.ToDateTime(row["UpdatedAt"]) : null
            };
        }
    }
}