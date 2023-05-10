using Microsoft.AspNetCore.Http;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;

namespace ApiAuth.Utility
{
    public  class TokenUtility
    {
        public  string GetUserIdFromToken(string authHeader)
        {
             if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
            {
                return null;
            }

            var token = authHeader.Substring("Bearer ".Length);

            try
            {
                // 2. Parse the token to extract the user ID
                var handler = new JwtSecurityTokenHandler();
                var jwt = handler.ReadJwtToken(token);
                var userId = jwt.Claims.FirstOrDefault(x => x.Type == "Id")?.Value;

                return userId;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

    }
}
