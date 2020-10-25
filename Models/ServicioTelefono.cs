using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace proyectoAnalisis2.Models
{
    public class ServicioTelefono
    {
        [Key]
        public long ServicioTelId { get; set; }

        [ForeignKey("CuentaBancariaId")]
        public long CuentaBancariaId { get; set; }

        public string Telefono { get; set; }

        public decimal Saldo { get; set; }
    }
}
