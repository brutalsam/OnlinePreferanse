using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Preferanse.Models
{
    public class Player
    {
        [Newtonsoft.Json.JsonProperty(PropertyName = "id")]
        public String Id { get; set; }
        public string PlayerName { get; set; }
        public Player()
        {

        }
    }

    public class GameCreateModel
    {
        [Newtonsoft.Json.JsonProperty(PropertyName = "id")]
        public String Id { get; set; }
        public string Player1 { get; set; }
        public string Player2 { get; set; }
        public string Player3 { get; set; }
        public string Description { get; set; }
    }

    public class Game
    {
        [Newtonsoft.Json.JsonProperty(PropertyName = "id")]
        public String Id { get; set; }
        public List<Player> Players {get; set;}
        public List<Deal> Deals { get; set; }
        public bool IsEnded { get; set; }
        public DateTime CreationDate { get; set; }
        public String Description { get; set; }
        public Game(List<Player> players)
        {
            Players = players;
            IsEnded = false;
            Deals = new List<Deal>();
            CreationDate = DateTime.Now;
        }

    }
}