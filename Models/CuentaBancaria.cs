using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace proyectoAnalisis2.Models
{
    
    public class CuentaBancaria
    {
        
        public long CuentaBancariaId { get; set; }

        public string NumeroCuenta { get; set; }

        public string Banco { get; set; }

        public string TipoDeCuenta { get; set; }

        public Decimal Saldo { get; set; }

        public string CuentaHabiente { get; set; }
    }
}
