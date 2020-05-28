using System.Collections.Generic;

namespace Preferanse.Models
{
    public class Deal
    {
        public int Dealer { get; set; }
        public Contract DealContract { get; set; }
        public List<Card[]> Cards { get; set; }
        public Deal()
        {
            Cards = new List<Card[]>();
        }
    }
}