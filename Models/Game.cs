using System;
using System.Collections.Generic;
using System.Linq;

namespace Preferanse.Models
{
    public class Player
    {
        [Newtonsoft.Json.JsonProperty(PropertyName = "id")]
        public String Id { get; set; }
        public IEnumerable<Card> Cards { get; set; }
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
    }

    public class Game
    {
        [Newtonsoft.Json.JsonProperty(PropertyName = "id")]
        public String Id { get; set; }
        public Player Player1 { get; set; }
        public Player Player2 { get; set; }
        public Player Player3 { get; set; }
        public IEnumerable<Round> Rounds { get; set; }
        public bool IsEnded { get; set; }
        public DateTime CreationDate { get; set; }
        public String Description { get; set; }
        public Game()
        {
            Player1 = new Player();
            Player2 = new Player();
            Player3 = new Player();
            Rounds = new List<Round>();
            IsEnded = false;
            //Dealer
            //Deal CurrentDeal
            //List<Bets> =>
            //Bet => List<Deals> 
            //         Contract
        }

    }

    public class Round
    {
        public Contract RoundContract { get; set; }
        public Card Player1 { get; set; }
        public Card Player2 { get; set; }
        public Card Player3 { get; set; }
    }

    public class Contract
    {
        public int ContractValue { get; set; }
    }
}