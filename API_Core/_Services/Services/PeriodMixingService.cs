using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using INK_API.Helpers;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using INK_API._Repositories.Interface;
using INK_API._Services.Interface;
using INK_API.DTO;
using INK_API.Models;
using Microsoft.EntityFrameworkCore;

namespace INK_API._Services.Services
{
    public class PeriodMixingService : IPeriodMixingService
    {

        private readonly IPeriodMixingRepository _repoPeriodMixing;
        private readonly IBuildingRepository _repoBuilding;
        private readonly ILunchTimeRepository _repoLunchTime;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
        public PeriodMixingService(IPeriodMixingRepository repoPeriodMixing, IBuildingRepository repoBuilding, ILunchTimeRepository repoLunchTime, IMapper mapper, MapperConfiguration configMapper)
        {
            _configMapper = configMapper;
            _mapper = mapper;
            _repoPeriodMixing = repoPeriodMixing;
            _repoBuilding = repoBuilding;
            _repoLunchTime = repoLunchTime;
        }

        // public async Task<List<LunchTimeDto>> GetLunchTimes()
        // {
        //     //return await _repoLunchTime.FindAll(x => x.ID != 5).ProjectTo<LunchTimeDto>(_configMapper).OrderBy(x => x.ID).ToListAsync();
        //     return await _repoLunchTime.GetAll().ProjectTo<LunchTimeDto>(_configMapper).ToListAsync();

        // }
        public async Task<List<PeriodMixingDto>> GetPeriodMixingByBuilding(int buildingID)
        {   
            var query = await _repoPeriodMixing.FindAll(x => x.BuildingID == buildingID).ToListAsync();
            var data = (from a in query
                       select new PeriodMixingDto
                       {
                           ID = a.ID,
                           BuildingID = a.BuildingID,
                           StartTime = a.StartTime,
                           EndTime = a.EndTime,
                           IsOvertime = a.IsOvertime,
                           CreatedTime = a.CreatedTime,
                           UpdatedTime = a.UpdatedTime,
                           DeletedTime = a.DeletedTime,
                           IsDelete = a.IsDelete,
                           CreatedBy = a.CreatedBy,
                           DeletedBy = a.DeletedBy,
                           UpdatedBy = a.UpdatedBy                     
                       }).OrderBy(x => x.StartTime.TimeOfDay).ToList();
          
            return data;
        }
        public async Task<object> CreatePeriodMixing(PeriodMixingDto periodMixingDto)
        {
            // var lunchTime = from x in _repoPeriodMixing.FindAll(x => x.BuildingID == periodMixingDto.BuildingID)
            //                 join y in _repoBuilding.FindAll() on x.BuildingID equals y.ID
            //                 join z in _repoLunchTime.FindAll() on y.LunchTimeID equals z.ID
            //                 select new PeriodMixingDto() {
            //                     ID = x.ID,
            //                     StartTime = x.StartTime,
            //                     EndTime = x.EndTime,
            //                     StartTimeLunchTime = z.StartTime,
            //                     EndTimeLunchTime = z.EndTime,
            //                 };
            // var data  = await lunchTime.ToListAsync();
            // if (periodMixingDto.StartTime < periodMixingDto.EndTime)
            // {
            //     foreach (var periodMixing in data)
            //     {
            //         if (
            //             ((periodMixingDto.StartTime < periodMixing.StartTimeLunchTime && periodMixingDto.EndTime <= periodMixing.StartTimeLunchTime) ||
            //             (periodMixingDto.StartTime >= periodMixing.EndTimeLunchTime && periodMixingDto.EndTime > periodMixing.EndTimeLunchTime)) && 
            //             ((periodMixingDto.StartTime < periodMixing.StartTimeLunchTime && periodMixingDto.EndTime < periodMixing.StartTimeLunchTime) ||
            //             (periodMixingDto.StartTime > periodMixing.StartTimeLunchTime && periodMixingDto.EndTime > periodMixing.StartTimeLunchTime))
            //             )
            //         {
                        
            //         }
            //         else
            //         {
                        
            //         }
                    
            //     }
            // }
            // else
            // {
            //     return false;
            // }

            var lunchTime = _repoLunchTime.FindById(_repoBuilding.FindById(periodMixingDto.BuildingID).LunchTimeID);
            var data = _repoPeriodMixing.FindAll(x =>x.BuildingID == periodMixingDto.BuildingID);
            TimeSpan startTime, endTime, startLunchTime, endLunchTime;
            startTime = periodMixingDto.StartTime.TimeOfDay;
            endTime = periodMixingDto.EndTime.TimeOfDay;
            startLunchTime = lunchTime.StartTime.TimeOfDay;
            endLunchTime = lunchTime.EndTime.TimeOfDay;
            bool checkTime = true;

            if ((startTime >= endTime))
            {
                return new {    
                            status = false,
                            message = "End time must greater start time!"
                        };
            }

            if ((startTime.Minutes == 30 || startTime.Minutes == 0) && 
                (endTime.Minutes == 30 || endTime.Minutes == 0))
            {
                if ((startTime < startLunchTime && endTime <= startLunchTime) ||
                    (startTime >= endLunchTime && endTime > endLunchTime))
                {
                    foreach (var item in data)
                    {
                        if ((startTime < item.StartTime.TimeOfDay && endTime <= item.StartTime.TimeOfDay) ||
                            (startTime >= item.EndTime.TimeOfDay && endTime > item.EndTime.TimeOfDay))
                        {
                            checkTime = true;
                        }
                        else
                        {
                            checkTime = false;
                            break;
                        }
                    }
                    if (checkTime)
                    {
                        var periodMixing = _mapper.Map<PeriodMixing> (periodMixingDto);
                        _repoPeriodMixing.Add(periodMixing);
                        try
                        {
                            var result = await _repoPeriodMixing.SaveAll();
                            return new {    
                                status = true,
                                message = "Success"
                            };
                        }
                        catch (Exception)
                        {
                            return new {    
                                status = false,
                                message = "Save failed"
                            };
                        }
                        
                    }
                    else
                    {
                        return new {    
                                status = false,
                                message = "Period mixing has existed!"
                            };
                    }
                }
                else
                {
                    return new {    
                                status = false,
                                message = "Period mixing coincides with lunch time!"
                            };
                }
            }
            else
            {
                return new {
                            status = false,
                            message = "Period mixing is at least 30 minutes!"
                        };
            }
        }

