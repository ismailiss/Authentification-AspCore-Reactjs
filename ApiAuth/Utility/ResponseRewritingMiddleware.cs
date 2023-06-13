using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

public class ResponseRewritingMiddleware
{
    private readonly RequestDelegate _next;

    public ResponseRewritingMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        // Call the next middleware in the pipeline
        var token = await context.GetTokenAsync("access_token");
      //  await _next.Invoke();

         await _next(context);

        /*
        // Rewriting the response
        if (context.Response.StatusCode == 200) // Modify based on your condition
        {
            // Modify the response content or headers as needed
            context.Response.Headers.Add("X-Custom-Header", "Custom Value");
            await context.Response.WriteAsync("Modified Response Content");
        }*/
    }
}
