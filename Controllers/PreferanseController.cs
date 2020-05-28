using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;
using Preferanse.Models;
using Preferanse.Utils;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace Preferanse.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class PreferanseController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ILogger<PreferanseController> _logger;

        public PreferanseController(ILogger<PreferanseController> logger, UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
            _logger = logger;
        }

        [HttpGet()]
        public async Task<Game> Get()
        {
            // var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // will give the user's userId

            // ApplicationUser applicationUser = await _userManager.GetUserAsync(User);
            // var user2 = await _userManager.FindByIdAsync(userId);
            // var user3 = await _userManager.GetUserAsync(User);
            // string userEmail = applicationUser?.Email; // will give the user's Email
   
            var deck = new Deck();

            var result = deck.GetAllCards();
            var list = result.ToList();
            list.Shuffle();

            // Draw on  three players
            var player1Cards = new List<Card>();
            var player2Cards = new List<Card>();
            var player3Cards = new List<Card>();

            for (var i = 0; i <= 4; i++)
            {
                player1Cards.AddRange(list.Skip(i * 6).Take(2));
                player2Cards.AddRange(list.Skip(i * 6 + 2).Take(2));
                player3Cards.AddRange(list.Skip(i * 6 + 4).Take(2));
            }

            // var response = new Game();
            // response.Player1.Cards = player1Cards;
            // response.Player1.PlayerName = "Sam";
            // response.Player2.Cards = player2Cards;
            // response.Player2.PlayerName = "Artem";
            // response.Player3.Cards = player3Cards;
            // response.Player3.PlayerName = "Valera";

            return null;
        }
    }
}