        public async Task<object> Update(PeriodMixingDto model)
        {
            var lunchTime =  _repoLunchTime.FindById(_repoBuilding.FindById(model.BuildingID).LunchTimeID);
            var data =  _repoPeriodMixing.FindAll(x => x.BuildingID == model.BuildingID && x.ID != model.ID);
            TimeSpan startTime, endTime, startLunchTime, endLunchTime;
            startTime = model.StartTime.TimeOfDay;
            endTime = model.EndTime.TimeOfDay;
            startLunchTime = lunchTime.StartTime.TimeOfDay;
            endLunchTime = lunchTime.EndTime.TimeOfDay;
            bool checkTime = true;

            if ((startTime >= endTime))
            {
                return new {    
                            status = false,
                            message = "End time must greater start time!"
                        };
            }

            if ((startTime.Minutes == 30 || startTime.Minutes == 0) && 
                (endTime.Minutes == 30 || endTime.Minutes == 0))
            {
                if ((startTime < startLunchTime && endTime <= startLunchTime) ||
                    (startTime >= endLunchTime && endTime > endLunchTime))
                {
                    foreach (var item in data)
                    {
                        if ((startTime < item.StartTime.TimeOfDay && endTime <= item.StartTime.TimeOfDay) ||
                            (startTime >= item.EndTime.TimeOfDay && endTime > item.EndTime.TimeOfDay))
                        {
                            checkTime = true;
                        }
                        else
                        {
                            checkTime = false;
                            break;
                        }
                    }
                    if (checkTime)
                    {
                        var periodMixing = _mapper.Map<PeriodMixing>(model);
                        _repoPeriodMixing.Update(periodMixing);
                        try
                        {
                            var result = await _repoPeriodMixing.SaveAll();
                            return new {    
                                status = true,
                                message = "Success"
                            };
                        }
                        catch (Exception)
                        {
                            return new {    
                                status = false,
                                message = "Save failed"
                            };
                        }
                    }
                    else
                    {
                        return new {    
                                status = false,
                                message = "Period mixing has existed!"
                            };
                    }
                }
                else
                {
                    return new {    
                                status = false,
                                message = "Period mixing coincides with lunch time!"
                            };
                }
            }
            else
            {
                return new {
                            status = false,
                            message = "Period mixing is at least 30 minutes!"
                        };
            }
        }
        
        public async Task<bool> Delete(int id)
        {
            var PeriodMixing = _repoPeriodMixing.FindById(id);
            _repoPeriodMixing.Remove(PeriodMixing);
            return await _repoPeriodMixing.SaveAll();
        }

