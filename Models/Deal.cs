using System.Collections;
using System.Collections.Generic;

namespace Preferanse.Models
{
    public class PlayerDeck : List<Card>
    {

    }
    public class Deal
    {
        public int Dealer { get; set; }
        public Contract DealContract { get; set; }
        //Card Deck per player
        public List<PlayerDeck> InitialCards { get; set; }
        public List<Card[]> Rounds { get; set; }
        public Deal()
        {
            Rounds = new List<Card[]>();
            InitialCards = new List<PlayerDeck>();
        }
    }
}