using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace proyectoAnalisis2.Models
{
    public class ServicioLuz
    {
        [Key]
        public long ServicioLuzId { get; set; }

        [ForeignKey("CuentaBancariaId")]
        public long CuentaBancariaId { get; set; }

        public string Correlativo { get; set; }

        public decimal Saldo { get; set; }
    }
}
