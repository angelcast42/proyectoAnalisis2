using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace proyectoAnalisis2.Models
{
    
    public class CuentaBancaria
    {
        [Key]
        public long CuentaBancariaId { get; set; }

        public string NumeroCuenta { get; set; }

        public string Banco { get; set; }

        public string TipoDeCuenta { get; set; }

        public Decimal Saldo { get; set; }

        public string CuentaHabiente { get; set; }
    }
}
