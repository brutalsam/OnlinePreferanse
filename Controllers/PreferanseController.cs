using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Preferanse.Models;

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
            // var rng = new Random();
            return deck.GetAllCards();
        }
    }
}