using Microsoft.EntityFrameworkCore;

namespace _413Final.API.Data;

public class EntertainmentDbContext : DbContext
{
    public EntertainmentDbContext(DbContextOptions<EntertainmentDbContext> options) : base(options)
    {
    }

    public DbSet<Entertainer> Entertainers { get; set; }
    public DbSet<Engagement> Engagements { get; set; }
}