
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

namespace Preferanse.Controllers
{
    //[ApiController]
    [Route("[controller]")]
    public class GamesController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        public GamesController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet()]
        public async Task<ActionResult<Game>> Get()
        {
            var games = await DocumentDBRepository<Game>.GetItemsAsync(g => true);
            return Ok(games);
        }

        [HttpPost]
        public async Task<ActionResult> Post(GameCreateModel input)
        {

            var itemModel = new Game();
            itemModel.Player1 = await GetPlayerFromEmail(input.Player1);
            itemModel.Player2 = await GetPlayerFromEmail(input.Player2);
            itemModel.Player3 = await GetPlayerFromEmail(input.Player3);

            await DocumentDBRepository<Game>.CreateItemAsync(itemModel);
            return CreatedAtAction("Post", itemModel);
        }

        [HttpPost("CreateSample")]
        public async Task<ActionResult> CreateSample()
        {
            var item = new Game{
                Player1 = new Player{
                    PlayerName = "Albert"
                },
                Player2 = new Player{
                    PlayerName = "Ignasio"
                },
                Player3 = new Player{
                    PlayerName = "Horhe"
                },
                Rounds = new List<Round> {
                    new Round {
                        RoundContract = new Contract {
                            ContractValue = 5
                        },
                        Player1 = new Card(CardValue.Seven, CardSuit.Diamond),
                        Player2 = new Card(CardValue.Ace, CardSuit.Diamond),
                        Player3 = new Card(CardValue.King, CardSuit.Diamond),
                    }
                }
            };
            //await DocumentDBRepository<Game>.CreateItemAsync(item);
            return CreatedAtAction("Post", item);
        }

        private async Task<Player> GetPlayerFromEmail(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            return new Player{
                Id = user.Id,
                PlayerName = user.UserName
            };
        }
    }
}