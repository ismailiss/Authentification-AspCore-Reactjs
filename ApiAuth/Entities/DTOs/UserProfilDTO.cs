﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ApiAuth.Entities.DTOs
{
    public class UserProfilDTO
    {
        [MaxLength(255)]
        public string Username { get; set; }
        [MaxLength(255)]
        public string Email { get; set; }
        [MaxLength(18)]
        public string LastName { get; set; }
        [MaxLength(255)]
        public string FirstName { get; set; }
        public DateTime BirthDate { get; set; }


    }
}
