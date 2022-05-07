using INK_API.DTO;
using INK_API.Helpers;
using INK_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace INK_API._Services.Interface
{
  // public interface IPeriodMixingService : IECService<PeriodMixingDto>
   public interface IPeriodMixingService
    {
        //Task<IEnumerable<HierarchyNode<BuildingDto>>> GetAllAsTreeView();
        Task<List<PeriodMixingDto>> GetPeriodMixingByBuilding(int buildingID);
        Task<object> CreatePeriodMixing(PeriodMixingDto periodMixingDto);
        Task<object> Update(PeriodMixingDto model);
        Task<bool> Delete(int id);
        Task<object> Check(int id, int buildingId, DateTime PeriodStart, DateTime PeriodEnd);
        //Task<object> CreateMainBuilding(BuildingDto buildingDto);
        //Task<object> CreateSubBuilding(BuildingDto buildingDto);
    }
}
