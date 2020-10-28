using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using proyectoAnalisis2.Models;

namespace proyectoAnalisis2.Data
{
    public class proyectoAnalisis2Context : DbContext
    {
        public proyectoAnalisis2Context (DbContextOptions<proyectoAnalisis2Context> options)
            : base(options)
        {
        }

        public DbSet<proyectoAnalisis2.Models.CuentaBancaria> CuentaBancaria { get; set; }
        public DbSet<proyectoAnalisis2.Models.Tarjeta> Tarjeta { get; set; }

        public DbSet<proyectoAnalisis2.Models.Bitacora> Bitacora { get; set; }

        public DbSet<proyectoAnalisis2.Models.ServicioLuz> ServicioLuz { get; set; }

        public DbSet<proyectoAnalisis2.Models.ServicioTelefono> ServicioTelefono { get; set; }
    }
}
