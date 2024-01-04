namespace my_web_server.Middlewares
{
    /// <summary>
    /// This class is used to log the requests made to the server.
    /// </summary>
    /// <param name="next"></param>
    /// <param name="logger"></param>
    public class RequestLoggingMiddleware(RequestDelegate next, ILogger<RequestLoggingMiddleware> logger)
    {
        private readonly RequestDelegate _next = next;
        private readonly ILogger _logger = logger;

        public async Task InvokeAsync(HttpContext context)
        {
            _logger.LogInformation($"HTTP Method - {context.Request.Method}, URL - {context.Request.Path}");
            await _next(context);
        }
    }

    public static class RequestLoggingMiddlewareExtensions
    {
        public static IApplicationBuilder UseRequestLogging(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<RequestLoggingMiddleware>();
        }
    }
}
