namespace KashiVibes.Core.Entities
{
    public class Booking
    {
        public int Id { get; set; }
        public string BookingNumber { get; set; } = string.Empty;
        public int UserId { get; set; }
        public int PackageId { get; set; }
        public DateTime BookingDate { get; set; } = DateTime.UtcNow;
        public DateTime TravelDate { get; set; }
        public int NumberOfTravelers { get; set; } = 1;
        public decimal TotalAmount { get; set; }
        public string Status { get; set; } = "Pending";
        public string? SpecialRequirements { get; set; }
        public string? TransactionId { get; set; }
        public string PaymentStatus { get; set; } = "Pending";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
    }
}