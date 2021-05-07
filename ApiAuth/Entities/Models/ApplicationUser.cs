using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiAuth.Entities.Models
{
    public class ApplicationUser : IdentityUser
    {
        [PersonalData]
        public bool IsFirstConnection { get; set; }

    }
}
