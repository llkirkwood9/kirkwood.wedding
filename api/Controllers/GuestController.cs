using api.Data;
using api.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GuestController
    {
        #region Constructor

        /// <summary>
        /// Default Constructor
        /// </summary>
        /// <param name="db"></param>
        /// <param name="logger"></param>
        public GuestController(ApplicationDbContext db, ILogger<GuestController> logger)
        {
            _Db = db;
            _Logger = logger;
        }

        #endregion

        #region Private Fields

        /// <summary>
        /// Database Context
        /// </summary>
        private readonly ApplicationDbContext _Db;

        /// <summary>
        /// Logger for guest controller
        /// </summary>
        private readonly ILogger<GuestController> _Logger;

        #endregion

        #region POST Methods



        #endregion

        #region GET Methods



        #endregion

        #region PATCH Methods



        #endregion

        #region DELETE Methods

        

        #endregion
    }
}
