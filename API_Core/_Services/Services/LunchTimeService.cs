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
    public class LunchTimeService : ILunchTimeService
    {

        private readonly ILunchTimeRepository _repoLunchTime;
        private readonly IBuildingRepository _repoBuilding;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
        public LunchTimeService(ILunchTimeRepository repoLunchTime, IBuildingRepository repoBuilding, IMapper mapper, MapperConfiguration configMapper)
        {
            _configMapper = configMapper;
            _mapper = mapper;
            _repoLunchTime = repoLunchTime;
            _repoBuilding = repoBuilding;

        }

        public async Task<List<LunchTimeDto>> GetLunchTimes()
        {
            //return await _repoLunchTime.FindAll(x => x.ID != 5).ProjectTo<LunchTimeDto>(_configMapper).OrderBy(x => x.ID).ToListAsync();
            
            return await _repoLunchTime.GetAll().ProjectTo<LunchTimeDto>(_configMapper).ToListAsync();

        }
        public async Task<object> GetBuilingByLunchTime()
        {
            var data = from a in _repoBuilding.FindAll(x => x.Level == 1)
                       join b in _repoLunchTime.FindAll() on a.LunchTimeID equals b.ID
                       select new BuildingDto
                       {
                           ID = a.ID,
                           Name = a.Name,
                           Level = a.Level,
                           LunchTimeID = a.LunchTimeID,
                           LunchTime = b.StartTime.ToString("HH:mm") + " - " + b.EndTime.ToString("HH:mm")
                       };

            return data.OrderBy(x => x.Name).ToList();
        }

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

        // public async Task<bool> Update(BuildingDto model)
        // {
        //     var building = _mapper.Map<Building>(model);
        //     _repoBuilding.Update(building);
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

        

        // public async Task<object> CreateMainBuilding(BuildingDto buildingDto)
        // {
        //     if (buildingDto.ID == 0)
        //     {
        //         var item = _mapper.Map<Building> (buildingDto);
        //         item.Level = 1;
        //         item.ParentID = null;
        //         _repoBuilding.Add(item);

        //     } else
        //     {
        //         var item = _repoBuilding.FindById(buildingDto.ID);
        //         item.Name = buildingDto.Name;
        //     }
        //     try
        //     {

        //         return await _repoBuilding.SaveAll();
        //     }
        //     catch (Exception)
        //     {
        //         return false;
        //     }
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