        public async Task<object> Check(int id ,int buildingId, DateTime PeriodStart, DateTime PeriodEnd)
        {
            var lunchTime =  _repoLunchTime.FindById(_repoBuilding.FindById(buildingId).LunchTimeID);
            var data =  _repoPeriodMixing.FindAll(x =>x.BuildingID == buildingId && x.ID != id);
            TimeSpan startTime, endTime, startLunchTime, endLunchTime;
            startTime = PeriodStart.TimeOfDay;
            endTime = PeriodEnd.TimeOfDay;
            startLunchTime = lunchTime.StartTime.TimeOfDay;
            endLunchTime = lunchTime.EndTime.TimeOfDay;
            bool checkTime = true;

            if ((startTime >= endTime))
            {
                return new {    
                            status = false,
                            message = "End time must greater start time!"
                        };
            }

            if ((startTime.Minutes == 30 || startTime.Minutes == 0) && 
                (endTime.Minutes == 30 || endTime.Minutes == 0))
            {
                if ((startTime < startLunchTime && endTime <= startLunchTime) ||
                    (startTime >= endLunchTime && endTime > endLunchTime))
                {
                    foreach (var item in data)
                    {
                        if ((startTime < item.StartTime.TimeOfDay && endTime <= item.StartTime.TimeOfDay) ||
                            (startTime >= item.EndTime.TimeOfDay && endTime > item.EndTime.TimeOfDay))
                        {
                            checkTime = true;
                        }
                        else
                        {
                            checkTime = false;
                            break;
                        }
                    }
                    if (checkTime)
                    {
                        return new {    
                                status = true,
                                message = "Success"
                            };
                    }
                    else
                    {
                        return new {    
                                status = false,
                                message = "Period mixing has existed!"
                            };
                    }
                }
                else
                {
                    return new {    
                                status = false,
                                message = "Period mixing coincides with lunch time!"
                            };
                }
            }
            else
            {
                return new {
                            status = false,
                            message = "Minimum period mixing is 30 minutes!"
                        };
            }

        }
        // public BuildingDto GetById(object id)
        // {
        //     return _mapper.Map<Building, BuildingDto>(_repoBuilding.FindById(id));
        // }

        // public async Task<bool> Add(BuildingDto model)
        // {
        //     var building = _mapper.Map<Building>(model);
        //     _repoBuilding.Add(building);
        //     return await _repoBuilding.SaveAll();
        // }

        // public async Task<PagedList<BuildingDto>> GetWithPaginations(PaginationParams param)
        // {
        //     var lists = _repoBuilding.FindAll().ProjectTo<BuildingDto>(_configMapper).OrderByDescending(x => x.ID);
        //     return await PagedList<BuildingDto>.CreateAsync(lists, param.PageNumber, param.PageSize);
        // }
        // public async Task<PagedList<BuildingDto>> Search(PaginationParams param, object text)
        // {
        //     var lists = _repoBuilding.FindAll().ProjectTo<BuildingDto>(_configMapper)
        //     .Where(x => x.Name.Contains(text.ToString()))
        //     .OrderByDescending(x => x.ID);
        //     return await PagedList<BuildingDto>.CreateAsync(lists, param.PageNumber, param.PageSize);
        // }
        // public async Task<bool> Delete(object id)
        // {
        //     var Building = _repoBuilding.FindById(id);
        //     _repoBuilding.Remove(Building);
        //     return await _repoBuilding.SaveAll();
        // }

        
        

        // public async Task<List<BuildingDto>> GetAllAsync()
        // {
        //     return await _repoBuilding.FindAll().ProjectTo<BuildingDto>(_configMapper).OrderByDescending(x => x.ID).ToListAsync();
        // }

        // public BuildingDto GetById(object id)
        // {
        //     return _mapper.Map<Building, BuildingDto>(_repoBuilding.FindById(id));
        // }

        // public async Task<IEnumerable<HierarchyNode<BuildingDto>>> GetAllAsTreeView()
        // {
        //     var lists = (await _repoBuilding.FindAll().ProjectTo<BuildingDto>(_configMapper).OrderBy(x => x.Name).ToListAsync()).AsHierarchy(x => x.ID, y => y.ParentID);
        //     return lists;
        // }

        

        

        // public async Task<object> CreateSubBuilding(BuildingDto buildingDto)
        // {
        //     var item = _mapper.Map<Building>(buildingDto);

        //     //Level cha tang len 1 va gan parentid cho subtask
        //     var itemParent = _repoBuilding.FindById(buildingDto.ParentID);
        //     item.Level = itemParent.Level + 1;
        //     item.ParentID = buildingDto.ParentID;
        //     _repoBuilding.Add(item);

        //     try
        //     {
        //         return await _repoBuilding.SaveAll();
        //     }
        //     catch (Exception)
        //     {
        //         return false;
        //     }
        // }  }
        //     catch (Exception)
        //     {
        //         return false;
        //     }
        // }
    }
}