using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace INK_API.DTO
{
    public class LunchTimeDto
    {
        public int ID { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedTime { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime? UpdatedTime { get; set; }
        public int DeletedBy { get; set; }
        public DateTime? DeletedTime { get; set; }
        public int IsDelete { get; set; }
    }
}
