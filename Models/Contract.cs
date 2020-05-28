namespace Preferanse.Models
{
    public enum ContractValue
    {
        Six = 6,
        Seven = 7,
        Eight = 8,
        Nine = 9,
        Ten = 10,
        Misere = 11
    }
    public class Contract
    {
        public int ContractValue { get; set; }
        public CardSuit Trumps {get; set;}
    }
}