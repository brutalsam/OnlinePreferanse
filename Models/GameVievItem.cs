using System;
using System.Collections.Generic;

namespace Preferanse.Models
{
    public class GameVievItem
    {
        [Newtonsoft.Json.JsonProperty(PropertyName = "id")]
        public String Id { get; set; }
        public List<Player> Players {get; set;}
        public bool IsEnded { get; set; }
        public DateTime CreationDate { get; set; }
        public String Description { get; set; }
    }

    public static class GameVievItemExtension
    {
        public static GameVievItem ToPoco(this Game game)
        {
            return new GameVievItem()
            {
                Id = game.Id,
                Players = game.Players,
                IsEnded = game.IsEnded,
                Description = game.Description
            };
        }
    }
}