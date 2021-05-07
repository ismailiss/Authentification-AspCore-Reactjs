using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ApiAuth.Entities.DTOs
{
    public class LoginDTO
    {
        [MaxLength(255)]
        public string Username { get; set; }
        [MaxLength(18)]
        public string Password { get; set; }
    }
}
