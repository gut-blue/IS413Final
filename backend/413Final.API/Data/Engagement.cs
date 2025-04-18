using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace _413Final.API.Data;

[Table("Engagements")]
public class Engagement
{
        [Key]
        public int EngagementNumber { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string? StartTime { get; set; }
        public string? StopTime { get; set; }
        public int? ContractPrice { get; set; }
        
        // FKs
        public int? CustomerID { get; set; }
        public int? AgentID { get; set; }
        public int EntertainerID { get; set; }
        
        // Navigation property optional
        public Entertainer? Entertainer { get; set; }
}