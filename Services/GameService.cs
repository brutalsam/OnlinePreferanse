using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Preferanse.Models;

namespace Preferanse.Services
{
    public class GameService
    {
        public static async Task<Game> CreateNewGame(GameCreateModel createGameModel, UserManager<ApplicationUser> userManager)
        {
            var players = new List<Player>();
            players.Add(await GetPlayerFromEmail(createGameModel.Player1, userManager));
            players.Add(await GetPlayerFromEmail(createGameModel.Player2, userManager));
            players.Add(await GetPlayerFromEmail(createGameModel.Player3, userManager));
            var newGame = new Game(players);
            newGame.Description = createGameModel.Description;
            return newGame;
        }

        private static async Task<Player> GetPlayerFromEmail(string email, UserManager<ApplicationUser> userManager)
        {
            var user = await userManager.FindByEmailAsync(email);
            return new Player
            {
                Id = user.Id,
                PlayerName = user.UserName
            };
        }
    }
}