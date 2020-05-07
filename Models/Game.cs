using System;
using System.Collections.Generic;
using System.Linq;

namespace Preferanse.Models
{
    public class Player
    {
        public IEnumerable<Card> Cards { get; set; }
        public string PlayerName { get; set; }
        public Player()
        {

        }
    }

    public class Game
    {
        public Player Player1 { get; set; }
        public Player Player2 { get; set; }
        public Player Player3 { get; set; }
        public IEnumerable<Round> Rounds { get; set; }
        public Game()
        {
            Player1 = new Player();
            Player2 = new Player();
            Player3 = new Player();
            Rounds = new List<Round>();
        }
    }

    public class Round
    {
        public Card Player1 { get; set; }
        public Card Player2 { get; set; }
        public Card Player3 { get; set; }
    }
}