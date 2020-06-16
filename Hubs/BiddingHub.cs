using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace Preferanse.Hubs
{
    public class BiddingHub : Hub
    {
        public async Task ServerBiddingMessage(string user, string message)
        {
            await Clients.All.SendAsync("BiddingMessage", user, message);
        }

        public Task ThrowException()
        {
            throw new HubException("This error will be sent to the client!");
        }
    }
}