using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Preferanse.Models;
using Preferanse.Utils;

namespace Preferanse.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PreferanseController : ControllerBase
    {
        // private static readonly string[] Summaries = new[]
        // {
        //     "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        // };

        private readonly ILogger<PreferanseController> _logger;

        public PreferanseController(ILogger<PreferanseController> logger)
        {
            _logger = logger;
        }

        [HttpGet()]
        public IEnumerable<Card> Get()
        {
            var deck = new Deck();

            var result = deck.GetAllCards();
            var list = result.ToList();
            list.Shuffle();

            // Draw on  three players
            var player1Cards = new List<Card>();
            var player2Cards = new List<Card>();
            var player3Cards = new List<Card>();
            for(var i= 0; i<=4; i++)
            {
                player1Cards.AddRange(list.Skip(i * 6 ).Take(2));
                player2Cards.AddRange(list.Skip(i * 6 + 2 ).Take(2));
                player3Cards.AddRange(list.Skip(i * 6 + 4 ).Take(2));
            }

            return player1Cards;
        }
    }
}