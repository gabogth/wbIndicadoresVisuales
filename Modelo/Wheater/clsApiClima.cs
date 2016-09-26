using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Modelo.Wheater
{
    public class clsApiClima
    {
        public bool success;
        string urlDecod = string.Empty, message = string.Empty;
        public clsApiClima(string urlDecod)
        {
            this.urlDecod = urlDecod;
        }

        public RootObject getClima()
        {
            try
            {
                string html = new System.Net.WebClient().DownloadString(this.urlDecod);
                RootObject a = JsonConvert.DeserializeObject<RootObject>(html);
                success = true;
                return a;
            }
            catch(Exception ex)
            {
                message = ex.Message;
                success = false;
                return null;
            }
        }
    }
}
