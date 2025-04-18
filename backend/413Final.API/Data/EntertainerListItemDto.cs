namespace _413Final.API.Data;

public class EntertainerListItemDto
{
    public int EntertainerID { get; set; }
    public string? EntStageName { get; set; }
    public int BookingCount { get; set; }
    public DateTime? LastBooked { get; set; }
}