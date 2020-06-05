
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;
using Preferanse.Models;
using Preferanse.Utils;
using Preferanse.Data;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using Preferanse.Services;

namespace Preferanse.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class GamesController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        public GamesController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet("GameVievItem")]
        public async Task<ActionResult<GameVievItem>> GetGameVievItem(string gameId = null)
        {
            IEnumerable<Game> games;
            if (String.IsNullOrWhiteSpace(gameId))
            {
                games = await DocumentDBRepository<Game>.GetItemsAsync(g => true);
            }
            else
            {
                games = await DocumentDBRepository<Game>.GetItemsAsync(g => g.Id == gameId);
            }
            
            return Ok(games.Select(x => x.ToPoco()));
        }
        [HttpGet()]
        public async Task<ActionResult<GameVievItem>> Get(string gameId)
        {
            var game = await DocumentDBRepository<Game>.GetItemAsync(gameId);
            return Ok(game);
        }

        [HttpPost]
        public async Task<ActionResult> Post(GameCreateModel input)
        {
            var newGame = await GameService.CreateNewGame(input, _userManager);

            await DocumentDBRepository<Game>.CreateItemAsync(newGame);
            return CreatedAtAction("Post", newGame);
        }
    }
}