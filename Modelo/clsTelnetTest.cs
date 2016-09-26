using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Modelo
{
    class clsTelnetTest
    {
        string ipClient, userClient, pwClient;
        int port;
        TelnetConnection tc = null;
        public clsTelnetTest(string ipClient, string userClient, string pwClient, int port)
        {
            this.ipClient = ipClient;
            this.userClient = userClient;
            this.pwClient = pwClient;
            this.port = port;
            //"192.168.181.129"
        }

        public bool Conectar()
        {
            tc = new TelnetConnection(this.ipClient, this.port);
            string s = tc.Login(this.userClient, this.pwClient, 500);
            string prompt = s.TrimEnd();
            if (!prompt.Contains(">"))
                return false;
            else
                return true;
        }
        public string Reiniciar()
        {
            this.tc.WriteLine("shutdown /r /t 5");
            Thread.Sleep(1000);
            return tc.Read();
        }
    }
}
