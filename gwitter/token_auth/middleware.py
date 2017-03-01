from django import http

try:
    from django.utils.deprecation import MiddlewareMixin
except ImportError:
    MiddlewareMixin = object  # pragma: no cover

ACCESS_CONTROL_ALLOW_ORIGIN = 'Access-Control-Allow-Origin'
ACCESS_CONTROL_ALLOW_HEADERS = 'Access-Control-Allow-Headers'

default_headers = (
    'authorization',
    'content-type',
    'origin',
)

class CorsMiddleware(MiddlewareMixin):

    def process_response(self, request, response):
        """
        Add the respective CORS headers
        """
        response[ACCESS_CONTROL_ALLOW_ORIGIN] = "http://localhost:3000"
        response[ACCESS_CONTROL_ALLOW_HEADERS] = ', '.join(default_headers)
        return response

    def process_request(self, request):
        if (request.method == 'OPTIONS' and 'HTTP_ACCESS_CONTROL_REQUEST_METHOD' in request.META):
            return http.HttpResponse()
