using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace INK_API.DTO
{
    public class PeriodMixingDto
    {
        public int ID { get; set; }
        public int BuildingID { get; set; }
        public bool IsOvertime { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public DateTime CreatedTime { get; set; }
        public DateTime? UpdatedTime { get; set; }
        public DateTime? DeletedTime { get; set; }
        public bool IsDelete { get; set; }
        public int CreatedBy { get; set; }
        public int DeletedBy { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime? StartTimeLunchTime { get; set; }
        public DateTime? EndTimeLunchTime { get; set; }
    }
}
